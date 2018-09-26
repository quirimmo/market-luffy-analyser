import { DEFAULT_SECTORS } from './default-sectors';

describe('default-sectors', () => {
  it('should define the default sectors object', () => {
    expect(DEFAULT_SECTORS).toBeDefined();
    expect(typeof DEFAULT_SECTORS).toEqual('object');
  });

  it('should define the BASIC sector', () => {
    expect(DEFAULT_SECTORS.BASIC).toEqual('Basic Industries');
  });

  it('should define the CAPITAL sector', () => {
    expect(DEFAULT_SECTORS.CAPITAL).toEqual('Capital Goods');
  });

  it('should define the NON_DURABLES sector', () => {
    expect(DEFAULT_SECTORS.NON_DURABLES).toEqual('Consumer Non-Durables');
  });

  it('should define the SERVICES sector', () => {
    expect(DEFAULT_SECTORS.SERVICES).toEqual('Consumer Services');
  });

  it('should define the ENERGY sector', () => {
    expect(DEFAULT_SECTORS.ENERGY).toEqual('Energy');
  });

  it('should define the FINANCE sector', () => {
    expect(DEFAULT_SECTORS.FINANCE).toEqual('Finance');
  });

  it('should define the HEALTH sector', () => {
    expect(DEFAULT_SECTORS.HEALTH).toEqual('Health Care');
  });

  it('should define the MISCELLANEOUS sector', () => {
    expect(DEFAULT_SECTORS.MISCELLANEOUS).toEqual('Miscellaneous');
  });

  it('should define the PUBLIC sector', () => {
    expect(DEFAULT_SECTORS.PUBLIC).toEqual('Public Utilities');
  });

  it('should define the TECHNOLOGY sector', () => {
    expect(DEFAULT_SECTORS.TECHNOLOGY).toEqual('Technology');
  });

  it('should define the TRANSPORTATION sector', () => {
    expect(DEFAULT_SECTORS.TRANSPORTATION).toEqual('Transportation');
  });
});
