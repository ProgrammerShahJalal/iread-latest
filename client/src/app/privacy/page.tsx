export const dynamic = "force-dynamic";
import React from 'react';
import { getSettingValue } from '../../api/settingValuesApi';

// staticPrivacy as fallback

const staticPrivacy = <>
<p className="mb-4">
                Welcome to our Privacy Policy page. Your privacy is critically important to us, and we are committed to protecting the information you share with us.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">
                We may collect personal information such as your name, email address, and payment details when you use our services. This information is used solely for providing and improving our services.
            </p>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">
                Your information is used to process transactions, provide customer support, and communicate updates or promotional offers. We do not share your data with third parties without your explicit consent.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-4">
                <strong>1. What We Collect? : </strong>
                You have the right to access, update, or delete your personal information at any time. Please contact us if you have any concerns or requests related to your data.
            </p>

            <p className="mt-6">
                <strong>2. Data Retention : </strong>
                We retain your personal data only for as long as necessary to fulfill
                the purposes outlined in this policy.
            </p>
            <p className="mt-6">
                <strong>3. Data Security : </strong>
                While we employ commercially reasonable methods to protect your personal
                information, please note that no online transmission or storage system
                is entirely secure. We continuously strive to maintain robust data
                protection measures.
            </p>
            <p className="mt-6">
                <strong> 4. Your Rights : </strong>
                You have the right to access, update, or request the deletion of your
                personal data at any time.
            </p>
            <p className="mt-6">
                <strong> 5. Changes to This Privacy Policy : </strong>
                This Privacy Policy may be updated periodically. We will notify you of
                any significant changes by posting the revised policy on this page.
            </p>
            <p className="mt-6">
                <strong> 6. Contact Information : </strong>
                For any questions or concerns regarding this Privacy Policy, please
                contact us at: onlineexambatch.info@gmail.com
            </p>
            <h2 className="text-2xl font-semibold my-4">Contact Us</h2>
            <p className="mb-4">
                If you have any questions about this Privacy Policy, feel free to contact us at <a href="mailto:support@example.com" className="text-blue-600 underline">iread.hello@gmail.com</a>.
            </p>
            <p className="text-sm text-gray-500">
                Last updated: May 12, 2025
            </p>
</>

async function PrivacyPolicyPage() {

    const policy = await getSettingValue('Privacy Policy');
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>

        {
            policy?.value ? (
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: policy?.value || '' }}
                />
            ) : (
                staticPrivacy
            )
        }
        </div>
    );
}

export default PrivacyPolicyPage;
