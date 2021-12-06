import { Column, Entity } from 'typeorm';
import Base from './Base';

@Entity('directors')
export default class Director extends Base {
  @Column()
  name: string;
}
