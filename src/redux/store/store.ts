import  dashboardReducer  from '@/redux/services/dashboard/dashboardSlice';
import  { configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/auth/authApi'
import authSlice from '../services/auth/authSlice'
import { homePageApis } from '../services/homePageApis/homePageApis'

export const store = configureStore({
    reducer: {
        [homePageApis.reducerPath]: homePageApis.reducer,
       
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice.reducer ,
          dashboard: dashboardReducer,
    },

    middleware: (GetDefaultMiddleware) => 
        GetDefaultMiddleware().concat(homePageApis.middleware,authApi.middleware)
    
})
setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;