import useUserStore from '../../hooks/useUserStore';
import User from './User';

export default function Explore() {
  const userStore = useUserStore();

  const { users, searching } = userStore;

  const handleSubmit = () => {

  };

  return ((
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-user">
          검색
          <input id="input-user" type="text" />
        </label>
        <button type="submit">검색</button>
      </form>
      <ul>
        {searching === false
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
