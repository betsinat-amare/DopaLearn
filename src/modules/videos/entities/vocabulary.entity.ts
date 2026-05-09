import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vocabulary')
export class Vocabulary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  word: string;

  @Column('text')
  meaning: string;

  @Column({ nullable: true })
  example: string;

  @Column({ nullable: true })
  audioUrl: string;

  @Column({ default: 'en' })
  language: string;
}
