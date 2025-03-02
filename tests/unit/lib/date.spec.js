import moment from 'moment';

import { formatDate, DATE_FORMAT } from '@/assets/js/lib/date';

describe('formatDate', () => {
  it('should format a valid date correctly', () => {
    const date = '2025-03-01T12:00:00Z';
    const expected = moment(date).format(DATE_FORMAT);
    expect(formatDate(date)).toBe(expected);
  });

  it('should return an empty string if date is null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('should return an empty string if date is undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('should return an empty string if date is an empty string', () => {
    expect(formatDate('')).toBe('');
  });

  it('should handle invalid date formats', () => {
    const invalidDate = 'invalid-date';
    expect(formatDate(invalidDate)).toBe('');
  });
});
