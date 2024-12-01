import { unauthorized } from '@hapi/boom';
import type { Role } from '../../../role/domain/model';
import type { CompanyRepository } from '../../infrastructure/repository';
import type { Company } from '../model';

export abstract class CompanySpec {
  private role: Role;

  constructor(role: Role) {
    this.role = role;
  }

  abstract satisfyElementFrom(companyRepository: CompanyRepository): Promise<Company[]>;

  abstract satisfyCountFrom(companyRepository: CompanyRepository): Promise<number>;

  public isAdmin() {
    if (this.role.role !== 'admin') {
      throw unauthorized(`You do not have permission for that service.`);
    }
  }
}
