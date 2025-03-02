import { converErrorArrToObj } from '@/assets/js/lib/error';

describe('converErrorArrToObj', () => {
  it('should correctly convert an array of errors to an object', () => {
    const errArr = [
      { param: 'username', msg: 'Username is required' },
      { param: 'username', msg: 'Username must be at least 3 characters' },
      { param: 'password', msg: 'Password is required' },
    ];

    const result = converErrorArrToObj(errArr);
    expect(result).toEqual({
      username: 'Username is required; Username must be at least 3 characters',
      password: 'Password is required',
    });
  });

  it('should handle an empty array', () => {
    const errArr = [];
    const result = converErrorArrToObj(errArr);
    expect(result).toEqual({});
  });

  it('should handle an array with a single error for a parameter', () => {
    const errArr = [{ param: 'email', msg: 'Email is invalid' }];
    const result = converErrorArrToObj(errArr);
    expect(result).toEqual({
      email: 'Email is invalid',
    });
  });

  it('should correctly join error messages for the same parameter', () => {
    const errArr = [
      { param: 'email', msg: 'Email is required' },
      { param: 'email', msg: 'Email format is incorrect' },
    ];
    const result = converErrorArrToObj(errArr);
    expect(result).toEqual({
      email: 'Email is required; Email format is incorrect',
    });
  });

  it('should not mix error messages for different parameters', () => {
    const errArr = [
      { param: 'username', msg: 'Username is required' },
      { param: 'password', msg: 'Password is required' },
    ];
    const result = converErrorArrToObj(errArr);
    expect(result).toEqual({
      username: 'Username is required',
      password: 'Password is required',
    });
  });

  it('should handle repeated error messages for the same parameter', () => {
    const errArr = [
      { param: 'username', msg: 'Username is required' },
      { param: 'username', msg: 'Username is required' },
    ];
    const result = converErrorArrToObj(errArr);
    expect(result).toEqual({
      username: 'Username is required; Username is required',
    });
  });

  it('should correctly handle non-empty parameters', () => {
    const errArr = [
      { param: 'firstName', msg: 'First name is required' },
      { param: 'lastName', msg: 'Last name is required' },
    ];
    const result = converErrorArrToObj(errArr);
    expect(result).toEqual({
      firstName: 'First name is required',
      lastName: 'Last name is required',
    });
  });
});
