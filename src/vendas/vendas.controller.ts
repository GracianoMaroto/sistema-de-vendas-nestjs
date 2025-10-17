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
import { VendasService } from './vendas.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import Request from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { RequiredRoles } from '../auth/required-roles.decorator';
import { Roles } from '@prisma/client';
import { RoleGuard } from '../auth/role/role.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE, Roles.VENDEDOR)
  @Post()
  create(@Body() createVendaDto: CreateVendaDto, @Req() req: Request) {
    return this.vendasService.create(createVendaDto, req['user'].id);
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE, Roles.VENDEDOR)
  @Get()
  findAll() {
    return this.vendasService.findAll();
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE, Roles.VENDEDOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendasService.findOne(id);
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendasService.update(id, updateVendaDto);
  }

  @RequiredRoles(Roles.ADMIN, Roles.GERENTE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendasService.remove(id);
  }
}
