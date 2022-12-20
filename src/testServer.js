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
);

export default server;
