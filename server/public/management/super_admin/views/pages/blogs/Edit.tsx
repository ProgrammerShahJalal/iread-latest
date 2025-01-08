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

    // Generate slug
    const generateSlug = (title: string): string =>
        title.toLowerCase().trim().replace(/[\s\W-]+/g, '-');

    const checkSlugUniqueness = async (slug: string): Promise<boolean> => {
        const response = await fetch(`/api/v1/blogs/slug?slug=${slug}`);
        const data = await response.json();
        return data.isUnique;
    };

    // Handle form submission
    async function handle_submit(e) {
        e.preventDefault();
        let form_data = new FormData(e.target);

        // Generate the slug from the title
        const title = form_data.get('title') as string;
        let slug = generateSlug(title);

        // Check slug uniqueness
        const isUnique = await checkSlugUniqueness(slug);
        if (!isUnique) {
            slug = `${slug}-${Date.now()}`; // Append timestamp for uniqueness
        }
        form_data.set('slug', slug);
        form_data.append('full_description', data.getData());

        const response = await dispatch(update(form_data) as any);
        console.log('RESPONSE', response);
    }


    // Get value helper
    const get_value = (key: string): string => {
        try {
            return state.item[key] || state.item?.info?.[key] || '';
        } catch {
            return '';
        }
    };

    // Handle title change
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setSlug(generateSlug(title));
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

                                        {['seo_title', 'seo_keyword', 'seo_description'].map((i) => (
                                            <div key={i} className="form-group form-vertical">
                                                <Input value={get_value(i)} name={i} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-4">
                                        <Input value={get_value('title')} name="title" />
                                        <Input value={get_value('slug')} name="slug" />
                                        <label>Blog Categories</label>
                                        <CategoryDropDown
                                            name="blog_categories"
                                            multiple={true}
                                            get_selected_data={(data) => console.log(data)}
                                        />

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

                                        <label>Published Date</label>
                                        <DateEl
                                            value={get_value('publish_date')}
                                            name="publish_date"
                                            handler={() => console.log('Date changed')}
                                        />
                                        <InputImage
                                            defalut_preview={get_value('cover_image')}
                                            label="Cover Image"
                                            name="cover_image"
                                        />
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
                    {state.item.id && (
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
