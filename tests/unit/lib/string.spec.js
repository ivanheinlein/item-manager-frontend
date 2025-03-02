import { capitalize } from '@/assets/js/lib/string';

describe('capitalize', () => {
  it('should capitalize the first letter of a single word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should return an empty string if input is empty', () => {
    expect(capitalize('')).toBe('');
  });

  it('should capitalize the first letter and keep the rest of the string as is', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });

  it('should return the same string if the first letter is already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should trim strings with spaces', () => {
    expect(capitalize(' hello')).toBe('Hello');
  });

  it('should work with a single character string', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });
});
