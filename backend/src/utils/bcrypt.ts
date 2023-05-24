import * as bcrypt from 'bcrypt';
import { PASSWORD_ENCRYPTION_SALT_ROUNDS } from 'src/constants';


export async function encryptTohashPassword(password: string) {
    /* 
        When we use bcrypt, we define salt rounds. It boils down to being a cost factor and 
        controls the time needed to receive a result. Increasing it by one doubles the time. 
        The bigger the cost factor, the more difficult it is to reverse the hash with brute-forcing. 
        Generally speaking, 10 salt rounds should be fine.

        The salt used for hashing is a part of the result, so no need to keep it separately.
    */

    return await bcrypt.hash(password, PASSWORD_ENCRYPTION_SALT_ROUNDS);
}

export async function matchPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}