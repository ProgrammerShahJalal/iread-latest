import Image from "next/image";
import React, { useRef } from "react";
import generatePDF, { Options } from "react-to-pdf";

const Invoice: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const targetRef = useRef();

    const getTargetElement = () => document.getElementById('content-id');


    return (
        <div className="container mb-10">
            <div className="mx-auto w-4/5 max-w-[768px]">
                <div>
                       <div className="text-center">
                       <button className="bg-green-600 px-3 py-2 rounded-md text-white" onClick={() => generatePDF(getTargetElement,{filename: 'invoice.pdf'}, Options)}>Download Invoice</button>
                       </div>
                        <div ref={targetRef} id="content-id" className="p-10 rounded-md">
                            {/* Invoice Header */}
                            <div className="flex items-center justify-between mb-8 px-3">
                                <div>
                                    <span className="text-2xl">Donation Invoice #</span>: 0047-2025
                                    <br />
                                    <span>Date</span>: 15 January 2025
                                    <br />
                                </div>
                                <div className="text-right">
                                    <Image
                                        src="/frontend/images/invoice.png"
                                        alt="Logo of Invoice"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>

                            {/* Invoice Details */}
                            <div className="flex justify-between mb-8 px-3">
                                <div>
                                    Pixel &amp; Tonic
                                    <br />
                                    919 NW Bond St. Ste 203
                                    <br />
                                    Bend, OR 97703 USA
                                    <br />
                                    hello@pixelandtonic.com
                                    <br />
                                    +1 855-700-5115
                                </div>
                                <div className="text-right">
                                    IREAD
                                    <br />
                                    Street 12
                                    <br />
                                    10000 City, USA
                                    <br />
                                    hello@iread.com
                                </div>
                            </div>

                            {/* Invoice Items */}
                            <div className="flex justify-between mb-4 bg-gray-200 px-3 py-2">
                                <div>Donation</div>
                                <div className="text-right font-medium">1200 USD</div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-2 px-3">
                                <div className="text-2xl leading-none">
                                    <span>Total</span>:
                                </div>
                                <div className="text-2xl text-right font-medium">1200 USD</div>
                            </div>
                            <div className="py-3"></div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Invoice;
