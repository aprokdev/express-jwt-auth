import { HTTPError, HTTPError404, HTTPError406, HTTPError422 } from '@errors/index';
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
                method: 'post',
                middlewares: [new AuthGuard()],
            },
        ]);
    }

    private _errorHandler(error: HTTPError, res: Response): void {
        this._logger.error(error.message);
        res.status(error?.status || 500).json({ success: false, message: error.message });
    }

    public async refresh({ cookies }: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (cookies?.rt) {
                const refreshToken = cookies.rt;

                const email = await this._auth.verifyToken(refreshToken);
                console.log(email);

                const access_token = await this._auth.signToken(email, '10m');
                res.status(200).json({ access_token });
            } else {
                throw new HTTPError406('Unauthorized');
            }
        } catch (error: any) {
            this._errorHandler(error, res);
        }
    }
}
