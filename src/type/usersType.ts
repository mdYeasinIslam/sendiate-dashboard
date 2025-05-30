export type UserType = 
    {
        id:number;
        name:string;
        email:string;
        phone:string;
        status:string;
        avatar: string;
        courierName?:string
    }
export type SenderType = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        parcelsSent: number;
    };
    stats?: {
        averageRatingReceived: number;
        ratingsGiven: number;
        ratingsReceived: number;
        totalAmountPaid: number;
        totalRequests: number;
    };
}