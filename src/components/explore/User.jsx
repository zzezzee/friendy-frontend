import styled from 'styled-components';

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: fill;
`;

export default function User({ user }) {
  return ((
    <div>
      <a href={`/${user.nickname}`}>
        <Image
          src={user.profileImage}
          alt={`유저${user.id}`}
        />
        {user.nickname}
      </a>
      <p>
        함께아는친구:
        {user.friendsTogether.length || 0}
        명
      </p>
    </div>
  ));
}
