import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Video } from '../../videos/entities/video.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // maths, coding, cooking, language

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Video, (video) => video.category)
  videos: Video[];
}
