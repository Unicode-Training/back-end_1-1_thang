export type DeviceData = {
    userId: number;
    ipAddress: string;
    userAgent: string;
    jti: string;
    activedAt?: Date;
    inactivedAt?: Date;
}