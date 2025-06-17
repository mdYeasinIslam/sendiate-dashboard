import dashboardReducer from '@/redux/services/slicer/dashboard/dashboardSlice';
import chatReducer from '@/redux/services/slicer/chat/chatSlice';
import  { configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/auth/authApi'
import authSlice from '../services/auth/authSlice'
import { homePageApis } from '../services/Apis/homePageApis/homePageApis'
import { senderPageApi } from '../services/Apis/senderPage/senderPageApi';
import { courierPageApi } from '../services/Apis/courierApi/courierPageApi';
import { vehiclePageApi } from '../services/Apis/vehicleApi/vehiclePageApi';
import { feedbackPageApi } from '../services/Apis/feedbackPageAPis/feedbackPageApi';
import { transactionApi } from '../services/Apis/transactionApi/transactionApi';
import { notificationApi } from '../services/Apis/notification/notificationApi';
import { profileApi } from '../services/Apis/profileApi/profileApi';
import chatSlice from '@/redux/services/slicer/chat/chatSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [homePageApis.reducerPath]: homePageApis.reducer,
        [senderPageApi.reducerPath]: senderPageApi.reducer,
        [courierPageApi.reducerPath]: courierPageApi.reducer,
        [vehiclePageApi.reducerPath]: vehiclePageApi.reducer,
        [feedbackPageApi.reducerPath]: feedbackPageApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        [notificationApi?.reducerPath]:notificationApi.reducer,
        [profileApi?.reducerPath]:profileApi.reducer,

        
        auth: authSlice.reducer,
        dashboard: dashboardReducer,
        chat : chatSlice.reducer

    },

    middleware: (GetDefaultMiddleware) => 
        GetDefaultMiddleware().concat(
            homePageApis.middleware,
            authApi.middleware,
            senderPageApi.middleware,
            courierPageApi.middleware,
            vehiclePageApi.middleware,
            feedbackPageApi.middleware,
            transactionApi.middleware,
            notificationApi.middleware,
            profileApi.middleware

        )
    
})
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;