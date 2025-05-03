import axios from 'axios';
import 'server-only';
import { query } from '../lib/db';
import { SettingValue } from '@/types/setting';

export async function getSettingValue(title: string) {
    try {
        let setting_value_query = `
            SELECT 
                asv.id,
                asv.app_setting_key_id,
                asv.title,
                asv.value,
                asv.is_default,
                asv.status,
                asv.type
            FROM app_setting_values asv
            WHERE asv.title = ?
            AND asv.status = 'active'
            LIMIT 1
        `;

        // Specify that query returns an array of SettingValue
        const appSettingValues: SettingValue[] = await query(setting_value_query, [title]);
        
        // Return the first result or null if no matching record is found
        return appSettingValues.length > 0 ? appSettingValues[0] : null;
    } catch (error) {
        console.error(`Error fetching setting value for title: ${title}`, error);
        return null;
    }
}
