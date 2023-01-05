import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseURL = config.apiBaseURL;

const server = setupServer(
  // User
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

  // MiniHomepage
  rest.get(`${baseURL}/miniHomepages`, async (req, res, ctx) => res(ctx.json({
    nickname: 'zzezze',
    profileImage: 'image',
    introduction: '미니홈피 소개입니다',
  }))),

  rest.patch(`${baseURL}/miniHomepages`, async (req, res, ctx) => res(ctx.json({
    profileImage: 'image',
    explanation: '미니홈피 소개입니다',
  }))),

  rest.post(`${baseURL}/miniHomepages/upload`, async (req, res, ctx) => res(ctx.json({
    profileImage: 'image_address',
  }))),

  // PhotoBook
  rest.get(`${baseURL}/photos`, async (req, res, ctx) => {
    const param = req.url.searchParams.get('nickname');

    if (param === 'zzezze') {
      return res(ctx.json({
        photos: [
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
      }));
    }

    return res.status(400);
  }),

  rest.post(`${baseURL}/photos`, async (req, res, ctx) => res(ctx.json({
    photo:
      {
        id: 1,
        image: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/photo1.avif',
        explanation: '사진 설명입니다',
      },
  }))),

  rest.post(`${baseURL}/photos/upload`, async (req, res, ctx) => res(ctx.json({
    profileImage: 'image_address',
  }))),

  rest.patch(`${baseURL}/photos/1`, async (req, res, ctx) => res(ctx.json({
    photo:
      {
        id: 1,
        image: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/photo1.avif',
        explanation: '사진 설명입니다',
      },
  }))),

  // GuestBook
  rest.get(`${baseURL}/guest-books`, async (req, res, ctx) => {
    const param = req.url.searchParams.get('nickname');

    if (param === 'zzezze') {
      return res(ctx.json({
        guestBooks: [
          {
            id: 1,
            contents: '방명록 내용1',
            username: 'zzezze',
            profileImage: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A5%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5.avif',
            writer: '허스키 주인1',
          },
        ],
      }));
    }

    return res.status(400);
  }),

  rest.get(`${baseURL}/guest-books/:id`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    contents: '방명록 내용1',
    username: 'zzezze',
    profileImage: 'https://friendyimages.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A5%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5.avif',
    writer: '허스키 주인1',
  }))),
);

export default server;
