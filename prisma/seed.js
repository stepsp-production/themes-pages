const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const pass = await bcrypt.hash('password123', 10);

  const power = await prisma.user.upsert({
    where: { email: 'power@example.com' },
    update: {},
    create: {
      email: 'power@example.com',
      username: 'power',
      firstName: 'Power', lastName: 'Admin',
      password: pass,
      role: 'POWER_ADMIN',
    }
  });

  const owner = await prisma.user.upsert({
    where: { email: 'owner1@example.com' },
    update: {},
    create: {
      email: 'owner1@example.com',
      username: 'owner1',
      firstName: 'Owner', lastName: 'One',
      password: pass,
      role: 'OWNER',
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin1@example.com' },
    update: {},
    create: {
      email: 'admin1@example.com',
      username: 'admin1',
      firstName: 'Admin', lastName: 'One',
      password: pass,
      role: 'ADMIN',
    }
  });

  await prisma.permission.createMany({
    data: [
      { userId: admin.id, name: 'EDIT_CONTENT' },
      { userId: admin.id, name: 'EDIT_TICKER' },
      { userId: admin.id, name: 'ADD_LIVE' },
    ],
    skipDuplicates: true,
  });

  // Default settings
  await prisma.setting.upsert({
    where: { key: 'ticker' },
    update: {},
    create: { key: 'ticker', value: { enabled: false, text: "أهلاً بكم في منصتكم!" } }
  });

  // Default content
  await prisma.content.create({
    data: {
      heroTitle: "عنوان رئيسي تجريبي",
      heroDesc: "هذا نص تجريبي للمحتوى العام – يُدار من قبل مجموعة ADMIN ويحتاج موافقة OWNERS.",
      articles: [{ id: "a1", title: "مقال 1", body: "نص قصير." }],
      videos: [{ id: "v1", title: "فيديو 1", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }],
      ads: [{ id: "ad1", text: "إعلان 300x250" }]
    }
  });

  await prisma.liveStream.create({
    data: { title: "البث الرئيسي", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
  });

  console.log("Seed done. Users: power@example.com / owner1@example.com / admin1@example.com (password123)");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
