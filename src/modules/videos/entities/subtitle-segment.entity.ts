import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Video } from './video.entity';

@Entity('subtitle_segments')
export class SubtitleSegment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  startTime: number;

  @Column('float')
  endTime: number;

  @Column('text')
  text: string;

  @ManyToOne(() => Video, (video) => video.subtitles, { onDelete: 'CASCADE' })
  video: Video;
}
