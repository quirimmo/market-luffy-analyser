import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import { Crypto } from './../entities/Crypto';

const crypto1: Crypto = { symbol: 'CRT1', name: 'Crypto1' };
const crypto2: Crypto = { symbol: 'CRT2', name: 'Crypto2' };
const cryptos: Crypto[] = [crypto1, crypto2];

const mockGetAllCryptos = jest.fn(() => cryptos);
const mockSendSuccessfulResponse = jest.fn();

jest.mock('../entities/CryptosProcessor', () => {
  return {
    getAllCryptos: mockGetAllCryptos
  };
});
jest.mock('../utils/response-utils', () => {
  return {
    sendSuccessfulResponse: mockSendSuccessfulResponse
  };
});

import { CryptosController, onGetCryptos } from './cryptos.controller';

describe('CryptosController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(CryptosController).toBeDefined();
  });

  describe('onGetCryptos', () => {
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/cryptos/'
    });
    const response = httpMocks.createResponse({ eventEmitter: EventEmitter });

    it('should call the CryptosProcessor.getAllCryptos method', () => {
      onGetCryptos(request, response);
      expect(mockGetAllCryptos).toHaveBeenCalled();
    });

    it('should send the successful response', () => {
      onGetCryptos(request, response);
      expect(mockSendSuccessfulResponse).toHaveBeenCalledWith(response, cryptos);
    });
  });
});
