import React from "react";

function DonationPage() {
  return (
    <section className="">
      <div className="container">
        <div className="section-content">
          <div className="row">
            <div className="col-md-7">
              <h4 className="mt-0 mb-30 line-bottom">
                Be a Hero: Make a Difference with Your Donation Today!
              </h4>
              
              {/* Donation Form */}
              <form
                id="donation_form"
                name="donation_form"
                className=""
                method="post"
              >
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="form_name">
                        Name <small>*</small>
                      </label>
                      <input
                        name="form_name"
                        className="form-control"
                        type="text"
                        placeholder="Enter Name"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        Email <small>*</small>
                      </label>
                      <input
                        name="form_email"
                        className="form-control required email"
                        type="email"
                        placeholder="Enter Email"
                        aria-required="true"
                      />
                    </div>
                  </div>
                </div>
               <div className="row">
               <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="form_phone">Phone <small>*</small></label>
                      <input
                        name="form_phone"
                        className="form-control required"
                        type="text"
                        placeholder="Enter Phone"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="form_name">
                        Occupation <small>*</small>
                      </label>
                      <input
                        name="form_occupation"
                        className="form-control required"
                        type="text"
                        placeholder="Enter Occupation"
                        aria-required="true"
                      />
                    </div>
                  </div>
               </div>
               
                <div className="form-group">
                  <label htmlFor="form_name">Donation Ammount <small>*</small></label>
                  <textarea
                    name="form_ammount"
                    className="form-control required"
                    rows={5}
                    placeholder="Enter Donation Ammount"
                    aria-required="true"
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="form_botcheck"
                    className="form-control"
                    type="hidden"
                    defaultValue=""
                  />
                  <button
                    type="submit"
                    className="btn btn-flat btn-theme-colored text-uppercase mt-10 mb-sm-30 border-left-theme-color-2-4px"
                    data-loading-text="Please wait..."
                  >
                    Next
                  </button>
                  <button
                    type="reset"
                    className="btn btn-flat btn-theme-colored text-uppercase mt-10 mb-sm-30 border-left-theme-color-2-4px"
                  >
                    Reset
                  </button>
                </div>
              </form>
              {/* Donation Form Validation*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonationPage;
