export const dynamic = "force-dynamic";
import React from 'react';
import { getSettingValue } from '../../api/settingValuesApi';

async function PrivacyPolicyPage() {

    const policy = await getSettingValue('Privacy Policy');
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>

            <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: policy?.value || '' }}
                />
        </div>
    );
}

export default PrivacyPolicyPage;
