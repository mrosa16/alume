import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findStudent(userId: string) {
    const student = await this.prisma.student.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
      },
    });
    if (!student) throw new NotFoundException('Usuário nao encontrado');
    return student;
  }

  async updateStudent(userId: string, data: UpdateStudentDto) {
    console.log('dados recebido', data);
    return await this.prisma.student.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
