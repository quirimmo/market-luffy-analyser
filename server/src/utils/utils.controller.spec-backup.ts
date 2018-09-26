// import * as httpMocks from 'node-mocks-http';

// const mockGetDailyPricesBySymbols = jest.fn();
// const mockGetCryptoDailyPricesBySymbols = jest.fn();

// jest.mock('./../entities/AlphaVantageProxy', () =>
//   jest.fn().mockImplementation(() => ({
//     getDailyPricesBySymbols: mockGetDailyPricesBySymbols,
//     getCryptoDailyPricesBySymbols: mockGetCryptoDailyPricesBySymbols
//   }))
// );

// import { getRequestParameters, getPrices, sendSuccessfulResponse, getCryptos } from './utils.controller';

// describe('utils.controller', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should define the exposed functions', () => {
//     expect(typeof getRequestParameters).toEqual('function');
//     expect(typeof getPrices).toEqual('function');
//     expect(typeof getCryptos).toEqual('function');
//     expect(typeof sendSuccessfulResponse).toEqual('function');
//   });

//   describe('getPrices', () => {
//     it('should call the alpha vantage proxy getDailyPricesBySymbols method with the right parameters', () => {
//       getPrices(['FB', 'GOOG'], 'compact');
//       expect(mockGetDailyPricesBySymbols).toHaveBeenCalledWith(['FB', 'GOOG'], 'compact');
//     });
//   });

//   describe('getCryptos', () => {
//     it('should call the alpha vantage proxy getCryptoDailyPricesBySymbols method with the right parameters', () => {
//       getCryptos(['ETH', 'BTC']);
//       expect(mockGetCryptoDailyPricesBySymbols).toHaveBeenCalledWith(['ETH', 'BTC']);
//     });
//   });

//   describe('getRequestParameters', () => {
//     const request = httpMocks.createRequest({
//       method: 'GET',
//       url: 'url',
//       params: {
//         isPercentage: true,
//         size: 'compact',
//         symbols: 'FB,GOOG'
//       }
//     });

//     it('should return the composed object', () => {
//       expect(getRequestParameters(request)).toEqual({
//         isPercentage: true,
//         size: 'compact',
//         symbols: ['FB', 'GOOG']
//       });
//     });
//   });

//   describe('sendSuccessfulResponse', () => {
//     const response = httpMocks.createResponse({});

//     it('should call twice the header method of the response with the right parameters', () => {
//       spyOn(response, 'header');
//       sendSuccessfulResponse(response, 'data');
//       expect(response.header).toHaveBeenCalledTimes(2);
//       expect(response.header).toHaveBeenNthCalledWith(1, 'Access-Control-Allow-Origin', '*');
//       expect(response.header).toHaveBeenNthCalledWith(2, 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     });

//     it('should call the status method of the response with the right parameter', () => {
//       spyOn(response, 'status').and.returnValue(response);
//       sendSuccessfulResponse(response, 'data');
//       expect(response.status).toHaveBeenCalledWith(200);
//     });

//     it('should call the send method of the response with the right parameter', () => {
//       spyOn(response, 'send');
//       sendSuccessfulResponse(response, 'data');
//       expect(response.send).toHaveBeenCalledWith('data');
//     });
//   });
// });
