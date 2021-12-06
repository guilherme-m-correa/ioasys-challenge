import Role from '@entities/Role';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roles: Role[];
}
