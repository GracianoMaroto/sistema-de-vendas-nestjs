import { Injectable } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CaslAbilityService } from '../casl/casl-ability/casl-ability.service';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class VendasService {
  constructor(
    private prismaService: PrismaService,
    private abilityService: CaslAbilityService,
  ) {}

  create(createVendaDto: CreateVendaDto, vendedorId: string) {
    const ability = this.abilityService.ability;
    if (!ability.can('create', 'Venda')) {
      throw new Error('Unauthorized');
    }
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
    const ability = this.abilityService.ability;
    return this.prismaService.venda.findMany({
      where: {
        AND: [accessibleBy(ability, 'read').Venda],
      },
    });
  }

  findOne(id: string) {
    const ability = this.abilityService.ability;
    return this.prismaService.venda.findUnique({
      where: { id, AND: [accessibleBy(ability, 'read').Venda] },
    });
  }

  update(id: string, updateVendaDto: UpdateVendaDto) {
    const ability = this.abilityService.ability;
    if (!ability.can('update', 'Venda')) {
      throw new Error('Unauthorized');
    }
    return this.prismaService.venda.update({
      where: { id },
      data: updateVendaDto,
    });
  }

  remove(id: string) {
    const ability = this.abilityService.ability;
    if (!ability.can('delete', 'Venda')) {
      throw new Error('Unauthorized');
    }
    return this.prismaService.venda.delete({
      where: { id },
    });
  }
}
