import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создаем тестовых пользователей
  const user1 = await prisma.user.upsert({
    where: { email: 'editor@example.com' },
    update: {},
    create: {
      email: 'editor@example.com',
      firstName: 'Александр',
      lastName: 'Иванов',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'editor',
      isActive: true,
      posts: {
        create: [
          {
            slug: 'first-post',
            title: { en: 'First Post', ru: 'Первый пост' },
            excerpt: { en: 'This is the first post', ru: 'Это первый пост' },
            content: { en: 'Content of the first post', ru: 'Содержание первого поста' },
            status: 'published',
            publishedAt: new Date(),
          },
          {
            slug: 'second-post',
            title: { en: 'Second Post', ru: 'Второй пост' },
            excerpt: { en: 'This is the second post', ru: 'Это второй пост' },
            content: { en: 'Content of the second post', ru: 'Содержание второго поста' },
            status: 'published',
            publishedAt: new Date(),
          },
          {
            slug: 'fourth-post',
            title: { en: 'Fourth Post', ru: 'Четвертый пост' },
            excerpt: { en: 'This is the fourth post', ru: 'Это четвертый пост' },
            content: { en: 'Content of the fourth post', ru: 'Содержание четвертого поста' },
            status: 'published',
            publishedAt: new Date(),
          },
          {
            slug: 'fifth-post',
            title: { en: 'Fifth Post', ru: 'Пятый пост' },
            excerpt: { en: 'This is the fifth post', ru: 'Это пятый пост' },
            content: { en: 'Content of the fifth post', ru: 'Содержание пятого поста' },
            status: 'published',
            publishedAt: new Date(),
          },
          {
            slug: 'sixth-post',
            title: { en: 'Sixth Post', ru: 'Шестой пост' },
            excerpt: { en: 'This is the sixth post', ru: 'Это шестой пост' },
            content: { en: 'Content of the sixth post', ru: 'Содержание шестого поста' },
            status: 'published',
            publishedAt: new Date(),
          }
        ]
      }
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      firstName: 'Мария',
      lastName: 'Петрова',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'admin',
      isActive: true,
      posts: {
        create: [
          {
            slug: 'third-post',
            title: { en: 'Third Post', ru: 'Третий пост' },
            excerpt: { en: 'This is the third post', ru: 'Это третий пост' },
            content: { en: 'Content of the third post', ru: 'Содержание третьего поста' },
            status: 'published',
            publishedAt: new Date(),
          },
          {
            slug: 'seventh-post',
            title: { en: 'Seventh Post', ru: 'Седьмой пост' },
            excerpt: { en: 'This is the seventh post', ru: 'Это седьмой пост' },
            content: { en: 'Content of the seventh post', ru: 'Содержание седьмого поста' },
            status: 'published',
            publishedAt: new Date(),
          },
          {
            slug: 'eighth-post',
            title: { en: 'Eighth Post', ru: 'Восьмой пост' },
            excerpt: { en: 'This is the eighth post', ru: 'Это восьмой пост' },
            content: { en: 'Content of the eighth post', ru: 'Содержание восьмого поста' },
            status: 'published',
            publishedAt: new Date(),
          },
          {
            slug: 'ninth-post',
            title: { en: 'Ninth Post', ru: 'Девятый пост' },
            excerpt: { en: 'This is the ninth post', ru: 'Это девятый пост' },
            content: { en: 'Content of the ninth post', ru: 'Содержание девятого поста' },
            status: 'published',
            publishedAt: new Date(),
          },
          {
            slug: 'tenth-post',
            title: { en: 'Tenth Post', ru: 'Десятый пост' },
            excerpt: { en: 'This is the tenth post', ru: 'Это десятый пост' },
            content: { en: 'Content of the tenth post', ru: 'Содержание десятого поста' },
            status: 'published',
            publishedAt: new Date(),
          }
        ]
      }
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'inactive@example.com' },
    update: {},
    create: {
      email: 'inactive@example.com',
      firstName: 'Дмитрий',
      lastName: 'Сидоров',
      avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
      role: 'editor',
      isActive: false,
    },
  });

  console.log('Seed data created:', { user1: user1.email, user2: user2.email, user3: user3.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
