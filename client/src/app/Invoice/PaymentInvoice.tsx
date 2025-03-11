import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";

interface InvoiceProps {
    name: string | null;
    email: string | null;
    phone: string | null;
    occupation: string | null;
    amount: string | null;
    trx_id?: string | null;
    getTodayDate: () => string;
    generateInvoiceNumber: () => string;
}

const PaymentInvoice: React.FC<InvoiceProps> = ({ 
    name, email, phone, occupation, amount, trx_id, getTodayDate, generateInvoiceNumber 
}) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const handleDownloadInvoice = () => {
        if (targetRef.current) {
            html2canvas(targetRef.current).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
                pdf.save("invoice.pdf");
            });
        } else {
            console.error("Target element not found");
        }
    };

    return (
        <div className="mb-10">
            <div className="mx-auto max-w-[768px] min-w-[320px]">
                <div>
                    <div className="text-center">
                        <button
                            className="bg-green-600 px-3 py-2 rounded-md text-white"
                            onClick={handleDownloadInvoice}
                        >
                            Download Invoice
                        </button>
                    </div>
                    
                    {/* Attach the ref to this div */}
                    <div ref={targetRef} id="payment-content-id" className="p-10 mb-24 rounded-md">
                        {/* Invoice content */}
                        <div className="flex items-center justify-between mb-8 px-3 pt-20">
                            <div>
                                <span className="text-2xl">Payment Invoice #</span>: {generateInvoiceNumber()}
                                <br />
                                <span>Date</span>: {getTodayDate()}
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
                                <h1 className="font-bold">User Info</h1>
                                <p><strong>Name:</strong> {name}</p>
                                <p><strong>Email:</strong> {email}</p>
                                <p><strong>Phone:</strong> {phone}</p>
                                <p><strong>Occupation:</strong> {occupation}</p>
                                {trx_id && <p><strong>Trx ID:</strong> {trx_id}</p>}
                            </div>
                            <div className="text-right">
                                <h1 className="font-bold">Recipient Info</h1>
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
                            <div>Payment</div>
                            <div className="text-right font-medium">${amount}</div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center mb-2 px-3">
                            <div className="text-2xl leading-none">
                                <span>Total</span>:
                            </div>
                            <div className="text-2xl text-right font-medium">${amount}</div>
                        </div>
                        <div className="py-3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentInvoice;