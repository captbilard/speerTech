export const mockUser = {
  id: 'someid',
  username: 'mock',
  password: 'mockPass',
  createdAt: new Date()
};

export const mockTweet = {
  id: 'someid',
  createdAt: new Date(),
  updatedAt: new Date(),
  message: 'some message',
  userId: 'userId',
  belongsTo: mockUser
};
