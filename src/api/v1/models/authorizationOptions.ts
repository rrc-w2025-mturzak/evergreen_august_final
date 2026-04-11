export interface AuthorizationOptions {
    hasRole: Array<"admin" | "manager" | "staff">;
    allowSameUser?: boolean;
}