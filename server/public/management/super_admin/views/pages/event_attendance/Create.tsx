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
import SessionDropDown from '../event_sessions/components/dropdownMatch/DropDown';
import axios from 'axios';
import toast from 'react-hot-toast';
import Time from '../../components/Time';
import { Attendance, Event, User } from '../../../../../types';
import DateEl from '../../components/DateEl';

export interface Props { }

const Create: React.FC<Props> = () => {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [event, setEvent] = useState<Event | null>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [userAttendances, setUserAttendances] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );
    const dispatch = useAppDispatch();

    // Fetch sessions when event is selected
    useEffect(() => {
        if (!selectedEventId) {
            setSessions([]);
            setSelectedSessionId(null);
            return;
        }

        const fetchEventAndSessions = async () => {
            setLoading(true);
            setError(null);
            try {
                const [eventRes, sessionsRes] = await Promise.all([
                    axios.get(`/api/v1/events/${selectedEventId}`),
                    axios.get(`/api/v1/event-sessions/event/${selectedEventId}`),
                ]);

                setEvent(eventRes.data.data);
                setSessions(sessionsRes.data.data);
                
                // Reset users and attendances when event changes
                setUsers([]);
                setUserAttendances([]);
            } catch {
                setError('Failed to fetch event data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEventAndSessions();
    }, [selectedEventId]);

    // Fetch users when both event and session are selected
    useEffect(() => {
        if (!selectedEventId || !selectedSessionId) {
            setUsers([]);
            setUserAttendances([]);
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const usersRes = await axios.get(`/api/v1/event-enrollments/by-event/${selectedEventId}`);
                
                setUsers(usersRes.data.data);
                setUserAttendances(
                    usersRes.data.data.map((user: User) => ({
                        event_id: selectedEventId,
                        event_session_id: selectedSessionId,
                        date: selectedDate,
                        user_id: user.id,
                        time: selectedTime || '',
                        is_present: false,
                    }))
                );
            } catch {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [selectedEventId, selectedSessionId]);

    // Function to split the date and time
    const splitDateTime = (dateTimeString: string) => {
        if (!dateTimeString) return { date: null, time: null };
        
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toISOString().split('T')[0];
        const time = dateTime.toTimeString().split(' ')[0];
        return { date, time };
    };

    const handleTimeChange = (userId: number, time: string) => {
        setUserAttendances(prev =>
            prev.map(record =>
                record.user_id === userId ? { ...record, time } : record
            ),
        );
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!selectedEventId || !selectedSessionId) {
            toast.error('Please select both event and session');
            return;
        }

        try {
            const response = await dispatch(store(userAttendances) as any);
            if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
                toast.success('Attendance saved successfully!');
            }
        } catch (err) {
            toast.error('Error saving attendance');
            console.error(err);
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
                                        disabled={!selectedEventId}
                                        options={sessions.map(session => ({
                                            id: session.id,
                                            title: session.title,
                                        }))}
                                        get_selected_data={(data) => {
                                            setSelectedSessionId(Number(data.ids));
                                        }}
                                    />
                                </div>

                                <div className="form-group form-vertical">
                                    <label>Date</label>
                                    <DateEl
                                        name="date"
                                        value={selectedDate || get_value('date')}
                                        handler={(data) => {
                                            setSelectedDate(data?.date);
                                            setUserAttendances(prev =>
                                                prev.map(record => ({
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

                            {selectedEventId && selectedSessionId && users.length > 0 ? (
                                <>
                                    <div className="mt-4 mb-2">
                                        <h6>Attendance for: {event?.title} - {
                                            sessions.find(s => s.id === selectedSessionId)?.title
                                        }</h6>
                                        <p>Total Users: {users.length}</p>
                                    </div>
                                    
                                    <table className="w-full border-collapse border border-gray-300 mt-4">
                                        {/* Table content remains the same */}
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border p-2">#</th>
                                                <th className="border p-2">User ID</th>
                                                <th className="border p-2">First Name</th>
                                                <th className="border p-2">Last Name</th>
                                                <th className="border p-2">Email</th>
                                                <th className="border p-2">Phone</th>
                                                <th className="border p-2">Photo</th>
                                                <th className="border p-2">Time</th>
                                                <th className="border p-2">Is Present</th>
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
                                                            default_value={selectedTime}
                                                            value={
                                                                userAttendances.find(
                                                                    record => record.user_id === user.id
                                                                )?.time || ''
                                                            }
                                                            handler={(data) =>
                                                                handleTimeChange(user.id, data as any)
                                                            }
                                                        />
                                                    </td>
                                                    <td className="border p-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                userAttendances.find(record => record.user_id === user.id)
                                                                    ?.is_present || false
                                                            }
                                                            onChange={() => {
                                                                setUserAttendances(prev =>
                                                                    prev.map(record =>
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
                                </>
                            ) : selectedEventId && selectedSessionId ? (
                                !loading && <p>No users found for this event session.</p>
                            ) : (
                                !loading && (
                                    <p className="mt-4">
                                        {!selectedEventId 
                                            ? "Please select an event first" 
                                            : "Please select a session to view attendees"}
                                    </p>
                                )
                            )}

                            {selectedEventId && selectedSessionId && users.length > 0 && (
                                <div className="form-group form-vertical mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn_1 btn-outline-info"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Submit Attendance'}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Create;
