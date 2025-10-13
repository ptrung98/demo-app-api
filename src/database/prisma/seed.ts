import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('🧹 Clearing all tables...');

  // Tắt kiểm tra khóa ngoại để tránh lỗi quan hệ
  await prisma.$executeRawUnsafe(`SET session_replication_role = 'replica';`);

  // Xóa dữ liệu trong tất cả các bảng
  const tablenames = await prisma.$queryRaw<
    { tablename: string }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname='public';`;

  for (const { tablename } of tablenames) {
    // Bỏ qua bảng `_prisma_migrations` (để tránh lỗi Prisma)
    if (tablename !== '_prisma_migrations') {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`,
      );
      console.log(`✅ Cleared table: ${tablename}`);
    }
  }

  // Bật lại kiểm tra khóa ngoại
  await prisma.$executeRawUnsafe(`SET session_replication_role = 'origin';`);

  console.log('✅ Database cleared successfully!');
}

async function SeedData() {
  console.log('🌱 Seeding new data...');

  // await prisma.store.createMany({
  //   data: [
  //     {
  //       image: '',
  //       name: 'Cửa hàng A',
  //       address: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
  //       description: 'Chuyên bán đồ điện tử',
  //       latitude: 20.993585,
  //       longitude: 105.813535,
  //       total: 20,
  //       rented: 5,
  //       status: true,
  //     },
  //     {
  //       image: '',
  //       name: 'Cửa hàng B',
  //       address: '45 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
  //       description: 'Cửa hàng quần áo thời trang cao cấp',
  //       latitude: 21.025633,
  //       longitude: 105.848118,
  //       total: 15,
  //       rented: 10,
  //       status: true,
  //     },
  //     {
  //       image: '',
  //       name: 'Cửa hàng C',
  //       address: '67 Nguyễn Huệ, Ba Đình, Hà Nội',
  //       description: 'Cửa hàng sách và văn phòng phẩm',
  //       latitude: 21.03715,
  //       longitude: 105.834,
  //       total: 10,
  //       rented: 2,
  //       status: false,
  //     },
  //     {
  //       image: '',
  //       name: 'Cửa hàng D',
  //       address: '89 Trần Duy Hưng, Cầu Giấy, Hà Nội',
  //       description: 'Đại lý thiết bị y tế và dụng cụ chăm sóc sức khỏe',
  //       latitude: 21.013539,
  //       longitude: 105.798682,
  //       total: 12,
  //       rented: 6,
  //       status: true,
  //     },
  //     {
  //       image: '',
  //       name: 'Cửa hàng E',
  //       address: '32 Cầu Giấy, Đống Đa, Hà Nội',
  //       description: 'Cửa hàng nội thất gia đình và văn phòng',
  //       latitude: 21.028774,
  //       longitude: 105.80344,
  //       total: 10,
  //       rented: 0,
  //       status: true,
  //     },
  //   ],
  // });

  await prisma.policy.create({
    data: {
      title: 'Chính sách bảo hành cao cấp (Premium)',
      content: 'Bảo hành 24 tháng, bao gồm 1 lần sửa chữa miễn phí cho các hư hỏng ngoài ý muốn trong vòng 6 tháng đầu.',
      fee: 10000,
    },
  })
  console.log('✅ Seeded new stores successfully!');
}

async function main() {
  // await clearDatabase();
  await SeedData();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
