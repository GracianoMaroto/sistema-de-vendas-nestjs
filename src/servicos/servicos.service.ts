/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicosService {
  constructor(private prismaService: PrismaService) {}

  create(createServicoDto: CreateServicoDto, vendedorId: string) {
    return this.prismaService.servico.create({
      data: {
        ...createServicoDto,
        vendedor: {
          connect: {
            id: vendedorId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.servico.findMany();
  }

  findOne(id: string) {
    return this.prismaService.servico.findUnique({
      where: { id },
    });
  }

  update(id: string, updateServicoDto: UpdateServicoDto) {
    return this.prismaService.servico.update({
      where: { id },
      data: updateServicoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.servico.delete({
      where: { id },
    });
  }
}
