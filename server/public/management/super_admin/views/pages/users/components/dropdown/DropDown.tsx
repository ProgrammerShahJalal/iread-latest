import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../../store';
import storeSlice from '../../config/store';
import { all } from '../../config/store/async_actions/all';
import { initialState } from '../../config/store/inital_state';
import setup from '../../config/setup';
import HeadSearch from '../all_data_page/HeadSearch';
import DropDownCheckbox from './DropDownCheckbox';
import DropDownSelectedItem from './DropDownSelectedItem';
import Paginate from '../../../../components/Paginate';
import { anyObject } from '../../../../../common_types/object';

export interface Props {
    name: string;
    get_selected_data?: (data: { selectedList: anyObject[]; ids: string }) => void;
    multiple: boolean;
    default_value?: anyObject[];
}

const DropDown: React.FC<Props> = ({ name, get_selected_data, multiple, default_value = [] }) => {
    const dispatch = useAppDispatch();
    
    const state = useSelector((state: RootState) => state[setup.module_name] || initialState);
    
    const fallbackUsers = useMemo(
        () => [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' },
            { id: 3, name: 'Bob' },
            { id: 4, name: 'Alice' },
            { id: 5, name: 'Charlie' },
        ],
        []
    );

    const allData = useMemo(() => state.all?.data || fallbackUsers, [state.all?.data, fallbackUsers]);

    const [showDropDownList, setShowDropDownList] = useState(false);
    const [selectedList, setSelectedList] = useState<anyObject[]>([]);
    const selectedItemsInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(storeSlice.actions.set_only_latest_data(true));
        dispatch(all({}));
    }, [dispatch]);

    useEffect(() => {
        if (default_value.length && allData.length) {
            setSelectedList((prevSelectedList) => {
                const enrichedList = default_value.map((defaultItem) => 
                    allData.find((item) => item.id === defaultItem.id) || defaultItem
                );

                return JSON.stringify(prevSelectedList) !== JSON.stringify(enrichedList) 
                    ? enrichedList 
                    : prevSelectedList;
            });
        }
    }, [default_value, allData]);

    useEffect(() => {
        const ids = selectedList.map((item) => item.id).join(',');
        if (selectedItemsInput.current) {
            selectedItemsInput.current.value = `[${ids}]`;
        }
        get_selected_data?.({ selectedList, ids });
    }, [selectedList, get_selected_data]);

    const toggleDropDown = useCallback(() => {
        setShowDropDownList((prev) => !prev);
    }, []);

    return (
        <div className="custom_drop_down">
            <input type="hidden" ref={selectedItemsInput} id={name} name={name} />
            <div className="selected_list" onClick={toggleDropDown}>
                <DropDownSelectedItem selectedList={selectedList} setSelectedList={setSelectedList} />
            </div>

            {showDropDownList && (
                <div className="drop_down_items">
                    <div className="drop_down_data_search">
                        <HeadSearch />
                        <button type="button" onClick={toggleDropDown} className="btn btn_1 text-danger">
                            <span className="material-symbols-outlined fill">close</span>
                        </button>
                    </div>

                    <ul className="option_list custom_scroll">
                        {allData.map((item) => (
                            <li className="option_item" key={item.id}>
                                <label htmlFor={`drop_item_${item.id}`}>
                                    <div className="check_box">
                                        <DropDownCheckbox
                                            item={item}
                                            selectedList={selectedList}
                                            setSelectedList={setSelectedList}
                                            multiple={multiple}
                                        />
                                    </div>
                                    <div className="label">{item.name}</div>
                                </label>
                            </li>
                        ))}
                    </ul>

                    <div className="drop_down_footer data_list">
                        <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all}
                            data={state.all}
                            selected_paginate={state.paginate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(DropDown);
