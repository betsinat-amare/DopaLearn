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

  // 1. Seed Main Categories
  const mainCategories = ['maths', 'coding', 'cooking', 'language'];
  for (const name of mainCategories) {
    let category = await categoryRepo.findOne({ where: { name } });
    if (!category) {
      category = await categoryRepo.save(categoryRepo.create({ name, description: `Videos about ${name}` }));
      console.log(`Main Category ${name} created.`);
    }

    // 2. Seed Sub-categories for Language
    if (name === 'language') {
      const subLanguages = ['Amharic', 'English', 'Afan Oromo', 'Spanish'];
      for (const subName of subLanguages) {
        const subExists = await categoryRepo.findOne({ where: { name: subName } });
        if (!subExists) {
          await categoryRepo.save(categoryRepo.create({ 
            name: subName, 
            description: `Learning ${subName}`,
            parent: category
          }));
          console.log(`Sub-category ${subName} created under Language.`);
        }
      }
    }
  }

  // 3. Seed Initial Vocabulary (Language)
  const initialVocab = [
    { word: 'selam', meaning: 'Peace/Hello', example: 'Selam, endiet neh?', language: 'am' },
    { word: 'hello', meaning: 'A common greeting', example: 'Hello, how are you?', language: 'en' },
    { word: 'coding', meaning: 'The process of assigning a code', example: 'I love coding.', language: 'en' },
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
