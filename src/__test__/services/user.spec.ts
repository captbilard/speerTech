import * as userService from '../../services/user.service';
import prisma from '../../../prisma/db';

const user = {
  id: 'someid',
  username: 'mock',
  password: 'mockPass',
  createdAt: new Date()
};

describe('User service test', () => {
  beforeAll(async () => {
    await prisma.tweet.deleteMany({});
    await prisma.user.deleteMany({});
  });

  it('should create a user and return token', async () => {
    const data = await userService.create(user.username, user.password);
    expect(data.token).toEqual(expect.any(String));
  });

  it('should fail when same username is used', async () => {
    expect(async () => {
      await userService.create(user.username, user.password);
    }).rejects.toThrow();
  });

  it('should find user and return token', async () => {
    const data = await userService.signIn(user.username, user.password);
    expect(data.token).toEqual(expect.any(String));
  });

  it('should fail when  password is incorrect', async () => {
    expect(async () => {
      await userService.signIn(user.username, 'password');
    }).rejects.toThrowError('Invalid Username or Password');
  });
});
