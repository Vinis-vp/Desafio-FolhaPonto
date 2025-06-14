import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import constansts from './constants';

export const jwtConfig: JwtModuleAsyncOptions = {
    useFactory: () => {
        return {
            secret: constansts().secretJwt,
            signOptions: { expiresIn: '1d'},
        }
    },
}