// redux/services/dashboard/dashboardSlice.ts
import { PerformanceType } from '@/type/dashChartType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardStatsResponse {
  totalSender: number;
  totalCourier: number;
  year: number;
  performanceData: PerformanceType[];
}

interface DashboardState {
  stats: DashboardStatsResponse | null;
}

const initialState: DashboardState = {
  stats: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardStats: (state, action: PayloadAction<DashboardStatsResponse>) => {
      state.stats = action.payload;
    },
  },
});

export const { setDashboardStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
