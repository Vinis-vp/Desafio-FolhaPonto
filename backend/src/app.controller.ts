import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Req() req){
    return this.authService.login(req.user);
  }
}
