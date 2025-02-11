import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class DddEvent {
  @PrimaryGeneratedColumn()
  id!: number;
}
