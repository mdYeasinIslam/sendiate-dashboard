//useing vehicleType from vehicleTypes.ts
export type VehicleFeeType = {
    id: string;
    name: string;
    description: string;
    // image: string;
    // minBasePrice: number;
    // maxBasePrice: number;
    minPricePerKm: number;
    maxPricePerKm: number;
    fee: number;
    feeType: 'PERCENTAGE' | 'FIXED';
    userId: string;
    createdAt: string;
    updatedAt: string;
    // user: {
    //     id: string;
    //     fullName: string;
    //     email: string;
    //     profileImage: string;
    // };
};