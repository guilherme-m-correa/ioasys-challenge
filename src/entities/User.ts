import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import Base from './Base';
import Rating from './Rating';
import Role from './Role';

@Entity('users')
export default class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings?: Rating[];
}
