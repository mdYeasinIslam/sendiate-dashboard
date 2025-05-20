export type VehicleType = {
  id: string
  serialNo: string
  image: string
  type: string
  details: string
  notes?: string
}



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

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    avatar: string;
    totalRequest: number;
    totalAmountPaid: number;
    reviewGet: number;
    reviewProvide: number;
    orders: Order[];
};
