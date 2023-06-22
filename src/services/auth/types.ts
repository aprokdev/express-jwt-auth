export interface IAuth {
    signToken: (email: string, expiresIn: string) => Promise<string>;
    verifyToken: (token: string) => Promise<string>;
}
