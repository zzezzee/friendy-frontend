import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCommentFormStore from '../hooks/useCommentFormStore';
import useCommentStore from '../hooks/useCommentStore';
import useUserStore from '../hooks/useUserStore';
import dateFormat from '../utils/dateFormat';

const Container = styled.div`
  padding: 0;

  width: 390px;
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
  flex-direction: column;
`;

const ParentComment = styled.ul`
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

const ReplyComment = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  padding: .5em;
  gap: .2em;


  button {
    all:unset;
    font-size: 0.7em;
    font-weight: 300;
    margin-right: .5em;
  }

  #reComment{
    display: flex;
  }

  #nickname {
    font-size: .9em;
    margin-bottom: .4em;
  }

  #content {
    font-weight: 400;
    margin-bottom: .2em;
  }
`;

const Time = styled.strong`
  display: inline;
  margin-left: 5em;
  font-size: .5em;
`;

const Input = styled.form`
  /* padding: 3em; */
`;

const ReCommentButton = styled.button`
  all: unset;
  font-size: 0.5em;
  font-weight: 300;
`;

const InputCommentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;

  padding: .5em;
  width: 390px;

  background-color: #F7F9FA;

  bottom: 64px;

  input{
    width: 330px;
    padding: .5em;
    border-radius: 1em;
  }

  button {
    text-align: center;
    font-size: 1em;
  }

  button:last-child{
    padding-left: .6em
  }
`;

const Menu = styled.div`
  display: flex;

  div{
  button{
    font-size: 0.7em;
    font-weight: 300;

    margin-left: .5em;
  }
  }
`;

const InputType = styled.div`
  display: flex;
  /* justify-content: ; */
  button{
    padding: .2em .6em;
    background-color: lightgray;
    margin-bottom: .3em;
    border-radius: .5em;
    font-size: 0.7em;
  }
`;

export default function Comments({
  comments, postId, postType, miniHomepageOwner,
}) {
  const messagesEndRef = useRef();

  const userStore = useUserStore();
  const commentStore = useCommentStore();
  const commentFormStore = useCommentFormStore();

  const [inputMode, setInputMode] = useState('comment');

  const { nickname } = userStore;
  const { editCommentStatus } = commentStore;
  const {
    content, replyNickname, editCommentId, parentId,
  } = commentFormStore;

  const handleChangeContent = (event) => {
    commentFormStore.changeContent(event.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (inputMode === 'comment') {
      await commentStore.createComment(content, postId, postType, miniHomepageOwner);
    }

    if (inputMode === 'edit') {
      await commentStore.editComment(content, editCommentId);

      if (editCommentStatus === 'successful') {
        setInputMode('comment');
      }
    }

    if (inputMode === 'reply') {
      await commentStore.createReComment(content, postId, postType, parentId);

      setInputMode('comment');
    }

    await commentStore.fetchComments(postId);
    commentFormStore.reset();
    scrollToBottom();
  };

  const handleClickDelete = async (commentId) => {
    await commentStore.deleteComment(commentId);

    await commentStore.fetchComments(postId);
  };

  const handleClickReply = (replyTo, commentId) => {
    commentFormStore.changeReplyNickname(replyTo);
    commentFormStore.changeParentId(commentId);

    setInputMode('reply');
  };

  const handleClickEdit = (editId) => {
    commentFormStore.changeEditCommentId(editId);
    setInputMode('edit');
  };

  const handleClickCancel = () => {
    setInputMode('comment');
  };

  return ((
    <Container>
      <List>
        {comments !== undefined
          ? comments.map((comment) => (
            <Item key={comment.id} ref={messagesEndRef}>
              <ParentComment>
                <Link to={`/${comment.nickname}`}>
                  <Image src={comment.profileImage} alt="프로필이미지" />
                </Link>
                <div>
                  <p id="nickname">
                    {comment.nickname}
                    <Time>{dateFormat(comment.createdAt)}</Time>
                  </p>
                  <p id="content">{comment.content}</p>
                  <Menu>
                    <ReCommentButton
                      type="button"
                      onClick={() => handleClickReply(comment.nickname, comment.id)}
                    >
                      답글달기
                    </ReCommentButton>
                    {comment.nickname === nickname
                      ? (
                        <div>
                          <button type="button" onClick={() => handleClickEdit(comment.id)}>수정</button>
                          <button type="button" onClick={() => handleClickDelete(comment.id)}>삭제</button>
                        </div>
                      )
                      : null}
                  </Menu>
                </div>
              </ParentComment>
              <div>
                <ReplyComment ref={messagesEndRef}>
                  {comment.reComments.map((reComment) => (
                    <div id="reComment" key={reComment.id}>
                      <Link to={`/${reComment.nickname}`}>
                        <Image src={reComment.profileImage} alt="프로필이미지" />
                      </Link>
                      <div>
                        <p id="nickname">
                          {reComment.nickname}
                          <Time>{dateFormat(reComment.createdAt)}</Time>
                        </p>
                        <p id="content">{reComment.content}</p>
                        {reComment.nickname === nickname
                          ? (
                            <div>
                              <button type="button" onClick={() => handleClickEdit(reComment.id)}>수정</button>
                              <button type="button" onClick={() => handleClickDelete(reComment.id)}>삭제</button>
                            </div>
                          )
                          : null}
                      </div>
                    </div>
                  ))}
                </ReplyComment>
              </div>
            </Item>
          ))
          : null}
      </List>
      <Input onSubmit={handleSubmitComment}>
        <InputCommentBox>
          <InputType>
            {inputMode === 'edit'
              ? <p>댓글을 수정중..</p>
              : null}
            {inputMode === 'reply'
              ? (
                <p>
                  {replyNickname}
                  님에게 답글 남기는중..
                </p>
              )
              : null}
            {inputMode === 'reply' || inputMode === 'edit'
              ? <button type="button" onClick={handleClickCancel}>취소</button>
              : null}
          </InputType>
          <div>
            <label htmlFor="input-comment">
              <input
                type="text"
                id="input-comment"
                onChange={handleChangeContent}
                value={content}
              />
            </label>
            <button type="submit">게시</button>
          </div>
        </InputCommentBox>
      </Input>
    </Container>
  ));
}
