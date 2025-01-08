import React from 'react'

function page() {
  return (
    <section className="">
      <div className="container">
        <div className="section-content">
          <div className='row'>

            <div className="col-md-7">
              <h4 className="mt-0 mb-30 line-bottom">Be a Hero: Make a Difference with Your Donation Today!</h4>
              {/* Contact Form */}
              <form
                id="contact_form"
                name="contact_form"
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
                      <label htmlFor="form_name">
                        Subject <small>*</small>
                      </label>
                      <input
                        name="form_subject"
                        className="form-control required"
                        type="text"
                        placeholder="Enter Subject"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="form_phone">Phone</label>
                      <input
                        name="form_phone"
                        className="form-control"
                        type="text"
                        placeholder="Enter Phone"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="form_name">Message</label>
                  <textarea
                    name="form_message"
                    className="form-control required"
                    rows={5}
                    placeholder="Enter Message"
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
                    Send your message
                  </button>
                  <button
                    type="reset"
                    className="btn btn-flat btn-theme-colored text-uppercase mt-10 mb-sm-30 border-left-theme-color-2-4px"
                  >
                    Reset
                  </button>
                </div>
              </form>
              {/* Contact Form Validation*/}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default page;
