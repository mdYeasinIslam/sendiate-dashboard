
export type SenderType = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profileImage:string
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

export type SenderDetailsType = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    profileImage: string | null;
    parcelsSent: Array<
        OrderAndReviewDetails & {
            courier?: {
                id: string;
                fullName: string;
                email: string;
                phoneNumber: string;
                profileImage: string;
            };
        }
    >;
    stats: {
        totalRequests: number;
        totalAmountPaid: number;
        ratingsGiven: number;
        ratingsReceived: number;
        averageRatingReceived: number;
    };
}

// Sender (user) Details
export type SenderInfo = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profileImage: string | null;
} | null;

export type OrderAndReviewDetails = {
    id: string;
    orderId: string;
    deliveryTime: string;
    status: string;
    reqStatus: string;
    pickupInfo: {
        name: string;
        address: string;
        phone: string;
        apartment: string;
    };
    receiverInfo: {
        name: string;
        address: string;
        phone: string;
        apartment: string;
    };
    vehicleType: string;
    price: number;
    paymentMethod: string;
    createdAt: string;
    senderRating: number;
    courierRating: number;
    senderReview: string;
    courierReview: string;
    courier?: SenderInfo;
    sender?: SenderInfo;
};
