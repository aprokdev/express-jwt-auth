import { NextFunction, Request, Response, Router } from 'express';

export interface IAuthController {
    router: Router;
    refresh: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
