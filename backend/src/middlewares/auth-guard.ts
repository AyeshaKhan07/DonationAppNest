import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { JWT_KEY, PUBLIC_ROUTE_KEY } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const publicRoute = this.reflector.getAllAndOverride<boolean>(PUBLIC_ROUTE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (publicRoute) {
            // 💡 See this condition
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const decodedToken = await this.jwtService.verifyAsync(token, {
                secret: JWT_KEY,
            });

            console.log(decodedToken)
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = decodedToken;
        } 
        catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.cookie?.split('=') ?? [];
        return type === 'Authentication' ? token : undefined;
    }
}