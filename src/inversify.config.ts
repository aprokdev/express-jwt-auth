import { AuthMiddleware } from '@middlewares/auth-middleware';
import { ErrorFilter } from '@middlewares/error-filter';
import { IErrorFilter } from '@middlewares/error-filter/types';
import { IMIddleware } from '@middlewares/types';
import { Auth } from '@services/auth';
import { AuthController } from '@services/auth-controller';
import { IAuthController } from '@services/auth-controller/types';
import { IAuth } from '@services/auth/types';
import { Database } from '@services/database';
import { IDatabase } from '@services/database/types';
import { ENVConfig } from '@services/env-config';
import { IENVConfig } from '@services/env-config/types';
import { LoggerService } from '@services/logger';
import { ILogger } from '@services/logger/types';
import { Users } from '@services/users';
import { UsersController } from '@services/users-controller';
import { IUsersController } from '@services/users-controller/types';
import { IUsers } from '@services/users/types';
import { Container } from 'inversify';
import { App } from './app';
import TYPES from './inversify.types';
import { IApp } from './types';

const InversifyContainer = new Container({ defaultScope: 'Singleton' });

InversifyContainer.bind<IApp>(TYPES.IApp).to(App);
InversifyContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
InversifyContainer.bind<IErrorFilter>(TYPES.IErrorFilter).to(ErrorFilter);
InversifyContainer.bind<IDatabase>(TYPES.IDatabase).to(Database);
InversifyContainer.bind<IENVConfig>(TYPES.IENVConfig).to(ENVConfig);
InversifyContainer.bind<IAuth>(TYPES.IAuth).to(Auth);
InversifyContainer.bind<IAuthController>(TYPES.IAuthController).to(AuthController);
InversifyContainer.bind<IMIddleware>(TYPES.IAuthMiddleware).to(AuthMiddleware);
InversifyContainer.bind<IUsers>(TYPES.IUsers).to(Users);
InversifyContainer.bind<IUsersController>(TYPES.IUsersController).to(UsersController);

export default InversifyContainer;
