export const JWT_KEY = process.env.JWT_KEY

export const PUBLIC_ROUTE_KEY = "publicRoute";

export enum MIN_LENGTHS {
    NAME = 2,
    PASSWORD = 8,
    CONTACT = 10
}


export const MIN_VALUES = {
    GOAL_AMOUNT: 1000
}

export const PASSWORD_ENCRYPTION_SALT_ROUNDS = 10