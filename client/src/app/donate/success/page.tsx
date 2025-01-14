"use client";
import React from 'react';

const DonationSuccessPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You for Your Donation!</h1>
        <p className="text-gray-700 mb-6">
          Your donation was successful. Your support helps us make a difference.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Return to Home
        </button>
      </div>

      <div
        style={{
          marginLeft: 40,
          marginRight: 40,
          overflow: "hidden",
          minHeight: 700
        }}
      >
        <div className="mb20 flex-horizontal flex-justify flex-align-start width-100">
          <div>
            <div className="h1 mb20">Invoice</div>
            <div className="mb20">
              <table cellPadding={0} cellSpacing={0} className="metadata" style={{}}>
                <tbody>
                  <tr>
                    <td>Invoice number</td>
                    <td>71AF6F8C-DRAFT</td>
                  </tr>
                  <tr>
                    <td>Date due</td>
                    <td>February 10, 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="brand-logo-container hidden">
            <img className="logo-img brand-logo-img" src="data:image/png;base64," />
          </div>
          <div className="brand-logo-fallback-container ">
            <div className="h1 logo-gray">IREAD</div>
          </div>
        </div>
        <div className="flex-horizontal flex-align-start mb30 break-word">
          <div className="width-40 pr15 border-box-box-sizing">
            <div className="address-merchant-name bold">IREAD</div>
            <div className="address-lines">
              <div>United States</div>
            </div>
            <div className="address-phone"></div>
            <div></div>
          </div>
          <div className="flex-horizontal width-60">
            <div className="pr15 border-box-box-sizing width-100">
              <div className="bold">Bill to</div>
              <div>Shah Jalal</div>
              <div className="address-lines"></div>
              <div className="address-phone"></div>
              <div>shah.jalal.ju.bd@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="mb30">
          <div className="h2">$26.00 USD due February 10, 2025</div>
          <div className="mt10 pb5 bold">
            <a href="https://invoice.stripe.com/i/acct_1JwIBsFBTfTsSwmz/test_YWNjdF8xSndJQnNGQlRmVHNTd216LF9SWkNGbkd4UHlvMUZhSkYwYUtvTHF0cWpzWmg2YzI3LDEyNzEzOTYwOA02007hJKcCxu?s=pd">
              Pay online
            </a>
          </div>
        </div>
        <table
          cellPadding={0}
          cellSpacing={0}
          className="line-item-table mb30 line-item-table-dynamic-column-widths"
          style={{}}
        >
          <tbody>
            <tr className="table-headers">
              <td className="width-50 center-valign">Description</td>
              <td></td>
              <td className="width-1 nowrap align-right center-valign">Qty</td>
              <td className="width-40-px"></td>
              <td className="width-1 nowrap align-right center-valign">
                <div className="line-height-1point3">Unit price</div>
              </td>
              <td className="width-40-px"></td>
              <td className="width-0 center-valign"></td>
              <td className="width-0"></td>
              <td className="width-1 nowrap align-right center-valign align-right">
                <div className="line-height-1point3">Amount</div>
              </td>
            </tr>
            <tr
              className="line-item-row">
              <td colSpan={2}>
                <div
                  style={{ wordBreak: "break-word", paddingLeft: 0, paddingRight: 5 }}
                >
                  Donation
                </div>
              </td>
              <td>1</td>
              <td></td>
              <td className="break-word">
                <div>$26.00</div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>$26.00</td>
            </tr>
            <tr>
              <td
                colSpan={5}
                height={15}
                style={{
                  border: 0,
                  borderCollapse: "collapse",
                  margin: 0,
                  padding: 0,
                  height: 15,
                  fontSize: 1,
                  lineHeight: 1,
                }}
              >
                &nbsp;
              </td>
            </tr>
            <tr className="summary-amount-border ">
              <td></td>
              <td colSpan={8}></td>
            </tr>
            <tr className="summary-amount ">
              <td></td>
              <td colSpan={7}>Subtotal</td>
              <td className="break-word align-right">$26.00</td>
            </tr>
            <tr className="summary-amount-border ">
              <td></td>
              <td colSpan={8}></td>
            </tr>
            <tr className="summary-amount ">
              <td></td>
              <td colSpan={7}>Total</td>
              <td className="break-word align-right">$26.00</td>
            </tr>
            <tr className="summary-amount-border ">
              <td></td>
              <td colSpan={8}></td>
            </tr>
            <tr className="summary-amount bold">
              <td></td>
              <td colSpan={7}>Amount due</td>
              <td className="break-word align-right">$26.00&nbsp;USD</td>
            </tr>
          </tbody>
        </table>
        <div className="pb30 avoid-page-break"></div>
        <div className="fs-10"></div>
      </div>
    </>
  );
};

export default DonationSuccessPage;
