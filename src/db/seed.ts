import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Category } from '../modules/categories/entities/category.entity';
import { Vocabulary } from '../modules/videos/entities/vocabulary.entity';
import { DataSource } from 'typeorm';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const categoryRepo = dataSource.getRepository(Category);
  const vocabularyRepo = dataSource.getRepository(Vocabulary);

  // 1. Seed Categories
  const categories = ['maths', 'coding', 'cooking', 'language'];
  for (const name of categories) {
    const exists = await categoryRepo.findOne({ where: { name } });
    if (!exists) {
      await categoryRepo.save(categoryRepo.create({ name, description: `Videos about ${name}` }));
      console.log(`Category ${name} created.`);
    }
  }

  // 2. Seed Initial Vocabulary (Language)
  const initialVocab = [
    { word: 'hello', meaning: 'A common greeting', example: 'Hello, how are you?', language: 'en' },
    { word: 'world', meaning: 'The planet earth and all life on it', example: 'The world is beautiful.', language: 'en' },
    { word: 'coding', meaning: 'The process of assigning a code to something for classification or identification', example: 'I love coding in NestJS.', language: 'en' },
    { word: 'nest', meaning: 'A structure or place made or chosen by a bird for laying its eggs', example: 'The bird built a nest.', language: 'en' },
  ];

  for (const item of initialVocab) {
    const exists = await vocabularyRepo.findOne({ where: { word: item.word } });
    if (!exists) {
      await vocabularyRepo.save(vocabularyRepo.create(item));
      console.log(`Vocabulary ${item.word} created.`);
    }
  }

  console.log('Seeding completed successfully!');
  await app.close();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
