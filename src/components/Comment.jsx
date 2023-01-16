import styled from 'styled-components';

const Container = styled.div`
  padding: 0em;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: fill;
`;

const List = styled.ul`
  display: flex;
  gap: .2em;
  flex-wrap: wrap;
`;

const Item = styled.ul`
  display: flex;
  gap: .2em;
  flex-wrap: wrap;
`;

export default function Comments({ comments }) {
  const handleSubmitComment = () => {

  };

  const handleClickRegister = () => {

  };

  const handleClickReply = () => {

  };

  return ((
    <Container>
      <ul>
        {comments !== undefined
          ? comments.map((comment) => (
            <Item key={comment.id}>
              <Image src={comment.profileImage} alt="프로필이미지" />
              <div>
                <p>{comment.nickname}</p>
                <p>{comment.content}</p>
                <button type="button" onClick={handleClickReply}>답글달기</button>
              </div>
              <p>{comment.createdAt}</p>
            </Item>
          ))
          : null}
      </ul>
      <form onSubmit={handleSubmitComment}>
        <label htmlFor="input-comment">
          <input type="text" id="input-comment" />
        </label>
        <button type="submit" onClick={handleClickRegister}>등록</button>
      </form>
    </Container>
  ));
}
