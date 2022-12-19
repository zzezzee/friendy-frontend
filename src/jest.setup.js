import server from './testServer';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
