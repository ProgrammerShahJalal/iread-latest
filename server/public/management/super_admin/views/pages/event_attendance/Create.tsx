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
import DateElA from '../../components/DateElA';
import axios from 'axios';
import toast from 'react-hot-toast';
import Time from '../../components/Time';
import { Attendance, Event, User } from '../../../../../types';

export interface Props { }

const Create: React.FC<Props> = () => {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
        null,
    );
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [event, setEvent] = useState<Event>({
        event_id: 0,
        title: '',
        reg_start_date: '',
        reg_end_date: '',
        session_start_date_time: '',
        session_end_date_time: '',
        place: '',
        short_description: '',
        full_description: '',
        pre_requisities: '',
        terms_and_conditions: '',
        event_type: '',
        poster: '',
        price: '',
        discount_price: '',
        categories: [],
        tags: [],
    });
    const [userAttendances, setUserAttendances] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
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

                const eventRes = await axios.get(
                    `http://127.0.0.1:5011/api/v1/events/${selectedEventId}`,
                );
                setEvent(eventRes.data.data);

                // Initialize attendance state
                const initialAttendances = response.data.data.map(
                    (user: User) => ({
                        event_id: selectedEventId,
                        event_session_id: selectedSessionId,
                        date: selectedDate,
                        user_id: user.id,
                        time: '',
                    }),
                );
                setUserAttendances(initialAttendances);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [selectedEventId]);

    // Function to split the date and time
    const splitDateTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toISOString().split('T')[0]; // Extracts date (YYYY-MM-DD)
        const time = dateTime.toTimeString().split(' ')[0]; // Extracts time (HH:MM:SS)
        return { date, time };
    };

    // Only call splitDateTime if event.session_start_date_time is valid
    useEffect(() => {
        if (event.session_start_date_time) {
            const { date, time } = splitDateTime(event.session_start_date_time);
            setSelectedDate(date); // Set the extracted date as the default value for DateElA
            setSelectedTime(time); // Set the extracted time as the default value for Time

            // Update userAttendances with the extracted time
            setUserAttendances((prev) =>
                prev.map((record) => ({
                    ...record,
                    date: date,
                    time: time,
                })),
            );
        }
    }, [event.session_start_date_time]);

    const handleTimeChange = (userId: number, time: string) => {
        setUserAttendances((prev) =>
            prev.map((record) =>
                record.user_id === userId ? { ...record, time: time } : record,
            ),
        );
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await dispatch(store(userAttendances) as any);
            if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
                toast.success('Attendance saved successfully!');
            }
        } catch (err) {
            toast.error('Error saving attendance:', err);
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

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title} />
                    <div className="content_body custom_scroll">
                        <form onSubmit={handleSubmit} className="mx-auto pt-3">
                            <h5 className="mb-4">
                                Event Attendance Information
                            </h5>
                            <div className="form_auto_fit">
                                <div className="form-group form-vertical">
                                    <label>Events</label>
                                    <EventDropDown
                                        name="events"
                                        multiple={false}
                                        get_selected_data={(data) => {
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
                                            setSelectedSessionId(
                                                Number(data.ids),
                                            );
                                            setUserAttendances((prev) =>
                                                prev.map((record) => ({
                                                    ...record,
                                                    event_session_id: Number(
                                                        data.ids,
                                                    ),
                                                })),
                                            );
                                        }}
                                    />
                                </div>

                                <div className="form-group form-vertical">
                                    <label>Date</label>
                                    <DateElA
                                        name="date"
                                        value={
                                            selectedDate || get_value('date')
                                        }
                                        default_value={selectedDate}
                                        handler={(data) => {
                                            setSelectedDate(data?.date);
                                            setUserAttendances((prev) =>
                                                prev.map((record) => ({
                                                    ...record,
                                                    date: data?.date,
                                                })),
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
                                            <th className="border p-2">
                                                User ID
                                            </th>
                                            <th className="border p-2">
                                                First Name
                                            </th>
                                            <th className="border p-2">
                                                Last Name
                                            </th>
                                            <th className="border p-2">
                                                Email
                                            </th>
                                            <th className="border p-2">
                                                Phone
                                            </th>
                                            <th className="border p-2">
                                                Photo
                                            </th>
                                            <th className="border p-2">Time</th>
                                            <th className="border p-2">Is Present</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr
                                                key={user.id}
                                                className="text-center"
                                            >
                                                <td className="border p-2">
                                                    {index + 1}
                                                </td>
                                                <td className="border p-2">
                                                    {user.id}
                                                </td>
                                                <td className="border p-2">
                                                    {user.first_name}
                                                </td>
                                                <td className="border p-2">
                                                    {user.last_name}
                                                </td>
                                                <td className="border p-2">
                                                    {user.email}
                                                </td>
                                                <td className="border p-2">
                                                    {user.phone_number}
                                                </td>
                                                <td className="border p-2">
                                                    <img
                                                        width={30}
                                                        height={30}
                                                        className="w-32 h-32"
                                                        src={user.photo}
                                                        alt="User Photo"
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <Time
                                                        name={`time_${user.id}`}
                                                        default_value={
                                                            selectedTime
                                                        }
                                                        value={
                                                            userAttendances.find(
                                                                (record) =>
                                                                    record.user_id ===
                                                                    user.id,
                                                            )?.time || ''
                                                        }
                                                        handler={(data) =>
                                                            handleTimeChange(
                                                                user.id,
                                                                data as any,
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="border p-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            userAttendances.find((record) => record.user_id === user.id)
                                                                ?.is_present || false
                                                        }
                                                        onChange={() => {
                                                            setUserAttendances((prev) =>
                                                                prev.map((record) =>
                                                                    record.user_id === user.id
                                                                        ? { ...record, is_present: !record.is_present }
                                                                        : record,
                                                                ),
                                                            );
                                                        }}
                                                    />
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                !loading && (
                                    <p>No users found for this event.</p>
                                )
                            )}

                            <div className="form-group form-vertical mt-4">
                                <button
                                    type="submit"
                                    className="btn btn_1 btn-outline-info"
                                >
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
