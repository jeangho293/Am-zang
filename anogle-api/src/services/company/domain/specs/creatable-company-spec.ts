import { notImplemented, badRequest } from '@hapi/boom';
import { CompanyRepository } from '../../infrastructure/repository';
import { Company } from '../model';
import { CompanySpec } from './company-spec';
import { Role } from '../../../role/domain/model';

export class CreatableCompanySpec extends CompanySpec {
  private name!: string;

  private email!: string;

  private address!: string;

  private phoneNumber!: string;

  constructor(
    { role }: { role: Role },
    {
      name,
      email,
      address,
      phoneNumber,
    }: { name: string; email: string; address: string; phoneNumber: string }
  ) {
    super(role);
    this.name = name;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  async satisfyElementFrom(companyRepository: CompanyRepository): Promise<Company[]> {
    this.isAdmin();
    const [company] = await companyRepository.find({ name: this.name });

    if (company) {
      throw badRequest(`${this.name} is already existed.`, {
        message: `${this.name} is already existed.`,
      });
    }

    return [
      new Company({
        name: this.name,
        email: this.email,
        address: this.address,
        phoneNumber: this.phoneNumber,
      }),
    ];
  }

  async satisfyCountFrom(companyRepository: CompanyRepository): Promise<number> {
    throw notImplemented(`${this.satisfyCountFrom.name} is not implemented.`);
  }
}
