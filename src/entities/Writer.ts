import { Column, Entity } from 'typeorm';
import Base from './Base';

@Entity('writers')
export default class Writer extends Base {
  @Column()
  name: string;
}
