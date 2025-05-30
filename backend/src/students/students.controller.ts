import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/update-student.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

@UseGuards(JwtAuthGuard)
@Controller('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getMe(@Request() req: AuthenticatedRequest) {
    return this.studentsService.findStudent(req.user.userId);
  }

  @Put()
  updateMe(
    @Request() req: AuthenticatedRequest,
    @Body() data: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudent(req.user.userId, data);
  }
}
