import { HTTPError422 } from '@errors/index';
import { IDatabase } from '@services/database/types';
import { validatePassword } from '@services/users/user-entity';
import { UserEntity } from '@services/users/user-entity';
import TYPES from '@src/inversify.types';
import { inject, injectable } from 'inversify';
import { UserLoginDTO, UserRegisterDTO, UserUpdateDTO } from './dto';
import { IUser, IUsers } from './types';

@injectable()
export class Users implements IUsers {
    constructor(@inject(TYPES.IDatabase) private _db: IDatabase) {}
    signToken: (email: string) => Promise<string>;

    public async findByEmail(email: string): Promise<IUser | null> {
        return await this._db.instance.user.findUnique({
            where: { email },
        });
    }

    public async validateUser({ email, password }: UserLoginDTO): Promise<boolean> {
        if (!email || !password) {
            throw new HTTPError422('"email" and "password" fields are required');
        }
        const existedUser = await this.findByEmail(email);
        if (!existedUser) {
            throw new HTTPError422('Provided credentials are invalid');
        }
        return validatePassword(password, existedUser.hash, existedUser.salt);
    }

    public async create(body: UserRegisterDTO): Promise<IUser> {
        // check if user already exist:
        const existedUser = await this.findByEmail(body.email);
        if (existedUser) {
            throw new HTTPError422('User with provided email is already exist');
        }
        const newUser = new UserEntity(body);
        return await this._db.instance.user.create({ data: newUser });
    }

    public async updateUser(body: UserUpdateDTO): Promise<IUser> {
        if (body.email === undefined) {
            throw new HTTPError422('email field is required');
        }

        const user = await this.findByEmail(body.email);
        const { email, password, first_name, last_name, image } = body;

        let hashedPasswordData = {};
        if (password) {
            hashedPasswordData = UserEntity.generateHash(password);
        }

        const updatedUserData = {
            ...user,
            email,
            first_name,
            last_name,
            image,
            ...hashedPasswordData,
        };

        return await this._db.instance.user.update({
            where: {
                email: body.email,
            },
            data: updatedUserData,
        });
    }
}
