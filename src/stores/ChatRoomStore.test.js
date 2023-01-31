import ChatRoomStore from './ChatRoomStore';

const context = describe;

describe('ProfileFormStore', () => {
  let chatRoomStore;

  beforeEach(() => {
    chatRoomStore = new ChatRoomStore();
  });

  context('when fetch chatRooms success', () => {
    it('status is successful', async () => {
      await chatRoomStore.fetchChatRooms('zzezze');

      expect(chatRoomStore.status).toBe('successful');
    });
  });
});
