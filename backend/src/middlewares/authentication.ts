const jwt = require('jsonwebtoken');
import { HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { JWT_KEY } from 'src/constants';

export default (req: Request, res: Response, next: NextFunction) => {
    const whitelist = ['/login', '/signup'];

    if (whitelist.includes(req.url))
        next();

    else {
        const authHeader = req.get('Authorization')

        if (!authHeader) {
            res.send({
                status: HttpStatus.UNAUTHORIZED,
                message: "No authentication header found."
            });
            return
        }

        let decodedToken = null;

        try {
            const token = authHeader.split(' ')[1];
            decodedToken = jwt.verify(token, JWT_KEY);

            if (!decodedToken) {
                res.send({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: "Unable to decode jwt"
                })
            }
        } catch (error) {
            console.log(error);
            res.send({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error"
            })
        }
    }
}