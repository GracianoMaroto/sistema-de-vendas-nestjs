/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendasService {
  constructor(private prismaService: PrismaService) {}

  create(createVendaDto: CreateVendaDto, vendedorId: string) {
    return this.prismaService.venda.create({
      data: {
        ...createVendaDto,
        vendedor: {
          connect: {
            id: vendedorId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.venda.findMany();
  }

  findOne(id: string) {
    return this.prismaService.venda.findUnique({
      where: { id },
    });
  }

  update(id: string, updateVendaDto: UpdateVendaDto) {
    return this.prismaService.venda.update({
      where: { id },
      data: updateVendaDto,
    });
  }

  remove(id: string) {
    return this.prismaService.venda.delete({
      where: { id },
    });
  }
}
