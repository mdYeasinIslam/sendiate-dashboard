import { OrderAndReviewDetails } from "./SenderPagesType";

export type VehicleInfo = {
    color: string;
    makeYar: string; // Consider renaming to 'makeYear' if it's a typo
    model: string;
    plateNumber: string;
    type: string;
    year: string;
};

// export type CourierUserType = {
//     id: string;
//     fullName: string;
//     email: string;
//     phoneNumber: string;
//     role: "Courier";
//     status: string;
//     createdAt: string;
//     updatedAt: string;
//     vehicleInfo: VehicleInfo;
//     profileImage: string;
//     _count: {
//         parcelsDelivered: number;
//     };
// };


// export type ParcelDelivery = {
//     statusHistory: {
//         status: string;
//         timestamp: string;
//         note: string;
//     }[];
//     pickupInfo: {
//         name: string;
//         address: string;
//         phone: string;
//         apartment: string;
//     };
//     receiverInfo: {
//         name: string;
//         address: string;
//         phone: string;
//         apartment: string;
//     };
//     id: string;
//     orderId: string;
//     senderId: string;
//     courierId: string;
//     status: string;
//     subStatus: string | null;
//     acceptanceTimeout: string;
//     lastAcceptedBy: string | null;
//     acceptanceAttempts: number;
//     expiryDate: string;
//     acceptDate: string;
//     payExpiryDate: string;
//     isPayExpired: boolean;
//     isExpired: boolean;
//     isPayment: boolean;
//     isAccept: boolean;
//     isPlatformFeeRelease: boolean;
//     accepted: boolean;
//     in_progress: boolean;
//     picked_up: boolean;
//     heading_to_picked_up: boolean;
//     on_the_way: boolean;
//     delivered: boolean;
//     cancelled: boolean;
//     pickupLat: number;
//     pickupLng: number;
//     dropoffLat: number;
//     dropoffLng: number;
//     courierLat: number;
//     courierLng: number;
//     distance: number;
//     deliveryDistance: number;
//     platformFee: number;
//     platformFeeType: string;
//     price: number;
//     vehicleType: string;
//     pickupInstruction: string;
//     dropoffInstruction: string;
//     reqStatus: string;
//     paymentStatus: string;
//     paymentMethod: string;
//     deliveryTime: string | null;
//     estimatedTime: string | null;
//     cancelReason: string;
//     cancelledBy: string | null;
//     senderReview: string;
//     senderRating: number;
//     courierReview: string;
//     courierRating: number;
//     parcelImages: unknown[];
//     parcelWeight: number;
//     parcelType: string;
//     parcelDescription: string;
//     createdAt: string;
//     updatedAt: string;
// };

export type SenderInfo = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profileImage: string | null;
} | null;

export type ParcelDelivery = {
    id: string;
    orderId: string;
    deliveryTime: string | null;
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
    sender: SenderInfo;
};

export type CourierUserDetails = {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: "Courier";
    status: string;
    createdAt: string;
    updatedAt: string;
    vehicleInfo: VehicleInfo;
    profileImage: string;
    parcelsDelivered: OrderAndReviewDetails[];
    stats: {
        totalDeliveries: number;
        totalEarnings: number;
        ratingsGiven: number;
        ratingsReceived: number;
        averageRatingReceived: number;
    };
};