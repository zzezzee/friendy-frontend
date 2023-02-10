import EventSource from 'eventsource';
import { notificationApiService } from '../services/NotificationApiService';
import Store from './Store';

export default class NotificationStore extends Store {
  constructor() {
    super();

    this.sseEvents = null;

    this.notifications = [];

    this.unCheckedNotifications = [];

    this.status = '';
  }

  async connect(accessToken) {
    const sseEvents = new EventSource('http://localhost:8000/connect', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    this.sseEvents = sseEvents;
    console.log('sse 연결');

    await sseEvents.addEventListener('client', (e) => {
      console.log(JSON.parse(e.data));
      this.fetchNotifications();
    });
  }

  async fetchNotifications() {
    const {
      photoCommentNotifications,
      likeNotifications,
      invitationNotifications,
    } = await notificationApiService.fetchNotifications();

    photoCommentNotifications.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    this.notifications = [
      ...photoCommentNotifications,
      ...likeNotifications,
      ...invitationNotifications];

    this.notifications.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    this.unCheckedNotifications = this.notifications.filter((notification) => (
      notification.checked === false
    ));

    this.publish();
  }

  async deleteAll() {
    await notificationApiService.deleteAll();

    this.notifications = [];
    this.unCheckedNotifications = [];

    this.publish();
  } 
  
  async deleteAllChecked() {
    await notificationApiService.deleteAllChecked();

    this.notifications = this.notifications.filter((e) => !e.checked);

    this.unCheckedNotifications = [];

    this.publish();
  }

    async delete(id) {
    await notificationApiService.delete(id);

    this.notifications = this.notifications.filter((e) => e.id !== id);

    this.publish();
  }

  async checkAll() {
    await notificationApiService.checkAll();

    this.notifications.forEach(notification => (
      notification.checked = true,
    ));

    this.publish();
  }

  async check(id) {
    await notificationApiService.check(id);

    this.publish();
  }
}

export const notificationStore = new NotificationStore();
