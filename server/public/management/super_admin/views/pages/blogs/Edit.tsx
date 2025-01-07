import React, { useEffect, useState } from 'react';
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
import DropDown from './components/dropdown/DropDown';
import Select from './components/management_data_page/Select';
import { anyObject } from '../../../common_types/object';
import DateEl from '../../components/DateEl';
import CategoryDropDown from "../blog_category/components/dropdown/DropDown";



export interface Props { }

const Edit: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();
    const params = useParams();

    const [data, setData] = useState<anyObject>({});


    useEffect(() => {
        const fullDescriptionElement = document.querySelector('[data-name="full_description"]');
        if (fullDescriptionElement) {
            const editor = CKEDITOR.replace('full_description'); 

            const defaultValue = get_value('full_description');

            if (defaultValue) {
                editor.setData(defaultValue);
            }
            setData(editor);
        }
    }, [state.item]);




    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);


    const generateSlug = (title: string): string => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-'); // Replace spaces and special characters with hyphens
    };

    const checkSlugUniqueness = async (slug: string): Promise<boolean> => {
        const response = await fetch(`/api/v1/blogs/slug?slug=${slug}`);
        const data = await response.json();
        return data.isUnique;
    };


    async function handle_submit(e) {
        e.preventDefault();
        let form_data = new FormData(e.target);
        const response = await dispatch(update(form_data) as any);

        const title = form_data.get('title') as string;
        let slug = generateSlug(title);

        // Check slug uniqueness
        const isUnique = await checkSlugUniqueness(slug);
        if (!isUnique) {
            slug = `${slug}-${Date.now()}`; // Append timestamp for uniqueness
        }
        form_data.set('slug', slug);
        form_data.append('full_description', data.getData());
    }

    function get_value(key) {
        try {
            if (state.item[key]) return state.item[key];
            if (state.item?.info[key]) return state.item?.info[key];
        } catch (error) {
            return '';
        }
        return '';
    }


    const [slug, setSlug] = useState('');

    const handleTitleChange = (value) => {
        setSlug(generateSlug(value));
    };



    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="mx-auto pt-3"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    defaultValue={get_value(`id`)}
                                />

                                <div>
                                    <h5 className="mb-4">
                                        Input Data
                                    </h5>
                                    <div className="row">

                                        <div className='col-8'>


                                            <label className='mb-4'> Full Description</label>
                                            <div
                                                data-name="full_description"
                                                id="full_description"
                                                defaultValue={get_value('full_description')}
                                            >

                                            </div>
                                            <div className="form-group mt-4">
                                                <label>Short Description</label>
                                                <textarea
                                                    className="form-control"
                                                    defaultValue={get_value('short_description')}
                                                    name='short_description'
                                                    id="short_description"
                                                    rows={3}></textarea>
                                            </div>

                                            {[


                                                'seo_title',
                                                'seo_keyword',
                                                'seo_description',
                                            ].map((i) => (
                                                <div className="form-group form-vertical">
                                                    <Input value={get_value(i)} name={i} />
                                                </div>
                                            ))}

                                        </div>

                                        <div className='col-4'>

                                            <div className="form_auto_fit">

                                                <div className="form-group form-vertical">

                                                    <Input

                                                        value={get_value("title")}
                                                        setter={(data) => {
                                                            console.log(data)
                                                            handleTitleChange(data)

                                                        }} name='title' />

                                                </div>
                                                <div className="form-group form-vertical">
                                                    <Input value={get_value('slug')} name="slug" />
                                                </div>

                                                <div className="form-group form-vertical">
                                                    <label>Blog Categories</label>
                                                    <CategoryDropDown name="blog_categories"
                                                        multiple={true}
                                                        get_selected_data={(data) => {
                                                            console.log(data)
                                                        }}
                                                    />
                                                </div>

                                                {/* RADIO OPTIONS */}
                                                <label>Is Published</label>
                                                <div style={{
                                                    paddingBottom: 10
                                                }}>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="is_published"
                                                            value="publish"
                                                            checked={get_value('status') === 'publish'}
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
                                                        Publish
                                                    </label>
                                                    <br />
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="is_published"
                                                            value="draft"
                                                            checked={get_value('status') === 'draft'}
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
                                                        Draft
                                                    </label>
                                                </div>



                                                <div className="form-group grid_full_width form-vertical">
                                                    <label>Publish Date</label>
                                                    <DateEl
                                                        value={get_value('publish_date')}
                                                        name={'publish_date'}
                                                        handler={() => { console.log('arguments') }}
                                                    ></DateEl>
                                                </div>

                                                <div className="form-group grid_full_width form-vertical">
                                                    <InputImage
                                                        defalut_preview={get_value('cover_image')}
                                                        label={'Cover Image'}
                                                        name={'cover_image'}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="form-group form-vertical">
                                    <label></label>
                                    <div className="form_elements">
                                        <button className="btn btn-outline-info">
                                            submit
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
                                    to={`/${setup.route_prefix}/details/${state.item?.id}`}
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
        </>
    );
};

export default Edit;
