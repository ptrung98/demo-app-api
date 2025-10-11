import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.store.createMany({
    data: [
      {
        name: 'Cửa hàng A',
        address: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội',
        description: 'Chuyên bán đồ điện tử',
        latitude: 20.993585,
        longitude: 105.813535,
        total: 100,
        rented: 35,
        status: true,
      },
      {
        name: 'Cửa hàng B',
        address: '45 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
        description: 'Cửa hàng quần áo thời trang cao cấp',
        latitude: 21.025633,
        longitude: 105.848118,
        total: 80,
        rented: 50,
        status: true,
      },
      {
        name: 'Cửa hàng C',
        address: '67 Nguyễn Huệ, Ba Đình, Hà Nội',
        description: 'Cửa hàng sách và văn phòng phẩm',
        latitude: 21.03715,
        longitude: 105.834,
        total: 150,
        rented: 120,
        status: false,
      },
      {
        name: 'Cửa hàng D',
        address: '89 Trần Duy Hưng, Cầu Giấy, Hà Nội',
        description: 'Đại lý thiết bị y tế và dụng cụ chăm sóc sức khỏe',
        latitude: 21.013539,
        longitude: 105.798682,
        total: 60,
        rented: 25,
        status: true,
      },
      {
        name: 'Cửa hàng E',
        address: '32 Cầu Giấy, Đống Đa, Hà Nội',
        description: 'Cửa hàng nội thất gia đình và văn phòng',
        latitude: 21.028774,
        longitude: 105.80344,
        total: 90,
        rented: 60,
        status: true,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
