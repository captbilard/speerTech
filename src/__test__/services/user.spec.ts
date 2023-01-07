import * as userService from '../../services/user.service';
import prisma from '../../../prisma/db';

describe('User service test', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({ where: { username: 'test' } });
  });
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { username: 'test' } });
  });
  describe('create user', () => {
    it('should create a user and return token', async () => {
      const data = await userService.create('test', 'password');
      expect(data.token).toEqual(expect.any(String));
    });

    it('should fail when same username is used', async () => {
      await userService.create('test', 'password');
      await expect(userService.create('test', 'password')).rejects.toThrow();
    });
  });

  describe('Authenticate user', () => {
    it('should authenticate user and return token', async () => {
      await userService.create('test', 'password');
      const data = await userService.signIn('test', 'password');
      expect(data.token).toEqual(expect.any(String));
    });

    it('should fail when  password is incorrect', async () => {
      await userService.create('test', 'password');
      await expect(userService.signIn('test', 'test')).rejects.toThrowError(
        'Invalid Username or Password'
      );
    });

    it('should fail when  username is incorrect', async () => {
      await userService.create('test', 'password');
      await expect(userService.signIn('mock', 'password')).rejects.toThrowError(
        'Invalid Username or Password'
      );
    });
  });
});
