import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseURL = config.apiBaseURL;

const server = setupServer();

export default server;
