import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports:[
    UsuarioModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports:[JwtModule, AuthService],
})
export class AuthModule {}
