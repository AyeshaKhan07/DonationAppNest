export const JWT_KEY = process.env.JWT_KEY

export enum MIN_LENGTHS {
    NAME = 2,
    PASSWORD = 8,
    CONTACT = 10
}

export const PASSWORD_ENCRYPTION_SALT_ROUNDS = 10