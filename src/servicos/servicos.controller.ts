import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import Request from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { RequiredRoles } from '../auth/required-roles.decorator';
import { Roles } from '@prisma/client';
import { RoleGuard } from '../auth/role/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE, Roles.VENDEDOR)
  @Post()
  create(@Body() createServicoDto: CreateServicoDto, @Req() req: Request) {
    return this.servicosService.create(createServicoDto, req['user'].id);
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE, Roles.VENDEDOR)
  @Get()
  findAll() {
    return this.servicosService.findAll();
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE, Roles.VENDEDOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicosService.findOne(id);
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    return this.servicosService.update(id, updateServicoDto);
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicosService.remove(id);
  }
}
