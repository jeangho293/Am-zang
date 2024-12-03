import { Inject, Service } from 'typedi';
import { DddService, Transactional } from '../../../libs/ddd';
import { GymRepository } from '../infrastructure/repository';
import { CompanyRepository } from '../../company/infrastructure/repository';
import { FilteredCompanySpec } from '../../company/domain/specs';
import { Gym } from '../domain/model';

@Service()
export class GymService extends DddService {
  constructor(
    @Inject() private gymRepository: GymRepository,
    @Inject() private companyRepository: CompanyRepository
  ) {
    super();
  }

  @Transactional()
  async create({
    branchOffice,
    address,
    createdOn,
    companyId,
  }: {
    branchOffice: string;
    address: string;
    createdOn: string;
    companyId: number;
  }) {
    const [company] = await this.companyRepository.satisfyElementFrom(
      new FilteredCompanySpec({}, { id: companyId })
    );

    if (company) {
      const gym = new Gym({ branchOffice, address, createdOn, companyId });
      await this.gymRepository.save([gym]);
    }
  }
}
