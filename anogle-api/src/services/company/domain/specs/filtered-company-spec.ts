import type { Role } from '../../../role/domain/model';
import type { CompanyRepository } from '../../infrastructure/repository';
import type { Company } from '../model';
import { CompanySpec } from './company-spec';

export class FilteredCompanySpec extends CompanySpec {
  private id?: number;

  private name?: string;

  private email?: string;

  private address?: string;

  private phoneNumber?: string;

  constructor(
    { role }: { role?: Role },
    {
      id,
      name,
      email,
      address,
      phoneNumber,
    }: {
      id?: number;
      name?: string;
      email?: string;
      address?: string;
      phoneNumber?: string;
    }
  ) {
    super(role);
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }

  async satisfyElementFrom(companyRepository: CompanyRepository): Promise<Company[]> {
    return companyRepository.find({
      id: this.id,
      name: this.name,
      email: this.email,
      address: this.address,
      phoneNumber: this.phoneNumber,
    });
  }

  async satisfyCountFrom(companyRepository: CompanyRepository): Promise<number> {
    return companyRepository.count({
      id: this.id,
      name: this.name,
      email: this.email,
      address: this.address,
      phoneNumber: this.phoneNumber,
    });
  }
}
