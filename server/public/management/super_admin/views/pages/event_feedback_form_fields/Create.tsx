import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import Input from './components/management_data_page/Input';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import $ from "jquery";
import "formBuilder";
import EventDropDown from "../events/components/dropdown/DropDown";


export interface Props { }


const Create: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();

    async function handle_submit(e) {
        e.preventDefault();
        let form_data = new FormData(e.target);
        const response = await dispatch(store(form_data) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            e.target.reset();
            // init_nominee();
        }
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


    useEffect(() => {
        // Ensure jQuery is ready before running formBuilder
        if (typeof window !== "undefined") {
            const fbTemplate = $("#build-wrap");
            if (fbTemplate.length > 0 && typeof fbTemplate.formBuilder === "function") {
                fbTemplate.formBuilder();
            } else {
                console.error("formBuilder is not available. Make sure it is correctly imported.");
            }
        }
    }, []);



    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="mx-auto pt-3"
                        >
                            <div>

                                <div >

                                    <div className="form-group form-vertical">
                                        <label>Events</label>
                                        <EventDropDown name="events"
                                            multiple={false}
                                            default_value={get_value('event_id') ? [{ id: get_value('event_id') }] : []}
                                            get_selected_data={(data) => {
                                                console.log(data)
                                            }}
                                        />
                                    </div>

                                    <div
                                    className="header2"
                                        id="build-wrap"
                                        style={{
                                            padding: 0,
                                            margin: "10px 0",
                                            backgroundColor: "#423050",
                                            backgroundImage: 'url("https://formbuilder.online/assets/img/noise.png")',
                                            backgroundRepeat: "repeat",
                                        }}
                                    >
                                        <div id="fb-editor"
                                        
                                        ></div>
                                    </div>
                                </div>

                                {/* {[
                                        'label',
                                        'type',
                                        'select_options',
                                        'serial',
                                    ].map((i) => (
                                        <div key={i} className="form-group form-vertical">
                                            <Input name={i} />
                                        </div>
                                    ))} */}




                            </div>

                            <div className="form-group form-vertical">
                                <label></label>
                                <div className="form_elements">
                                    <button className="btn btn_1 btn-outline-info">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
