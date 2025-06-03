export type TransactionType = {
    id: string;
    paymentId: string;
    parcelId: string;
    senderId: string;
    receiverId: string;
    amount: number;
    platformFee: number;
    courierFee: number;
    platformFeeType: 'FIXED' | 'PERCENTAGE' | string;
    paymentMethod: 'CASH' | 'CARD' | string;
    paymentStatus: 'COMPLETED' | 'PENDING' | 'FAILED' | string;
    stripePaymentIntentId: string | null;
    stripePlatformFeeTransferId: string | null;
    stripeCourierTransferId: string | null;
    refundId: string | null;
    metadata: any | null;
    isHold: boolean;
    holdReleaseDate: string | null;
    paymentDate: string;
    isPlatformFeeRelease: boolean;
    platformFeeReleaseDate: string | null;
    isCourierFeeRelease: boolean;
    courierFeeReleaseDate: string | null;
    createdAt: string;
    updatedAt: string;
    parcel: {
        id: string;
        orderId: string;
        status: 'CANCELLED' | 'DELIVERED' | 'IN_PROGRESS' | string;
        price: number;
        platformFee: number;
        platformFeeType: 'FIXED' | 'PERCENTAGE' | string;
        sender: {
            id: string;
            fullName: string;
            email: string;
        };
        courier: {
            id: string;
            fullName: string;
            email: string;
        };
    };
};