import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL') || '',
      this.configService.get<string>('SUPABASE_KEY') || '',
    );
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const bucket = this.configService.get<string>('SUPABASE_BUCKET') || 'videos';
    const fileName = `${folder}/${uuidv4()}-${file.originalname}`;

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new Error(`Supabase upload error: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }
}
