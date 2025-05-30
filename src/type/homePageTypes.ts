export type PerformanceType = {
  date: string;
  sender: number;
  courier: number;
  fees: number;
  total: number;
};
export type DashboardStatsResponse = {
    data?: {
        performanceData?: PerformanceType[];
        totalSender?: number;
        totalCourier?: number;
        year?: number;
    };
  };
