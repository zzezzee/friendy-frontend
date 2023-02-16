import styled from 'styled-components';
import { Search } from '../../assets/common';
import useUserStore from '../../hooks/useUserStore';
import User from './User';

const Container = styled.div`
  input{
    width: 330px;
    padding: .5em;
    border-radius: 1em;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  padding: .7em;
`;

const SearchIcon = styled.img`
  align-items: center;
  margin-right: .4em;
`;

const Users = styled.div`
  padding: 2em .5em;
  border-radius: 1em;
  background-color: white;

  list-style: none;

  li{
    margin-bottom: .5em;
  }

  p:last-child{
    font-size: .9em;
    font-weight: 600;
  }
`;

export default function Explore() {
  const userStore = useUserStore();

  const { users, filteredUsers, searching } = userStore;

  const handleChangeInput = (event) => {
    userStore.filterUsersWithNickname(event.target.value);
  };

  return ((
    <Container>
      <InputWrapper>
        <SearchIcon src={Search} alt="사용자 검색 아이콘" />
        <label htmlFor="input-user">
          <input
            id="input-user"
            type="text"
            placeholder="검색어를 입력해 주세요"
            onChange={handleChangeInput}
          />
        </label>
      </InputWrapper>
      <Users>
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
        {searching === true && filteredUsers.length === 0
          ? <p>검색 결과가 없습니다</p>
          : null}
      </Users>
    </Container>
  ));
}
