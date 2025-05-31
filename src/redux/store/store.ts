import dashboardReducer from '@/redux/services/slicer/dashboard/dashboardSlice';
import  { configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/auth/authApi'
import authSlice from '../services/auth/authSlice'
import { homePageApis } from '../services/Apis/homePageApis/homePageApis'
import { senderPageApi } from '../services/Apis/senderPage/senderPageApi';
import { courierPageApi } from '../services/Apis/courierApi/courierPageApi';
import { vehiclePageApi } from '../services/Apis/vehicleApi/vehiclePageApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [homePageApis.reducerPath]: homePageApis.reducer,
        [senderPageApi.reducerPath]: senderPageApi.reducer,
        [courierPageApi.reducerPath]: courierPageApi.reducer,
        [vehiclePageApi.reducerPath]: vehiclePageApi.reducer,

        
        auth: authSlice.reducer,
        dashboard: dashboardReducer,
    },

    middleware: (GetDefaultMiddleware) => 
        GetDefaultMiddleware().concat(
            homePageApis.middleware,
            authApi.middleware,
            senderPageApi.middleware,
            courierPageApi.middleware,
            vehiclePageApi.middleware
        )
    
})
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;