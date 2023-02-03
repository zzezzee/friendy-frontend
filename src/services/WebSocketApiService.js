/* eslint-disable class-methods-use-this */

export default class WebSocketApiService {
  sendTextMessage({
    client, message,
  }) {
    client.send(
      '/pub/chats',
      { },
      JSON.stringify(message),
    );
  }
}

export const webSocketApiService = new WebSocketApiService();
