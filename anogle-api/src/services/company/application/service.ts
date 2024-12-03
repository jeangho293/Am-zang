import { Inject, Service } from 'typedi';
import { DddService, EventHandler, Transactional } from '@libs/ddd';
import { CompanyRepository } from '../infrastructure/repository';
import type { Role } from '../../role/domain/model';
import { CreatableCompanySpec, FilteredCompanySpec } from '../domain/specs';
import { CreatedGymEvent } from '../../gym/domain/events';
import { GymRepository } from '../../gym/infrastructure/repository';

@Service()
export class CompanyService extends DddService {
  constructor(
    @Inject() private companyRepository: CompanyRepository,
    @Inject() private gymRepository: GymRepository
  ) {
    super();
  }

  @Transactional()
  async list() {
    return this.companyRepository.satisfyElementFrom(new FilteredCompanySpec({}, {}));
  }

  @Transactional()
  async create(
    { role }: { role: Role },
    {
      name,
      email,
      address,
      phoneNumber,
    }: {
      name: string;
      email: string;
      address: string;
      phoneNumber: string;
    }
  ) {
    const [company] = await this.companyRepository.satisfyElementFrom(
      new CreatableCompanySpec({ role }, { name, email, address, phoneNumber })
    );

    await this.companyRepository.save([company]);
  }

  @Transactional()
  @EventHandler(CreatedGymEvent)
  async createdGymEvent(event: CreatedGymEvent) {
    const { gymId, companyId } = event;

    const [[gym], [company]] = await Promise.all([
      this.gymRepository.find({ id: gymId }),
      this.companyRepository.satisfyElementFrom(new FilteredCompanySpec({}, { id: companyId })),
    ]);

    company.addGym(gym);

    await this.companyRepository.save([company]);
  }
}
