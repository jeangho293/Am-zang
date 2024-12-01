import { Inject, Service } from 'typedi';
import { DddService, EventHandler, Transactional } from '@libs/ddd';
import { RoleRepository } from '../infrastructure/repository';
import { CreatedUserEvent } from '../../user/domain/events';
import { Role } from '../domain/model';

@Service()
export class RoleService extends DddService {
  constructor(@Inject() private roleRepository: RoleRepository) {
    super();
  }

  @Transactional()
  @EventHandler(CreatedUserEvent)
  async createdUserEvent(event: CreatedUserEvent) {
    const { userId, role: type } = event;

    const role = new Role({ userId, role: type });

    await this.roleRepository.save([role]);
  }
}
