import { Column, Entity } from 'typeorm';
import Base from './Base';

@Entity('actors')
export default class Actor extends Base {
  @Column()
  name: string;
}
