export interface SettingValue {
    id: number;
    app_setting_key_id: number;
    title: string;
    value: string;
    is_default: boolean;
    status: string; // Added to match the query
    type: string;
}