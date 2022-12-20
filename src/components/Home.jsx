import { Link } from 'react-router-dom';

export default function Home() {
  return ((
    <div>
      <p>Home</p>
      <Link to="/login">로그인</Link>
    </div>
  ));
}
