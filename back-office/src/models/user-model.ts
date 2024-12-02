export type RoleType = 'admin' | 'general';
export type LoginType = 'google' | 'kakao';

export class UserModel {
  id!: string;

  email!: string;

  role!: RoleType;

  type!: LoginType;

  createdAt!: Date;
}
