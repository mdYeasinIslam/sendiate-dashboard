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
  
  export type FeedbackType = {
    id: string;
    subject: string;
    comments: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
    };
  };
