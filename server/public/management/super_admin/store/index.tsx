import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';
import contact_management from '../views/pages/contact_management/config/store';

const store = configureStore({
    reducer: {
        common_store: commonStore.reducer,
        users: users.reducer,
        contact_messages: contact_management.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
