import { getQueryWithoutDefaults } from '@/assets/js/lib/query';

describe('getQueryWithoutDefaults', () => {
  it('should return an empty object if no values are different from defaults', () => {
    const query = {
      name: 'John',
      age: 30,
    };
    const defQuery = {
      name: 'John',
      age: 30,
    };
    const result = getQueryWithoutDefaults(query, defQuery);
    expect(result).toEqual({});
  });

  it('should return the values that differ from the defaults', () => {
    const query = {
      name: 'John',
      age: 25,
      country: 'USA',
    };
    const defQuery = {
      name: 'John',
      age: 30,
      country: 'Canada',
    };
    const result = getQueryWithoutDefaults(query, defQuery);
    expect(result).toEqual({
      age: 25,
      country: 'USA',
    });
  });

  it('should handle arrays correctly when they differ', () => {
    const query = {
      tags: ['tag1', 'tag2'],
    };
    const defQuery = {
      tags: ['tag1'],
    };
    const result = getQueryWithoutDefaults(query, defQuery);
    expect(result).toEqual({
      tags: ['tag1', 'tag2'],
    });
  });

  it('should not include default values in the returned object', () => {
    const query = {
      name: 'John',
      age: 30,
      city: 'New York',
    };
    const defQuery = {
      name: 'John',
      age: 30,
      city: 'Los Angeles',
    };
    const result = getQueryWithoutDefaults(query, defQuery);
    expect(result).toEqual({
      city: 'New York',
    });
  });

  it('should return the object as is if all values are different from the defaults', () => {
    const query = {
      name: 'Alice',
      age: 25,
    };
    const defQuery = {
      name: 'Bob',
      age: 30,
    };
    const result = getQueryWithoutDefaults(query, defQuery);
    expect(result).toEqual(query);
  });

  it('should handle empty query object correctly', () => {
    const query = {};
    const defQuery = {
      name: 'John',
      age: 30,
    };
    const result = getQueryWithoutDefaults(query, defQuery);
    expect(result).toEqual({});
  });

  it('should handle empty default query object correctly', () => {
    const query = {
      name: 'John',
    };
    const defQuery = {};
    const result = getQueryWithoutDefaults(query, defQuery);
    expect(result).toEqual(query);
  });
});
