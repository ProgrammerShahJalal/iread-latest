import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';
import contact_management from '../views/pages/contact_management/config/store';

import blog_category from '../views/pages/blog_category/config/store';
import blog_tags from '../views/pages/blog_tags/config/store';
import blogs from '../views/pages/blogs/config/store';

import event_category from '../views/pages/event_category/config/store';
import event_tags from '../views/pages/event_tags/config/store';
import events from '../views/pages/events/config/store';
import event_certified_users from '../views/pages/event_certified_users/config/store';
import event_resources from '../views/pages/event_resources/config/store';
import event_faqs from '../views/pages/event_faqs/config/store';
import event_sessions from '../views/pages/event_sessions/config/store';
import event_sessions_assesments from '../views/pages/event_sessions_assesments/config/store';

const store = configureStore({
    reducer: {
        common_store: commonStore.reducer,
        users: users.reducer,
        contact_messages: contact_management.reducer,
        blog_category: blog_category.reducer,
        blog_tags: blog_tags.reducer,
        blogs: blogs.reducer,
        event_category: event_category.reducer,
        event_tags: event_tags.reducer,
        events: events.reducer,
        event_certified_users: event_certified_users.reducer,
        event_resources: event_resources.reducer,
        event_faqs: event_faqs.reducer,
        event_sessions: event_sessions.reducer,
        event_sessions_assesments: event_sessions_assesments.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
