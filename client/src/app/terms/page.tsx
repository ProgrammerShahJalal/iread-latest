import { getSettingValue } from "../../api/settingValuesApi";

// static terms as fallback
const staticTerms = <><p className="mt-8">
  At IREAD, we are dedicated to delivering high-quality educational services
  while maintaining a secure and user-friendly environment. Please review
  our terms and policies regarding course delivery, user responsibilities,
  intellectual property, and prohibited conduct to ensure a smooth and
  positive experience on our platform.
</p><p className="mt-6">
    <strong>1. Delivery Time :</strong>
    Upon purchasing a course, the customer will be registered for all
    specified services within a maximum of 1 business day. After
    registration, the customer can begin participating in the educational
    program as scheduled.
  </p><p className="mt-6">
    <strong> 2. After-Sales Service : </strong>
    If you encounter any technical issues on our website or have concerns
    regarding a course, please contact with us. We are committed to
    providing timely and appropriate solutions to any issues you may face.
  </p><p className="mt-6">
    <strong> 3. User Responsibilities : </strong>
    As an IREAD user, you are responsible for safeguarding your account
    credentials and ensuring they are used correctly. You must also comply
    with all applicable laws and regulations while using our platform.
  </p><p className="mt-6">
    <strong>4. Intellectual Property : </strong>
    All intellectual property rights, including but not limited to
    trademarks, copyrights, and proprietary content, are owned by IREAD. Users
    are prohibited from copying, modifying, or distributing any content
    without prior written consent from IREAD.
  </p><p className="mt-6">
    <strong> 5. Prohibited Conduct : </strong>
    Users must not engage in activities that violate any laws or infringe
    upon the rights of others. This includes, but is not limited to,
    harassment, spamming, unauthorized account access, or any action that
    disrupts the proper functioning of IREAD&apos;s platform.
  </p><p className="mt-6">
    <strong> 6. Disclaimers : </strong>
    IREAD strives to provide accurate and up-to-date information on our
    platform; however, we do not guarantee the completeness or accuracy of
    the content. Use of our products and services is at the user&apos;s own
    risk.
  </p><p className="mt-6">
    In no event will IREAD be liable for any direct, indirect, incidental,
    consequential, or punitive damages resulting from the use or inability
    to use our products and services, even if IREAD has been advised of the
    possibility of such damages.
  </p></>
const TermsAndConditions = async() => {

  const terms = await getSettingValue('Terms');
  console.log('Terms:', terms);
    return (
      <div className="container py-6 sm:py-10">
        <h2 className="text-xl sm:text-3xl mb-2">
          <strong>Terms and Conditions</strong>
        </h2>
      {
        terms?.value? (
          <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: terms?.value || ''}}
        />
        ) :
        (
          staticTerms
        )
      }
      </div>
    );
  };
  
  export default TermsAndConditions;