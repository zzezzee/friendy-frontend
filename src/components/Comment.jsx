import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCommentFormStore from '../hooks/useCommentFormStore';
import usePhotoBookStore from '../hooks/usePhotoBookStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  padding: 0em;
`;

const Image = styled.img`
  margin-right: .7em;
  width: 50px;
  height: 50px;
  object-fit: fill;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: .2em;
`;

const Item = styled.li`
  display: flex;
  padding: .5em;
  gap: .2em;

  #nickname {
    font-size: .9em;
    margin-bottom: .4em;
  }

  #content {
    font-weight: 400;
    margin-bottom: .2em;
  }
`;

const Time = styled.p`
  display: inline;
  margin-left: 5em;
  font-size: .5em;
`;

const Input = styled.form`
  padding: 3em;
`;

const ReCommentButton = styled.button`
  all: unset;
  font-size: 0.5em;
  font-weight: 300;
`;

export default function Comments({ comments, id }) {
  const photoBookStore = usePhotoBookStore();
  const commentFormStore = useCommentFormStore();
  const userStore = useUserStore();

  const [reCommentTo, setReCommentTo] = useState('');

  const { nickname } = userStore;

  const handleChangeContent = (event) => {
    commentFormStore.changeContent(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    const { content } = commentFormStore;

    await photoBookStore.createComment(content, id);
    await photoBookStore.fetchPhoto(id);
  };

  const handleClickReply = (commentNickname) => {
    setReCommentTo(commentNickname);
  };

  const handleClickCancelReComment = () => {
    setReCommentTo('');
  };

  const handleClickDelete = () => {

  };

  const handleClickEdit = () => {

  };

  return ((
    <Container>
      <List>
        {comments !== undefined
          ? comments.map((comment) => (
            <Item key={comment.id}>
              <Link to={`/${comment.nickname}`}>
                <Image src={comment.profileImage} alt="프로필이미지" />
              </Link>
              <div>
                <p id="nickname">
                  {comment.nickname}
                  <Time>{comment.createdAt}</Time>
                </p>
                <p id="content">{comment.content}</p>
                <ReCommentButton
                  type="button"
                  onClick={() => handleClickReply(comment.nickname)}
                >
                  답글달기
                </ReCommentButton>
                {comment.nickname === nickname
                  ? (
                    <div>
                      <button type="button" onClick={handleClickDelete}>삭제</button>
                      <button type="button" onClick={handleClickEdit}>수정</button>
                    </div>
                  )
                  : null}
              </div>
            </Item>
          ))
          : null}
      </List>
      <Input onSubmit={handleSubmitComment}>
        {reCommentTo
          ? (
            <div>
              <p>
                {reCommentTo}
                님에게 답글 남기는중
                <button type="button" onClick={handleClickCancelReComment}>x</button>
              </p>
            </div>
          )
          : null}
        <label htmlFor="input-comment">
          댓글
          <input
            type="text"
            id="input-comment"
            onChange={handleChangeContent}
          />
        </label>
        <button type="submit">등록</button>
      </Input>
    </Container>
  ));
}
