import { UserDTO } from './user';

export interface User {
    email: string;
    password: string;
}

export function toUser(userDTO: UserDTO): User {
    return {
        email: userDTO.email,
        password: userDTO.password,
    };
}
