import { getSettingValue } from "../../api/settingValuesApi";

const TermsAndConditions = async() => {

  const terms = await getSettingValue('Terms');
    return (
      <div className="container py-6 sm:py-10">
        <h2 className="text-xl sm:text-3xl mb-2">
          <strong>Terms and Conditions</strong>
        </h2>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: terms?.value || ''}}
        />
      </div>
    );
  };
  
  export default TermsAndConditions;