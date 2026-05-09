import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { Video } from './entities/video.entity';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { SubtitleSegment } from './entities/subtitle-segment.entity';
import { Vocabulary } from './entities/vocabulary.entity';
import { UsersModule } from '../users/users.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, User, Category, SubtitleSegment, Vocabulary]),
    UsersModule,
    StorageModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
