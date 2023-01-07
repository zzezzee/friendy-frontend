import { useLocation, useNavigate } from 'react-router-dom';
import useGuestBookRegistrationFormStore from '../../hooks/useGuestBookRegistrationFormStore';
import useGuestBookStore from '../../hooks/useGuestBookStore';

export default function GuestBookRegistrationForm() {
  const navigate = useNavigate();

  const guestBookRegistrationForm = useGuestBookRegistrationFormStore();
  const guestBookStore = useGuestBookStore();

  const location = useLocation();
  const nickname = location.pathname?.split('/')[1] || '';

  const handleChangeContent = (event) => {
    guestBookRegistrationForm.changeContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { content } = guestBookRegistrationForm;

    await guestBookStore.createGuestBook(nickname, content);

    navigate(-1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-guestBook">
          방명록 내용
          <input
            id="input-guestBook"
            type="text"
            onChange={handleChangeContent}
          />
        </label>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
