import { Column, Entity } from 'typeorm';
import Base from './Base';

@Entity('user_tokens')
export default class UserToken extends Base {
  @Column()
  userId: string;

  @Column()
  token: string;
}
