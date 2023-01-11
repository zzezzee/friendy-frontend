import useUserStore from '../../hooks/useUserStore';
import FriendInvite from './FriendInvite';
import FriendList from './FriendList';

export default function Friend() {
  const userStore = useUserStore();

  const { relationship } = userStore;

  return ((
    <div>
      {relationship === 'me'
        ? <FriendInvite />
        : null}
      <FriendList />
    </div>
  ));
}
