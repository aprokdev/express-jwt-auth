import { HTTPError, HTTPError404, HTTPError422 } from '@errors/index';
import { AuthGuard } from '@middlewares/auth-guard';
import { IAuth } from '@services/auth/types';
import { BaseController } from '@services/base-controller';
import { ILogger } from '@services/logger/types';
import TYPES from '@src/inversify.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IAuthController } from './types';

@injectable()
export class AuthController extends BaseController implements IAuthController {
    constructor(
        @inject(TYPES.ILogger) private _logger: ILogger,
        @inject(TYPES.IAuth) private _auth: IAuth,
    ) {
        super(_logger, 'auth');
        this.bindRoutes([
            {
                path: '/refresh',
                func: this.refresh,
                method: 'get',
                middlewares: [new AuthGuard()],
            },
        ]);
    }

    private _errorHandler(error: HTTPError, res: Response): void {
        this._logger.error(error.message);
        res.status(error?.status || 500).json({ success: false, message: error.message });
    }

    public async refresh({ body }: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const isUserValid = await this._users.validateUser(body);
            // if (!isUserValid) {
            //     throw new HTTPError422('Provided credentials are invalid');
            // }
            // const jwt = await this._auth.signToken(body.email);
            // res.status(200).json({ success: true, jwt });
            next();
        } catch (error: any) {
            this._errorHandler(error, res);
        }
    }
}
