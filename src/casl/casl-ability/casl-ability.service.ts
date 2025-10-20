import { Injectable, Scope } from '@nestjs/common';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Servico, Venda, User, Roles } from '@prisma/client';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';

export type PermActions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type PermissionResource =
  | Subjects<{ User: User; Servico: Servico; Venda: Venda }>
  | 'all';

export type AppAbility = PureAbility<
  [PermActions, PermissionResource],
  PrismaQuery
>;

export type DefinePermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void;

const rolePermissionsMap: Record<Roles, DefinePermissions> = {
  ADMIN(user, { can }) {
    can('manage', 'all');
  },
  GERENTE(user, { can }) {
    can('create', 'Venda');
    can('create', 'Servico');
    can('read', 'all');
    can('update', 'all');
    can('delete', 'Venda');
    can('delete', 'Servico');
  },
  VENDEDOR(user, { can }) {
    can('create', 'Venda');
    can('create', 'Servico');
    can('read', 'Venda', { vendedorId: user.id });
    can('read', 'Servico', { vendedorId: user.id });
  },
};

@Injectable({ scope: Scope.REQUEST })
export class CaslAbilityService {
  ability: AppAbility;

  createForUser(user: User) {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    rolePermissionsMap[user.role](user, builder);
    this.ability = builder.build();
    return this.ability;
  }
}
