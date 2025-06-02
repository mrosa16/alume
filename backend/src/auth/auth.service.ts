import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const { nome, sobrenome, email, senha } = data;

    const userExists = await this.prisma.student.findUnique({
      where: { email },
    });

    if (userExists) throw new UnauthorizedException('Usuário já cadastrado');

    const hash = await bcrypt.hash(senha, 10);

    const student = await this.prisma.student.create({
      data: {
        nome,
        sobrenome,
        email,
        senha: hash,
      },
    });

    return {
      message: 'Usuário cadastrado com sucesso',
      student: {
        id: student.id,
        nome: student.nome,
        sobrenome: student.sobrenome,
        email: student.email,
      },
    };
  }

  async login(data: LoginDto) {
    const { email, senha } = data;

    const student = await this.prisma.student.findUnique({
      where: { email },
    });

    if (!student) throw new UnauthorizedException('Usuário não encontrado');

    const valid = await bcrypt.compare(senha, student.senha);
    if (!valid) throw new UnauthorizedException('Senha inválida');

    const token = this.jwtService.sign({ sub: student.id });

    return {
      message: 'User Autenticated',
      access_token: token,
      student: {
        id: student.id,
        nome: student.nome,
        sobrenome: student.sobrenome,
        email: student.email,
      },
    };
  }
}
