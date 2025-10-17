import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RequiredRoles } from '../auth/required-roles.decorator';
import { Roles } from '@prisma/client';
import { RoleGuard } from '../auth/role/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RequiredRoles(Roles.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @RequiredRoles(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
