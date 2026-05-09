import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { SubtitleSegment } from './entities/subtitle-segment.entity';
import { Vocabulary } from './entities/vocabulary.entity';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(SubtitleSegment)
    private readonly subtitleRepository: Repository<SubtitleSegment>,
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>,
    private readonly storageService: StorageService,
  ) {}

  async create(createVideoDto: CreateVideoDto, user: User, videoFile?: Express.Multer.File, thumbFile?: Express.Multer.File): Promise<Video> {
    const { categoryId, ...videoData } = createVideoDto;
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) throw new NotFoundException('Category not found');

    let videoUrl = videoData.url;
    let thumbUrl = videoData.thumbnail;

    if (videoFile) {
      videoUrl = await this.storageService.uploadFile(videoFile, 'videos');
    }
    if (thumbFile) {
      thumbUrl = await this.storageService.uploadFile(thumbFile, 'thumbnails');
    }

    const video = this.videoRepository.create({
      ...videoData,
      url: videoUrl,
      thumbnail: thumbUrl,
      creator: user,
      category,
    });
    return this.videoRepository.save(video);
  }

  async addSubtitles(videoId: string, segments: { startTime: number; endTime: number; text: string }[]): Promise<void> {
    const video = await this.findOne(videoId);
    const subtitleSegments = segments.map((s) => 
      this.subtitleRepository.create({ ...s, video })
    );
    await this.subtitleRepository.save(subtitleSegments);
  }

  async getWordMeaning(word: string): Promise<Vocabulary | null> {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
    return this.vocabularyRepository.findOne({ where: { word: cleanWord } });
  }

  async findByCategory(categoryName: string): Promise<Video[]> {
    return this.videoRepository.find({
      where: { category: { name: categoryName } },
      relations: ['creator', 'category'],
    });
  }

  async findAll(): Promise<Video[]> {
    return this.videoRepository.find({ relations: ['creator', 'category'] });
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videoRepository.findOne({
      where: { id },
      relations: ['creator', 'category', 'subtitles'],
    });
    if (!video) throw new NotFoundException(`Video with ID ${id} not found`);
    return video;
  }

  async likeVideo(videoId: string, userId: string): Promise<void> {
    const video = await this.findOne(videoId);
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['likedVideos'] });
    if (!user) throw new NotFoundException('User not found');
    const alreadyLiked = user.likedVideos.some(v => v.id === videoId);
    if (alreadyLiked) {
      user.likedVideos = user.likedVideos.filter(v => v.id !== videoId);
      video.likesCount--;
    } else {
      user.likedVideos.push(video);
      video.likesCount++;
    }
    await this.userRepository.save(user);
    await this.videoRepository.save(video);
  }

  async favoriteVideo(videoId: string, userId: string): Promise<void> {
    const video = await this.findOne(videoId);
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['favoriteVideos'] });
    if (!user) throw new NotFoundException('User not found');
    const alreadyFavorited = user.favoriteVideos.some(v => v.id === videoId);
    if (alreadyFavorited) {
      user.favoriteVideos = user.favoriteVideos.filter(v => v.id !== videoId);
      video.favoritesCount--;
    } else {
      user.favoriteVideos.push(video);
      video.favoritesCount++;
    }
    await this.userRepository.save(user);
    await this.videoRepository.save(video);
  }

  async getUserLikedVideos(userId: string): Promise<Video[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['likedVideos', 'likedVideos.creator'] });
    return user?.likedVideos || [];
  }

  async getUserFavoriteVideos(userId: string): Promise<Video[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['favoriteVideos', 'favoriteVideos.creator'] });
    return user?.favoriteVideos || [];
  }

  async markAsLearned(userId: string, wordId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['learnedWords'] });
    const word = await this.vocabularyRepository.findOne({ where: { id: wordId } });
    if (!user || !word) throw new NotFoundException('User or Word not found');
    const alreadyLearned = user.learnedWords.some(w => w.id === wordId);
    if (!alreadyLearned) {
      user.learnedWords.push(word);
      await this.userRepository.save(user);
    }
  }

  async getLearnedWords(userId: string): Promise<Vocabulary[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['learnedWords'] });
    return user?.learnedWords || [];
  }
}
