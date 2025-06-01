export type VehicleType = {
    id: string;
    name: string;
    description: string;
    image: string;
    minBasePrice: number;
    maxBasePrice: number;
    minPricePerKm: number;
    maxPricePerKm: number;
    fee: number;
    feeType: 'PERCENTAGE' | 'FIXED';
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        fullName: string;
        email: string;
        profileImage: string;
    };
};



type Review = {
    text: string;
    rating: number;
};

type DeliveryService = {
    name: string;
    avatar: string;
    reviewProvide: Review;
    reviewGet: Review;
};

export type Order = {
    orderNumber: string;
    courierDate: string;
    pickUpAddress: string;
    dropOffAddress: string;
    vehicleType: string;
    amount: number;
    status: string;
    paymentType: string;
    deliveryService: DeliveryService;
};

// export type User = {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     status: string;
//     avatar: string;
//     totalRequest: number;
//     totalAmountPaid: number;
//     reviewGet: number;
//     reviewProvide: number;
//     orders: Order[];
// };
