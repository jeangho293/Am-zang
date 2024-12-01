import { Inject, Service } from 'typedi';
import { DddService, Transactional } from '@libs/ddd';
import { CompanyRepository } from '../infrastructure/repository';
import type { Role } from '../../role/domain/model';
import { CreatableCompanySpec } from '../domain/specs';

@Service()
export class CompanyService extends DddService {
  constructor(@Inject() private companyRepository: CompanyRepository) {
    super();
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
}
