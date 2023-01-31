import { Link } from 'react-router-dom';
import FriendsPhoto from './FriendsPhoto';

export default function Collection() {
  return ((
    <div>
      <Link to="chat-rooms">채팅</Link>
      <FriendsPhoto />
    </div>
  ));
}
