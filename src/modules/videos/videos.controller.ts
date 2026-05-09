import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]))
  @ApiOperation({ summary: 'Create a new video (Admin only, supports file upload)' })
  create(
    @Body() createVideoDto: CreateVideoDto, 
    @GetUser() user: User,
    @UploadedFiles() files: { video?: Express.Multer.File[], thumbnail?: Express.Multer.File[] },
  ) {
    const videoFile = files.video?.[0];
    const thumbFile = files.thumbnail?.[0];
    return this.videosService.create(createVideoDto, user, videoFile, thumbFile);
  }

  @Get()
  @ApiOperation({ summary: 'Get all videos or filter by category' })
  @ApiQuery({ name: 'category', required: false, example: 'language' })
  findAll(@Query('category') category?: string) {
    if (category) {
      return this.videosService.findByCategory(category);
    }
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a video by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.videosService.findOne(id);
  }

  @Post(':id/subtitles')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add subtitles to a video (Admin only)' })
  addSubtitles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() segments: { startTime: number; endTime: number; text: string }[],
  ) {
    return this.videosService.addSubtitles(id, segments);
  }

  @Get('dictionary/meaning')
  @ApiOperation({ summary: 'Get meaning of a word' })
  @ApiQuery({ name: 'word', example: 'hello' })
  getMeaning(@Query('word') word: string) {
    return this.videosService.getWordMeaning(word);
  }

  @Post('vocabulary/:id/learn')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark a word as learned' })
  markAsLearned(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
    return this.videosService.markAsLearned(userId, id);
  }

  @Get('user/progress')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user learned vocabulary' })
  getProgress(@GetUser('id') userId: string) {
    return this.videosService.getLearnedWords(userId);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Like/Unlike a video' })
  like(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
    return this.videosService.likeVideo(id, userId);
  }

  @Post(':id/favorite')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Favorite/Unfavorite a video' })
  favorite(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
    return this.videosService.favoriteVideo(id, userId);
  }

  @Get('user/likes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get videos liked by current user' })
  getLiked(@GetUser('id') userId: string) {
    return this.videosService.getUserLikedVideos(userId);
  }

  @Get('user/favorites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get videos favorited by current user' })
  getFavorites(@GetUser('id') userId: string) {
    return this.videosService.getUserFavoriteVideos(userId);
  }
}
