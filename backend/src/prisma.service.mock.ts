import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import PrismaService from './prisma.service';

jest.mock('./prisma.service', () => ({
  __esModule: true,
  default: mockDeep<PrismaService>(),
}));

export const PrismaMockService =
  PrismaService as unknown as DeepMockProxy<PrismaService>;
