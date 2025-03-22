import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { EventHandler, Transactional } from '@libs/decorators';
import { UserCreatedEvent } from '../../users/domain/events';
import { Role } from '../domain/roles.entity';
import { RolesRepository } from '../infrastructure/roles.repository';

@Injectable()
export class RolesService extends DddService {
  constructor(private readonly rolesRepository: RolesRepository) {
    super();
  }

  @Transactional()
  @EventHandler(UserCreatedEvent)
  async onHandleUserCreatedEvent(event: UserCreatedEvent) {
    const { userId, roleType } = event;

    const role = new Role({ userId, roleType });

    await this.rolesRepository.save([role]);
  }
}
