import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { anyObject } from '../../common_types/object';
import moment from 'moment/moment';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const [collections, setCollections] = useState<anyObject[]>([]);
    const [students, setStudents] = useState<anyObject[]>([]);
    const [parents, setParents] = useState<anyObject[]>([]);
    const [admins, setAdmins] = useState<anyObject[]>([]);
    const [blogs, setBlogs] = useState<anyObject[]>([]);
    const [events, setEvents] = useState<anyObject[]>([]);



    useEffect(() => {
        axios.get(`http://127.0.0.1:5011/api/v1/auth?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10&select_fields=`)
            .then(res => {
                const users = res.data.data.data;
                setCollections(users);
                setAdmins(users.filter((item: any) => item.role?.title === "admin"));
                setParents(users.filter((item: any) => item.role?.title === "parent"));
                setStudents(users.filter((item: any) => item.role?.title === "student"));
            });
        init_chart();
    }, [])

    useEffect(() => {
        axios.get(`http://127.0.0.1:5011/api/v1/blogs?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10&select_fields=`)
            .then(res => {
                const blogs = res.data.data.data;
                setBlogs(blogs);
            });
        init_chart();
    }, [])

    useEffect(() => {
        axios.get(`http://127.0.0.1:5011/api/v1/events?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10&select_fields=`)
            .then(res => {
                const events = res.data.data.data;
                setEvents(events);
            });
        init_chart();
    }, [])


    return <div className="container">
        <div className="row my-4">
            <div className="col-xl-3 col-lg-4">
                <div className="card" data-intro="This is card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Total Students</span>
                                <h2 className="total-value m-0 counter">
                                    {students?.length}
                                </h2>
                            </div>
                            <i className="icofont icofont-growth font-info align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Total Parents</span>
                                <h2 className="total-value m-0 counter">
                                    {parents?.length}
                                </h2>
                            </div>
                            <i className="icofont icofont-chart-bar-graph font-primary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Total admins</span>
                                <h2 className="total-value m-0 counter">
                                    {admins?.length}
                                </h2>
                            </div>
                            <i className="icofont icofont-chart-histogram font-secondary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row my-4">

            <div className="col-xl-3 col-lg-4">
                <div className="card" data-intro="This is card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Total Blogs</span>
                                <h2 className="total-value m-0 counter">
                                    {blogs?.length}
                                </h2>
                            </div>
                            <i className="icofont icofont-growth font-info align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Total Events</span>
                                <h2 className="total-value m-0 counter">
                                    {events.length}
                                </h2>
                            </div>
                            <i className="icofont icofont-chart-bar-graph font-primary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="business-top-widget card-body">
                        <div className="media d-inline-flex">
                            <div className="media-body">
                                <span className="mb-2">Total Comments</span>
                                <h2 className="total-value m-0 counter">
                                    {collections.total_comments}
                                </h2>
                            </div>
                            <i className="icofont icofont-chart-histogram font-secondary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>


    </div>;
};

async function init_chart() {

    let res = await axios.get('http://127.0.0.1:5011/api/v1/blogs?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10&select_fields=');

    new Chartist.LineChart('#my_chart', {
        labels: res.data.data?.labels,
        series: [
            res.data?.data?.data?.booking_money,
            res.data?.data?.data?.down_payment,
            res.data?.data?.data?.installment,
        ]
    }, {
        fullWidth: true,
        plugins: [
            new Chartist.plugins.tooltip({
                class: 'chart_tool_tip',
            })
        ]
    });
}

export default T1;