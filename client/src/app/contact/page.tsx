import { getSettingValue } from "../../api/settingValuesApi";
import ContactForm from "./ContactForm";

export const dynamic = 'force-dynamic';

const ContactPage = async () => {
  const greetingTitle = await getSettingValue('Greeting title') || '';
  const contactPhone1 = await getSettingValue('Contact phone1') || '';
  const contactPhone2 = await getSettingValue('Contact phone2') || '';
  const contactPhone3 = await getSettingValue('Contact phone3') || '';
  const contactEmail1 = await getSettingValue('Contact email1') || '';
  const contactEmail2 = await getSettingValue('Contact email2') || '';
  const contactEmail3 = await getSettingValue('Contact email3') || '';
  const address = await getSettingValue('Contact address') || '';

  return (
    <ContactForm
      greetingTitle={greetingTitle}
      contactPhone1={contactPhone1}
      contactPhone2={contactPhone2}
      contactPhone3={contactPhone3}
      contactEmail1={contactEmail1}
      contactEmail2={contactEmail2}
      contactEmail3={contactEmail3}
      address={address}
    />
  );
};


export default ContactPage;