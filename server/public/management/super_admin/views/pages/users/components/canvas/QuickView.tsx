import React from 'react';
import { createPortal } from 'react-dom';
import { RootState, useAppDispatch } from '../../../../../store';
import storeSlice from '../../config/store';
import { initialState } from '../../config/store/inital_state';
import { useSelector } from 'react-redux';
import setup from '../../config/setup';
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
                                    <th></th>
                                    <th></th>
                                    <th>
                                        <img
                                            src={
                                                state.item.photo
                                                    ? `/${state.item.photo}`
                                                    : '/assets/dashboard/images/avatar.png'
                                            }
                                            alt=""
                                            style={{
                                                height: 30,
                                            }}
                                        />

                                    </th>
                                </tr>
                                <tr>
                                    <th>First Name</th>
                                    <th>:</th>
                                    <th>{state.item.first_name}</th>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <th>:</th>
                                    <th>{state.item.last_name}</th>
                                </tr>
                                <tr>
                                    <th>Role</th>
                                    <th>:</th>
                                    <th>{state.item.role.title}</th>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <th>:</th>
                                    <th>{state.item.email}</th>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <th>:</th>
                                    <th>{state.item.phone_number}</th>
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
