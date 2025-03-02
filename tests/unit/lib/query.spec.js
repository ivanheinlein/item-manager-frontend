import { getQueryWithoutDefaults, parseQuery, stringifyQuery } from '@/assets/js/lib/query';

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

describe('parseQuery', () => {
  it('should return an empty object when the query is empty', () => {
    const query = {};
    const result = parseQuery(query);
    expect(result).toEqual({});
  });

  it('should return the same value if the string does not end with ARRAY_SEPAR', () => {
    const query = { key1: 'value1', key2: 'value2' };
    const result = parseQuery(query);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should split the string by ARRAY_SEPAR and remove the last separator', () => {
    const query = { key1: 'apple,banana,' };
    const result = parseQuery(query);
    expect(result).toEqual({ key1: ['apple', 'banana'] });
  });

  it('should handle multiple keys and transform each value correctly', () => {
    const query = { key1: 'apple,banana,', key2: 'orange,' };
    const result = parseQuery(query);
    expect(result).toEqual({
      key1: ['apple', 'banana'],
      key2: ['orange'],
    });
  });

  it('should return the same value for strings without ARRAY_SEPAR at the end', () => {
    const query = { key1: 'apple', key2: 'orange' };
    const result = parseQuery(query);
    expect(result).toEqual({ key1: 'apple', key2: 'orange' });
  });

  it('should handle an empty string value correctly', () => {
    const query = { key1: '', key2: 'apple,' };
    const result = parseQuery(query);
    expect(result).toEqual({ key1: '', key2: ['apple'] });
  });

  it('should handle a query with only one key and one value', () => {
    const query = { key1: 'a,b,c,' };
    const result = parseQuery(query);
    expect(result).toEqual({ key1: ['a', 'b', 'c'] });
  });
});

describe('stringifyQuery', () => {
  it('should return an empty object when the query is empty', () => {
    const query = {};
    const result = stringifyQuery(query);
    expect(result).toEqual({});
  });

  it('should return the same value if the value is not an array', () => {
    const query = { key1: 'value1', key2: 'value2' };
    const result = stringifyQuery(query);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should convert array values into a string with ARRAY_SEPAR as the separator', () => {
    const query = { key1: ['apple', 'banana'], key2: ['orange', 'grape'] };
    const result = stringifyQuery(query);
    expect(result).toEqual({
      key1: 'apple,banana,',
      key2: 'orange,grape,',
    });
  });

  it('should handle an array with a single element', () => {
    const query = { key1: ['apple'] };
    const result = stringifyQuery(query);
    expect(result).toEqual({ key1: 'apple,' });
  });

  it('should handle arrays with multiple elements and other non-array values', () => {
    const query = { key1: ['apple', 'banana'], key2: 'value' };
    const result = stringifyQuery(query);
    expect(result).toEqual({
      key1: 'apple,banana,',
      key2: 'value',
    });
  });

  it('should handle empty arrays correctly', () => {
    const query = { key1: [] };
    const result = stringifyQuery(query);
    expect(result).toEqual({ key1: ',' });
  });

  it('should handle array elements with empty strings', () => {
    const query = { key1: ['', 'banana'] };
    const result = stringifyQuery(query);
    expect(result).toEqual({ key1: ',banana,' });
  });
});
