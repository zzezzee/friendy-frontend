import useUserStore from '../../hooks/useUserStore';
import User from './User';

export default function Explore() {
  const userStore = useUserStore();

  const { users, filteredUsers, searching } = userStore;

  const handleChangeInput = (event) => {
    userStore.filterUsersWithNickname(event.target.value);
  };

  return ((
    <div>
      <label htmlFor="input-user">
        검색
        <input id="input-user" type="text" onChange={handleChangeInput} />
      </label>
      <ul>
        {searching === false
          ? users.map((user) => (
            <li key={user.id}>
              <User user={user} />
            </li>
          ))
          : null}
        {searching === true
          ? filteredUsers.map((user) => (
            <li key={user.id}>
              <User user={user} />
            </li>
          ))
          : null}
        {filteredUsers.length === 0
          ? <p>검색 결과가 없습니다</p>
          : null}
      </ul>
    </div>
  ));
}
