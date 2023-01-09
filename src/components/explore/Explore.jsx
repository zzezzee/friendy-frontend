import useUserStore from '../../hooks/useUserStore';
import User from './User';

export default function Explore() {
  const userStore = useUserStore();

  const { users } = userStore;

  return ((
    <div>
      <ul>
        {users
          ? users.map((user) => (
            <li key={user.id}>
              <User user={user} />
            </li>
          ))
          : null}
      </ul>
    </div>
  ));
}
