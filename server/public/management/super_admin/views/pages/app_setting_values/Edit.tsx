import React, { useEffect } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { details } from './config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { Link, useParams } from 'react-router-dom';
import storeSlice from './config/store';
import { update } from './config/store/async_actions/update';
import Input from './components/management_data_page/Input';
import InputImage from './components/management_data_page/InputImage';

export interface Props { }

const Edit: React.FC<Props> = () => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    async function handle_submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form_data = new FormData(e.target as HTMLFormElement);
        await dispatch(update(form_data) as any);
    }

    function get_value(key: string): string {
        try {
            if (state.item[key]) return state.item[key];
            if (state.item?.info?.[key]) return state.item.info[key];
        } catch (error) {
            return '';
        }
        return '';
    }

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header page_title={setup.edit_page_title} />

                {Object.keys(state.item).length > 0 && (
                    <div className="content_body custom_scroll">
                        <form onSubmit={handle_submit} className="mx-auto pt-3">
                            <input
                                type="hidden"
                                name="id"
                                defaultValue={get_value('id')}
                            />
                            <input
                                type="hidden"
                                name="app_setting_key_id"
                                defaultValue={get_value('app_setting_key_id')}
                            />

                            <div>
                                <h5 className="mb-4">Input Data</h5>
                                <div className="form_auto_fit">

                                    <div
                                        key={'title'}
                                        className="form-group form-vertical"
                                    >

                                        <h6>Title: {get_value('title')}</h6>

                                    </div>

                                    {['value'].map((field) => (
                                        <div
                                            key={field}
                                            className="form-group form-vertical"
                                        >
                                            {state.item.type === 'file' && field === 'value' ? (
                                                <InputImage
                                                    label="Upload file"
                                                    name={field}
                                                    defalut_preview={get_value(field)}
                                                />
                                            ) : (
                                                <Input
                                                    name={field}
                                                    value={get_value(field)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group form-vertical">
                                <label />
                                <div className="form_elements">
                                    <button className="btn btn-outline-info">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                <Footer>
                    {state?.item?.id && (
                        <li>
                            <Link
                                to={`/${setup.route_prefix}/details/${state.item.id}`}
                                className="outline"
                            >
                                <span className="material-symbols-outlined fill">
                                    visibility
                                </span>
                                <div className="text">Details</div>
                            </Link>
                        </li>
                    )}
                </Footer>
            </div>
        </div>
    );
};

export default Edit;
