import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../store';
import { details } from './config/store/async_actions/details';
import { update } from './config/store/async_actions/update';
import storeSlice from './config/store';
import Input from './components/management_data_page/Input';
import InputImage from './components/management_data_page/InputImage';
import DateEl from '../../components/DateEl';
import CategoryDropDown from '../blog_category/components/dropdown/DropDown';
import { initialState } from './config/store/inital_state';
import setup from './config/setup';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { anyObject } from '../../../common_types/object';
import DateTime from '../../components/DateTime';
import moment from 'moment/moment';

const Edit: React.FC = () => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();
    const editorRef = useRef<any>(null); // Ref to hold the CKEditor instance
    const [data, setData] = useState<anyObject>({});

    const [slug, setSlug] = useState('');

    // Fetch details when component mounts
    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, [dispatch, params.id]);

    // Initialize CKEditor
    useEffect(() => {
        const fullDescriptionElement = document.querySelector('[data-name="fullDescription"]');
        if (fullDescriptionElement && !Object.keys(data).length) {
            const editor = CKEDITOR.replace('full_description');
            // editorRef.current = editor; // Save CKEditor instance in ref

            const defaultValue = get_value('full_description');
            if (defaultValue) {
                editor?.setData(defaultValue);
            }

            setData(editor);
        }
    }, [state.item]);

    if(state){
        console.log('state', state?.item)
    }

    // console.log('data', data?.getData());

    // Handle form submission
    async function handle_submit(e) {
        e.preventDefault();
        console.log('e===>', e);
        let form_data = new FormData(e.target);

        form_data.append('full_description', data.getData());


        const response = await dispatch(update(form_data) as any);
        // console.log('RESPONSE', response);
    }
    

    // Get value helper
    const get_value = (key: string): string => {
        try {
            return state.item[key] || state.item?.info?.[key] || '';
        } catch {
            return '';
        }
    };


    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header page_title={setup.edit_page_title} />
                {Object.keys(state.item).length > 0 && (
                    <div className="content_body custom_scroll">
                        <form onSubmit={handle_submit} className="mx-auto pt-3">
                            <input type="hidden" name="id" defaultValue={get_value('id')} />
                            <div>
                                <h5 className="mb-4">Input Data</h5>
                                <div className="row">
                                    <div className="col-8">
                                        <label className="mb-2">Full Description</label>
                                        <div
                                            data-name="fullDescription"
                                            id="full_description"
                                        ></div>

                                        <div className="form-group mt-4">
                                            <label>Short Description</label>
                                            <textarea
                                                className="form-control"
                                                defaultValue={get_value('short_description')}
                                                name="short_description"
                                                id="short_description"
                                                rows={3}
                                            ></textarea>
                                        </div>

                                        {[
                                            'pre_requisities',
                                            'terms_and_conditions',
                                            'price',
                                            'discount_price',
                                        ].map((i) => (
                                            <div key={i} className="form-group form-vertical">
                                                <Input value={get_value(i)} name={i} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-4">
                                        <div className='form-group form-vertical'>
                                            <Input value={get_value('title')} name="title" />
                                        </div>
                                        <div className='form-group form-vertical'>
                                            <Input value={get_value('place')} name="place" />
                                        </div>



                                        {/* RADIO OPTIONS */}
                                        <label>Event Type</label>
                                        <div style={{
                                            paddingBottom: 10
                                        }}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="event_type"
                                                    value="online"
                                                    checked={get_value('status') === 'online'}
                                                    onChange={(e) => {
                                                        const formData = new FormData();
                                                        formData.set('status', e.target.value);
                                                        dispatch(
                                                            storeSlice.actions.set_item({
                                                                ...state.item,
                                                                status: e.target.value,
                                                            })
                                                        );
                                                    }}
                                                />
                                                Online
                                            </label>
                                            <br />
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="event_type"
                                                    value="offline"
                                                    checked={get_value('status') === 'offline'}
                                                    onChange={(e) => {
                                                        const formData = new FormData();
                                                        formData.set('status', e.target.value);
                                                        dispatch(
                                                            storeSlice.actions.set_item({
                                                                ...state.item,
                                                                status: e.target.value,
                                                            })
                                                        );
                                                    }}
                                                />
                                                Offline
                                            </label>
                                        </div>

                                        <div className='form-group grid_full_width form-vertical'>
                                            <label>Reg Start Date</label>
                                            <DateEl
                                                value={get_value('reg_start_date')}
                                                name="reg_start_date"
                                                handler={() => console.log('Date changed')}
                                            />
                                        </div>

                                        <div className='form-group grid_full_width form-vertical'>
                                            <label>Reg End Date</label>
                                            <DateEl
                                                value={get_value('reg_end_date')}
                                                name="reg_end_date"
                                                handler={() => console.log('Date changed')}
                                            />
                                        </div>

                                        <div className="form-group grid_full_width form-vertical">
                                                <label>Session Start Date Time</label>
                                                <DateTime
                                                    value={get_value('session_start_date_time')}
                                                    name={'session_start_date_time'}
                                                    handler={() => { console.log('arguments') }}
                                                ></DateTime>
                                            </div>
                                            <div className="form-group grid_full_width form-vertical">
                                                <label>Session End Date Time</label>
                                                <DateTime
                                                    value={get_value('session_end_date_time')}
                                                    name={'session_end_date_time'}
                                                    handler={() => { console.log('arguments') }}
                                                ></DateTime>
                                            </div>

                                        <div className="form-group grid_full_width form-vertical">
                                            <InputImage
                                                defalut_preview={get_value('poster')}
                                                label="Poster"
                                                name="poster"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-vertical">
                                <button className="btn btn-outline-info">Submit</button>
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
                                <span className="material-symbols-outlined fill">visibility</span>
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