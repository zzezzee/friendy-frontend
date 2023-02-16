import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useGuestBookRegistrationFormStore from '../../hooks/useGuestBookRegistrationFormStore';
import useGuestBookStore from '../../hooks/useGuestBookStore';

const Container = styled.div`
  h1{
    text-align: center;
    padding: .3em;;
    margin-bottom: .6em;
    font-weight: 600;
    border-bottom: 3px solid #FAD15B;
  }
  padding: 1em;
  background-color: white;
  border-radius: 1em;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 10, 0.3);

  textarea{
    width: 100%;
    height: 200px;
  }
`;
const SubmitButton = styled.button`
    align-self: right;
    border: 1px solid #EAEAEC;
    padding: .3em .5em;
    font-size: .8em;
    font-weight: 600;
    background-color: #fff2cc;
    border-radius: 1em;
`;

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
    <Container>
      <h1>방명록 등록</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-guestBook">
          <textarea
            id="input-guestBook"
            type="text"
            onChange={handleChangeContent}
          />
        </label>
        <SubmitButton type="submit">등록</SubmitButton>
      </form>
    </Container>
  );
}
