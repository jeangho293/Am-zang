import { Service } from 'typedi';
import { DddRepository } from '../../../libs/ddd';
import { Company } from '../domain/model';
import type { CompanySpec } from '../domain/specs';

@Service()
export class CompanyRepository extends DddRepository<Company> {
  entityClass = Company;

  async satisfyElementFrom(spec: CompanySpec) {
    return spec.satisfyElementFrom(this);
  }

  async satisfyCountFrom(spec: CompanySpec) {
    return spec.satisfyCountFrom(this);
  }

  async find({
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
  }) {
    return this.entityManager.find(this.entityClass, {
      where: {
        id,
        name,
        email,
        address,
        phoneNumber,
      },
      relations: {
        gyms: true,
      },
    });
  }

  async count({
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
  }) {
    return this.entityManager.count(this.entityClass, {
      where: {
        id,
        name,
        email,
        address,
        phoneNumber,
      },
    });
  }
}
