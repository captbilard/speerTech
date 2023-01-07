import * as tweetService from '../../services/tweet.service';

describe('Tweet service test', () => {
  describe('find all tweets', () => {
    it('should return an array', async () => {
      const data = await tweetService.findAll();
      expect(data.tweets).toEqual(expect.any(Array));
    });
  });
});
