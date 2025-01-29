import React from 'react';
import { createPortal } from 'react-dom';
import { RootState, useAppDispatch } from '../../../../../store';
import storeSlice from '../../config/store';
import { initialState } from '../../config/store/inital_state';
import { useSelector } from 'react-redux';
import setup from '../../config/setup';
import moment from 'moment/moment';
export interface Props { }

const modalRoot = document.getElementById('filter-root');

const QuickView: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    function close_canvas(action: boolean = true) {
        dispatch(storeSlice.actions.set_show_quick_view_canvas(action));
    }


    if (modalRoot && state.show_quick_view_canvas) {
        return createPortal(
            <div className="off_canvas quick_view">
                <div className="off_canvas_body">
                    <div className="header">
                        <h3 className="heading_text">Quick View</h3>
                        <button
                            className="close_button"
                            onClick={() => close_canvas(false)}
                        >
                            <span className="material-symbols-outlined fill">
                                close
                            </span>
                        </button>
                    </div>

                    <div className="data_content">
                        <table className="table quick_modal_table">
                            <tbody>
                                <tr>
                                    <th>Event ID</th>
                                    <th>:</th>
                                    <th>{state.item.event_id}</th>
                                </tr>
                                <tr>
                                    <th>Title</th>
                                    <th>:</th>
                                    <th>{state.item.title}</th>
                                </tr>
                                <tr>
                                    <th>Topics</th>
                                    <th>:</th>
                                    <th>{state.item.topics}</th>
                                </tr>
                                <tr>
                                    <th>Start</th>
                                    <th>:</th>
                                    <th>{state.item.start}</th>
                                </tr>
                                <tr>
                                    <th>End</th>
                                    <th>:</th>
                                    <th>{state.item.end}</th>
                                </tr>
                                <tr>
                                    <th>Total Time</th>
                                    <th>:</th>
                                    <th>{state.item.total_time} Minutes</th>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <th>:</th>
                                    <th>{state.item.status}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="off_canvas_overlay"></div>
            </div>,
            modalRoot,
        );
    } else {
        return <></>;
    }
};

export default QuickView;
