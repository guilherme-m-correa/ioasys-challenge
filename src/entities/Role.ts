import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import Base from './Base';
import User from './User';

@Entity('roles')
export default class Role extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users?: User[];
}
