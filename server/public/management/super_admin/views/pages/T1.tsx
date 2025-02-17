import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { anyObject } from '../../common_types/object';
import moment from 'moment/moment';
export interface Props { }

const T1: React.FC<Props> = (props: Props) => {
    const [collections, setCollections] = useState<anyObject>({});

    useEffect(() => {
        axios.get('/api/v1/account/logs/todays-collection')
            .then(res => {
                setCollections(res.data.data);
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
                                    {collections.total_students}
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
                                    {collections.total_parents}
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
                                <span className="mb-2">Total Verified Users</span>
                                <h2 className="total-value m-0 counter">
                                    {collections.total_verified_users}
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
                                    {collections.total_blogs}
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
                                    {collections.total_events}
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
                                <span className="mb-2">Total Comments</span>
                                <h2 className="total-value m-0 counter">
                                    {collections.total_comments}
                                </h2>
                            </div>
                            <i className="icofont icofont-chart-histogram font-secondary align-self-center"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>;
};

async function init_chart() {
    // function randomInRange(min, max) {
    //     return Math.floor(Math.random() * max) + min;
    // }

    // function randomArray(meta = "booking money", min = 10000, max = 99999, count = 7) {
    //     let array = [];
    //     for (let i = 0; i < count; i++) {
    //         array.push({ meta, value: randomInRange(min, max) });
    //         // array.push(randomInRange(min, max));
    //     }
    //     return array;
    // }

    let res = await axios.get('/api/v1/account/logs/seven-days-collection');

    new Chartist.LineChart('#my_chart', {
        labels: res.data.data?.labels,
        series: [
            res.data.data?.booking_money,
            res.data.data?.down_payment,
            res.data.data?.installment,
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
