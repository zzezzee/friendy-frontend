import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useCommentFormStore from '../hooks/useCommentFormStore';
import useCommentStore from '../hooks/useCommentStore';
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
  margin-left: 1em;
  padding: .5em;
  gap: .2em;


  button {
    all:unset;
    font-size: 0.7em;
    font-weight: 300;
    margin-right: .5em;
  }

  li{
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
  padding: 3em;
`;

const ReCommentButton = styled.button`
  all: unset;
  font-size: 0.5em;
  font-weight: 300;
`;

export default function Comments({ comments, postId, postType }) {
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

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    if (inputMode === 'comment') {
      await commentStore.createComment(content, postId, postType);
    }

    if (inputMode === 'edit') {
      await commentStore.editComment(content, editCommentId);

      if (editCommentStatus === 'successful') {
        setInputMode('comment');
      }
    }

    if (inputMode === 'reComment') {
      await commentStore.createReComment(content, postId, postType, parentId);
    }

    await commentStore.fetchComments(postId);
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
            <Item key={comment.id}>
              <ParentComment>
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
                    onClick={() => handleClickReply(comment.nickname, comment.id)}
                  >
                    답글달기
                  </ReCommentButton>
                  {comment.nickname === nickname
                    ? (
                      <div>
                        <button type="button" onClick={() => handleClickDelete(comment.id)}>삭제</button>
                        <button type="button" onClick={() => handleClickEdit(comment.id)}>수정</button>
                      </div>
                    )
                    : null}
                </div>
              </ParentComment>
              <div>
                <ReplyComment>
                  {comment.reComments.map((reComment) => (
                    <li key={reComment.id}>
                      <Link to={`/${reComment.nickname}`}>
                        <Image src={reComment.profileImage} alt="프로필이미지" />
                      </Link>
                      <div>
                        <p id="nickname">
                          {reComment.nickname}
                          <Time>{reComment.createdAt}</Time>
                        </p>
                        <p id="content">{reComment.content}</p>
                        {reComment.nickname === nickname
                          ? (
                            <div>
                              <button type="button" onClick={() => handleClickDelete(reComment.id)}>삭제</button>
                              <button type="button" onClick={() => handleClickEdit(reComment.id)}>수정</button>
                            </div>
                          )
                          : null}
                      </div>
                    </li>
                  ))}
                </ReplyComment>
              </div>
            </Item>
          ))
          : null}
      </List>
      <Input onSubmit={handleSubmitComment}>
        {inputMode === 'reply'
          ? (
            <p>
              {replyNickname}
              님에게 답글 남기는중..
            </p>
          )
          : null}
        {inputMode === 'edit'
          ? <p>댓글을 수정중..</p>
          : null}
        {inputMode === 'reply' || inputMode === 'edit'
          ? <button type="button" onClick={handleClickCancel}>x</button>
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
