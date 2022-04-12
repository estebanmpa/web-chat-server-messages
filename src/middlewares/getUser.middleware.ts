import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class GetUserMiddleware implements NestMiddleware {
    constructor(private jwtTokenService: JwtService) { }

    use(req: any, res: any, next: (error?: any) => void) {
        const token = req.headers.authorization;

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const { user } = this.jwtTokenService.verify(token);

            if (!user) {
                throw new UnauthorizedException();
            }

            req["user"] = user;
            next();
        } catch (error) {
            // ERROR jwt expired
            throw new UnauthorizedException();
        }
    }

}