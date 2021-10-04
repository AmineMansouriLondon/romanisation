import { TestBed } from '@angular/core/testing';

import { ConverterService } from './converter.service';

describe('ConverterService', () => {
  let service: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('roman conversion object list should be filled', () => {
    expect(service.roman).toBeDefined();
  });

  it('number conversion object list should be filled', () => {
    expect(service.numerics).toBeDefined();
  });

  it('number should be passed into service and return roman numeral'), () => {
    expect(service.convertToNumber('I')).toEqual(1)
  }

  it('roman numeral should be passed into service and return number'), () => {
    expect(service.convertToRoman(1)).toEqual('I' || 'i')
  }
});
