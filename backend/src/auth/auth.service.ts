import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) {}

    async validarCliente(matricula: string, senha: string): Promise<any> {
        const cliente = await this.usuarioService.findMatricula(matricula);
        if (cliente && bcrypt.compareSync(senha, cliente.senha)) {
        const { senha, salt, ...result } = { ...cliente };
        return result;
        }
        return false;
    }

    async login(user: any) {
        const payload = { matricula: user.matricula, id: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
