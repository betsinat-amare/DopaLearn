import { IsNotEmpty, IsString, IsOptional, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({ example: 'How to learn NestJS' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A comprehensive guide to NestJS', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/video.mp4' })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'https://example.com/thumb.png', required: false })
  @IsUrl()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
