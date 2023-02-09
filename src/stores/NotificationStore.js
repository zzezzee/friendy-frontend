import EventSource from 'eventsource';
import { notificationApiService } from '../services/NotificationApiService';
import Store from './Store';

export default class NotificationStore extends Store {
  constructor() {
    super();

    this.sseEvents = null;

    this.notifications = [];

    this.photoCommentNotifications = [];
    this.likeNotifications = [];

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

    this.photoCommentNotifications = photoCommentNotifications;
    this.likeNotifications = likeNotifications;

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
    

    this.publish();
  }

  async addNotification(notification) {
    this.notification = notification;

    this.publish();
  }
}

export const notificationStore = new NotificationStore();
