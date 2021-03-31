import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainService } from './blockchain.service';
import * as randomString from 'crypto-random-string';

describe('BlockchainService', () => {
  let service: BlockchainService;
  let testUsername: string = randomString({length: 10});


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockchainService],
    }).compile();

    service = module.get<BlockchainService>(BlockchainService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('createAddress',()=>{
    it('should have addressLitecoin, addressBitcoin', async ()=>{
      expect(await service.createAddress(testUsername)).toHaveProperty('addressLitecoin');
      expect(await service.createAddress(testUsername)).toHaveProperty('addressBitcoin');
    })
  })

  describe('getAdresses && getPrices', ()=>{
    it('should return array', async ()=>{
      expect(await service.getAdresses(testUsername)).toMatchObject([{},{}]);
      // expect(await service.getPrices()).toMatchObject([{},{}]);
    })
  })

  describe('archieveAddresses',()=>{
    it('should return true', async ()=>{
      expect(await service.archiveAddresses(testUsername)).toBe(true);
    })
  })
});
