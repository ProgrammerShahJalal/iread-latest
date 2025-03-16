import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import Input from './components/management_data_page/Input';
import { initialState } from './config/store/inital_state';
import { useSelector } from 'react-redux';
import EventDropDown from '../events/components/dropdown/DropDown';
import SessionDropDown from '../event_sessions/components/dropdown/DropDown';
import DateTime from '../../components/DateTime';
import axios from 'axios';

export interface Props {}
interface User {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    slug: string;
}

const Create: React.FC<Props> = (props: Props) => {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        if (!selectedEventId) return;

        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://127.0.0.1:5011/api/v1/event-enrollments/by-event/${selectedEventId}`,
                );
                setUsers(response.data.data);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [selectedEventId]);

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
                                <h5 className="mb-4">
                                    Event Attendance Informations
                                </h5>
                                <div className="form_auto_fit">
                                    <div className="form-group form-vertical">
                                        <label>Events</label>
                                        <EventDropDown
                                            name="events"
                                            multiple={false}
                                            get_selected_data={(data) => {
                                                console.log(Number(data.ids));
                                                setSelectedEventId(
                                                    Number(data.ids),
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="form-group form-vertical">
                                        <label>Sessions</label>
                                        <SessionDropDown
                                            name="sessions"
                                            multiple={false}
                                            get_selected_data={(data) => {
                                                console.log(data);
                                            }}
                                        />
                                    </div>

                                    {/* Loading State */}
                                    {loading && <p>Loading...</p>}
                                    {error && (
                                        <p className="text-red-500">{error}</p>
                                    )}

                                    {/* User Table */}
                                    {users.length > 0 ? (
                                        <table className="w-full border-collapse border border-gray-300 mt-4">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border p-2">
                                                        #
                                                    </th>
                                                    <th className="border p-2">
                                                        Full Name
                                                    </th>
                                                    <th className="border p-2">
                                                        Email
                                                    </th>
                                                    <th className="border p-2">
                                                        Phone Number
                                                    </th>
                                                    <th className="border p-2">
                                                        Slug
                                                    </th>
                                                    <th className="border p-2">
                                                        Attendence
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, index) => (
                                                    <tr
                                                        key={index}
                                                        className="text-center"
                                                    >
                                                        <td className="border p-2">
                                                            {index + 1}
                                                        </td>
                                                        <td className="border p-2">{`${user.first_name} ${user.last_name}`}</td>
                                                        <td className="border p-2">
                                                            {user.email}
                                                        </td>
                                                        <td className="border p-2">
                                                            {user.phone_number}
                                                        </td>
                                                        <td className="border p-2">
                                                            {user.slug}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        !loading && (
                                            <p>
                                                No users found for this event.
                                            </p>
                                        )
                                    )}

                                    {/* <div className="form-group form-vertical">
                                        <DateTime
                                            name={'date_time'}
                                            value={get_value('date_time')}
                                            handler={(data) =>
                                                console.log(
                                                    'Date Time Changed',
                                                    data,
                                                )
                                            }
                                        />
                                    </div> */}
                                </div>
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
