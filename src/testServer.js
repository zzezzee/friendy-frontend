import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseURL = config.apiBaseURL;

const server = setupServer(
  rest.post(`${baseURL}/session`, async (req, res, ctx) => {
    const {
      username, password,
    } = await req.json();

    if (username === 'username'
    && password === 'Password123!') {
      return res(
        ctx.json({
          accessToken: 'ACCESS.TOKEN',
          nickname: '홍길동',
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseURL}/users/me`, async (req, res, ctx) => res(ctx.json({
    nickname: 'zzezze',
  }))),

  rest.get(`${baseURL}/miniHomepages`, async (req, res, ctx) => res(ctx.json({
    nickname: 'zzezze',
    profileImage: 'image',
    introduction: '미니홈피 소개입니다',
  }))),

  rest.get(`${baseURL}/photo-books`, async (req, res, ctx) => res(ctx.json({
    photoBook: [
      {
        id: 1,
        image: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/photo1.avif',
        explanation: '사진 설명입니다',
      },
      {
        id: 2,
        image: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/photo2.avif',
        explanation: '사진 설명입니다',
      },
    ],
  }))),
);

export default server;
