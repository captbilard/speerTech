import app from '../../app';
import request from 'supertest';
import prisma from '../../../prisma/db';

const data = {
  username: 'testUser',
  password: 'Test123*'
};
const tweet = { message: 'test message' };
const client = request(app);
describe('E2E Test', () => {
  afterEach(async () => {
    await prisma.tweet.deleteMany({});
    await prisma.user.deleteMany({});
  });

  describe('GET /', () => {
    it('should return a message from the server', async () => {
      const res = await client.get('/');
      expect(res.body.message).toBe('hello from server');
    });
  });

  describe('POST /user', () => {
    it('should create a new user and return a token', async () => {
      const res = await client.post('/user').send(data);
      const token = res.body.token;
      expect(token).toBeDefined();
    });
  });

  describe('POST /login', () => {
    it('should log a user in and respond with json', async () => {
      await client.post('/user').send(data);
      const res = await client.post('/login').send(data);
      expect(res.status).toEqual(200);
      expect(res.body.token).toEqual(expect.any(String));
    });
  });

  describe('GET /api/v1/tweet', () => {
    it('should fail without auth token', async () => {
      const res = await client.get('/api/v1/tweet');
      expect(res.status).toEqual(401);
    });

    it('should get all tweets ', async () => {
      await client.post('/user').send(data);
      const loginRes = await client.post('/login').send(data);
      await client
        .post('/api/v1/tweet')
        .send(tweet)
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      const res = await client
        .get('/api/v1/tweet')
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      expect(res.status).toEqual(200);
      expect(res.body.data).toEqual(expect.any(Array));
    });

    it('should get single tweet ', async () => {
      await client.post('/user').send(data);
      const loginRes = await client.post('/login').send(data);
      const newTweet = await client
        .post('/api/v1/tweet')
        .send(tweet)
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      const id = newTweet.body.data.id;
      const res = await client
        .get(`/api/v1/tweet/${id}`)
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      expect(res.status).toEqual(200);
      expect(res.body.data).toEqual(expect.any(Object));
    });

    it('should fail with invalid tweet id', async () => {
      await client.post('/user').send(data);
      const loginRes = await client.post('/login').send(data);
      const res = await client
        .get('/api/v1/tweet/invalidId')
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      expect(res.status).toEqual(404);
    });
  });

  describe('POST /api/v1/tweet', () => {
    it('should fail without auth token', async () => {
      const res = await client.post('/api/v1/tweet').send(tweet);
      expect(res.status).toEqual(401);
    });

    it('should post a new tweet', async () => {
      await client.post('/user').send(data);
      const loginRes = await client.post('/login').send(data);
      const res = await client
        .post('/api/v1/tweet')
        .send(tweet)
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      expect(res.status).toEqual(201);
      expect(res.body.data).toEqual(expect.any(Object));
    });
  });

  describe('PUT /api/v1/tweet', () => {
    it('should fail without auth token', async () => {
      const res = await client.put('/api/v1/tweet/someid').send(tweet);
      expect(res.status).toEqual(401);
    });

    it('should update tweet', async () => {
      await client.post('/user').send(data);
      const loginRes = await client.post('/login').send(data);
      const newTweet = await client
        .post('/api/v1/tweet')
        .send(tweet)
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      const id = newTweet.body.data.id;
      const res = await client
        .put(`/api/v1/tweet/${id}`)
        .send({ message: 'updated tweet' })
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      expect(res.status).toEqual(200);
      expect(res.body.data.message).toBe('updated tweet');
    });

    it('should fail when invalid tweet id is passed', async () => {
      await client.post('/user').send(data);
      const loginRes = await client.post('/login').send(data);
      const res = await client
        .put(`/api/v1/tweet/someid`)
        .send({ message: 'updated tweet' })
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      expect(res.status).toEqual(404);
    });
  });

  describe('DELETE /api/v1/tweet', () => {
    it('should fail without auth token', async () => {
      const res = await client.delete('/api/v1/tweet/someid');
      expect(res.status).toEqual(401);
    });

    it('should delete a tweet with valid id', async () => {
      await client.post('/user').send(data);
      const loginRes = await client.post('/login').send(data);
      const newTweet = await client
        .post('/api/v1/tweet')
        .send(tweet)
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      const id = newTweet.body.data.id;
      const res = await client
        .delete(`/api/v1/tweet/${id}`)
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      expect(res.status).toEqual(200);
    });

    it('should fail when invalid id is passed', async () => {
      await client.post('/user').send(data);
      const loginRes = await client.post('/login').send(data);
      const res = await client
        .delete(`/api/v1/tweet/someid`)
        .set('Authorization', `Bearer ${loginRes.body.token}`);
      expect(res.status).toEqual(404);
    });
  });
});
