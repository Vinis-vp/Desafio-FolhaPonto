import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FuncionarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { JornadaTrabalhoService } from 'src/jornada-trabalho/jornada-trabalho.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor (
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private readonly jornadaTrabalhoService: JornadaTrabalhoService
  ) {}

  async create(data: FuncionarioDto): Promise<Usuario> {
    
    
    const funcionario = data.usuario;
    const jornada = data.jornada;
    const funcExistente = await this.findOne(funcionario.matricula)
    if (funcExistente){
      throw new HttpException('Esse funcionário já existe!', HttpStatus.BAD_REQUEST)
    }

    const salt = await bcrypt.genSalt(10);
    const hashSenha = await bcrypt.hash(funcionario.senha, salt);
    funcionario.senha = hashSenha;

    const user = await this.usuarioRepository.create(funcionario);
    user.salt = salt;
    const userCriado = await this.usuarioRepository.save(user);

    jornada.idUsuario = userCriado.id;
    await this.jornadaTrabalhoService.create(jornada);

    return user;
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find()
  }

  async findMatricula(matricula: string): Promise<Usuario>{
    const user = await this.usuarioRepository.findOneBy({ matricula })
    if(!user){
      throw new Error('Usuario não encontrado');
    }
    return user
  }

  async findOne(matricula: string): Promise<Boolean> {
    const user = await this.usuarioRepository.findOneBy({ matricula })
    if(!user){
      return false
    }
    return true
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
