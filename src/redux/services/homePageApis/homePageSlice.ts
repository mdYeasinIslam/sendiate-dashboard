// // redux/services/dashboard/dashboardSlice.ts
// import { PerformanceType } from '@/type/dashChartType';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface DashboardState {
//   performanceData: PerformanceType[];
// }

// const initialState: DashboardState = {
//   performanceData: [],
// };

// const dashboardSlice = createSlice({
//   name: 'dashboard',
//   initialState,
//   reducers: {
//     setPerformanceData: (state, action: PayloadAction<PerformanceType[]>) => {
//       state.performanceData = action.payload;
//     },
//   },
// });

// export const { setPerformanceData } = dashboardSlice.actions;
// export default dashboardSlice.reducer;
