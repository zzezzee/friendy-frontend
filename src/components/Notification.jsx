import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useNotificationStore from '../hooks/useNotificationStore';
import useUserStore from '../hooks/useUserStore';
import dateFormat from '../utils/dateFormat';

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: fill;
`;

export default function Notification() {
  const notificationStore = useNotificationStore();
  const userStore = useUserStore();

  const { notifications, unCheckedNotifications } = notificationStore;

  const { nickname } = userStore;

  const handleClickDelete = (id) => {
    console.log(`delete notification id = ${id}`);
  };

  const handleClickCheck = (id) => {
    console.log(`check notification id = ${id}`);
  };

  const handleClickCheckAll = () => {
  };

  const handleClickDeleteChecked = () => {
  };

  const handleClickDeleteAll = () => {
  };

  return ((
    <div>
      <div>
        <h1>
          {`알림 ${unCheckedNotifications.length} / ${notifications.length}`}
        </h1>
        <button type="button" onClick={handleClickCheckAll}>모두 읽음으로 표시</button>
        <button type="button" onClick={handleClickDeleteChecked}>확인한 알림 삭제</button>
        <button type="button" onClick={handleClickDeleteAll}>모두 삭제</button>
      </div>
      <ul>
        {notifications.map((notification) => (
          <div key={notification.id}>
            <li>
              <Link
                to={`/${nickname}/photos/${notification.photoId}`}
                onClick={() => handleClickCheck(notification.id)}
              >
                <Image src={notification.image} alt="게시물 이미지" />
                {notification.type === 'photoComment'
                  ? (
                    <p>
                      {notification.nickname}
                      님이 사진에 댓글을 남겼습니다
                    </p>
                  )
                  : null}
                {notification.type === 'Like'
                  ? (
                    <p>
                      {notification.nickname}
                      님이 게시물에 좋아요를 남겼습니다.
                    </p>
                  )
                  : null}
                <p>{notification.content}</p>
                <p>{dateFormat(notification.createdAt)}</p>
                <div>
                  {notification.checked
                    ? <div>확인된 알림</div>
                    : null}
                </div>
              </Link>
            </li>
            <button type="button" onClick={() => handleClickDelete(notification.id)}>X</button>
          </div>
        ))}
      </ul>
    </div>
  ));
}
