import Role from '@entities/Role';

export default interface IRolesRepository {
  findByName(name: string): Promise<Role | undefined>;
}
