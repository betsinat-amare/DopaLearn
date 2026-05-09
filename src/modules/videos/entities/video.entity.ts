import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { SubtitleSegment } from './subtitle-segment.entity';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  thumbnail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.videos)
  category: Category;

  @ManyToOne(() => User, (user) => user.createdVideos)
  creator: User;

  @ManyToMany(() => User, (user) => user.likedVideos)
  @JoinTable({ name: 'user_likes_videos' })
  likedBy: User[];

  @ManyToMany(() => User, (user) => user.favoriteVideos)
  @JoinTable({ name: 'user_favorites_videos' })
  favoritedBy: User[];

  @OneToMany(() => SubtitleSegment, (segment) => segment.video)
  subtitles: SubtitleSegment[];

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  favoritesCount: number;
}
