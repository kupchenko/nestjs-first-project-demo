import {User} from './user.entity';

export enum UserProviders {
    USER = 'USER_REPOSITORY',
}

export const userProviders = [
    {
        provide: UserProviders.USER,
        useClass: User,
    },
];
