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
    id: number;
    uid: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    slug: string;
    photo: string;
}

interface Attendance {
    event_id: number;
    event_session_id: number | null;
    user_id: number;
    date_time: string;
}

const Create: React.FC<Props> = () => {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [userAttendances, setUserAttendances] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const state: typeof initialState = useSelector((state: RootState) => state[setup.module_name]);
    const dispatch = useAppDispatch();

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
                
                // Initialize attendance state
                const initialAttendances = response.data.data.map((user: User) => ({
                    event_id: selectedEventId,
                    event_session_id: selectedSessionId,
                    user_id: user.id,
                    date_time: "",
                }));
                setUserAttendances(initialAttendances);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [selectedEventId]);

    const handleDateTimeChange = (userId: number, dateTime: string) => {
        setUserAttendances((prev) =>
            prev.map((record) =>
                record.user_id === userId ? { ...record, date_time: dateTime } : record
            )
        );
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await dispatch(store(userAttendances) as any);
            if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
                alert('Attendance saved successfully!');
            }
        } catch (err) {
            console.error('Error saving attendance:', err);
        }
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title} />
                    <div className="content_body custom_scroll">
                        <form onSubmit={handleSubmit} className="mx-auto pt-3">
                            <h5 className="mb-4">Event Attendance Information</h5>
                            <div className="form_auto_fit">
                                <div className="form-group form-vertical">
                                    <label>Events</label>
                                    <EventDropDown
                                        name="events"
                                        multiple={false}
                                        get_selected_data={(data) => {
                                            setSelectedEventId(Number(data.ids));
                                        }}
                                    />
                                </div>
                                <div className="form-group form-vertical">
                                    <label>Sessions</label>
                                    <SessionDropDown
                                        name="sessions"
                                        multiple={false}
                                        get_selected_data={(data) => {
                                            setSelectedSessionId(Number(data.ids));
                                            setUserAttendances((prev) =>
                                                prev.map((record) => ({
                                                    ...record,
                                                    event_session_id: Number(data.ids),
                                                }))
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            {loading && <p>Loading...</p>}
                            {error && <p className="text-red-500">{error}</p>}

                            {users.length > 0 ? (
                                <table className="w-full border-collapse border border-gray-300 mt-4">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border p-2">#</th>
                                            <th className="border p-2">User ID</th>
                                            <th className="border p-2">First Name</th>
                                            <th className="border p-2">Last Name</th>
                                            <th className="border p-2">Email</th>
                                            <th className="border p-2">Phone</th>
                                            <th className="border p-2">Photo</th>
                                            <th className="border p-2">Date Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user.id} className="text-center">
                                                <td className="border p-2">{index + 1}</td>
                                                <td className="border p-2">{user.id}</td>
                                                <td className="border p-2">{user.first_name}</td>
                                                <td className="border p-2">{user.last_name}</td>
                                                <td className="border p-2">{user.email}</td>
                                                <td className="border p-2">{user.phone_number}</td>
                                                <td className="border p-2">
                                                    <img width={30} height={30} className="w-32 h-32" src={user.photo} alt="User Photo" />
                                                </td>
                                                <td className="border p-2">
                                                    <DateTime
                                                        name={`date_time_${user.id}`}
                                                        value={
                                                            userAttendances.find((record) => record.user_id === user.id)?.date_time || ""
                                                        }
                                                        handler={(data) => handleDateTimeChange(user.id, data as any)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                !loading && <p>No users found for this event.</p>
                            )}

                            <div className="form-group form-vertical mt-4">
                                <button type="submit" className="btn btn_1 btn-outline-info">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Create;
