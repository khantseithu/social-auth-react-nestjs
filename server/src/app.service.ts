import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async login({ email, name, image }): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          name,
          image,
        },
      });
      return newUser;
    }

    return user;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
