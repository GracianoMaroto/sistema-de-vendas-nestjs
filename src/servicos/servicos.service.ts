import { Injectable } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CaslAbilityService } from '../casl/casl-ability/casl-ability.service';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class ServicosService {
  constructor(
    private prismaService: PrismaService,
    private abilityService: CaslAbilityService,
  ) {}

  create(createServicoDto: CreateServicoDto, vendedorId: string) {
    const ability = this.abilityService.ability;
    if (!ability.can('create', 'Servico')) {
      throw new Error('Unauthorized');
    }
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
    const ability = this.abilityService.ability;
    return this.prismaService.servico.findMany({
      where: {
        AND: [accessibleBy(ability, 'read').Servico],
      },
    });
  }

  findOne(id: string) {
    const ability = this.abilityService.ability;
    if (!ability.can('read', 'Servico')) {
      throw new Error('Unauthorized');
    }
    return this.prismaService.servico.findUnique({
      where: { id, AND: [accessibleBy(ability, 'read').Servico] },
    });
  }

  update(id: string, updateServicoDto: UpdateServicoDto) {
    const ability = this.abilityService.ability;
    if (!ability.can('update', 'Servico')) {
      throw new Error('Unauthorized');
    }
    return this.prismaService.servico.update({
      where: { id },
      data: updateServicoDto,
    });
  }

  remove(id: string) {
    const ability = this.abilityService.ability;
    if (!ability.can('delete', 'Servico')) {
      throw new Error('Unauthorized');
    }
    return this.prismaService.servico.delete({
      where: { id },
    });
  }
}
