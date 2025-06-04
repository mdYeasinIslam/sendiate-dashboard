export interface UserType {
    id: string;
    email: string;
    fullName: string;
    role: string;
    profileImage:string
}

export interface NotificationPayload {
    userIds: string[];
    title: string;
    body: string;
}

export interface NotificationResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: Record<string, unknown>;
    stats: Record<string, unknown>;
}
