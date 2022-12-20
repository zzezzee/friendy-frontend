Feature('로그인 화면');

Before(({ I }) => {
  I.amOnPage('/login');
  // I.setupDatabase();
});

Scenario('로그인 화면', ({ I }) => {
  // Then
  I.see('LOGIN');
});

// Scenario('정상적으로 로그인', ({ I }) => {
//   // When
//   I.login({
//     username: 'test',
//     password: 'test',
//   });

//   // Then
//   I.seeMiniHomePage();
// });

Scenario('아이디와 비밀번호를 입력하지 않고 로그인', ({ I }) => {
  // When
  I.login({ username: '', password: '' });

  // Then
  I.see('아이디와 비밀번호를 입력해주세요');
});

Scenario('아이디를 입력하지 않고 로그인', ({ I }) => {
  // When
  I.login({ username: '', password: 'test' });

  // Then
  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않고 로그인', ({ I }) => {
  // When
  I.login({ username: 'test', password: '' });

  // Then
  I.see('비밀번호를 입력해주세요');
});

// Scenario('등록되지 않은 아이디를 입력해 로그인', ({ I }) => {
//   // When
//   I.login({ username: 'xxx', password: 'Password123!' });

//   // Then
//   I.see('아이디 혹은 비밀번호가 맞지 않습니다');
// });

// Scenario('틀린 비밀번호를 입력해 로그인', ({ I }) => {
//   // When
//   I.login({ username: 'test', password: 'xxx' });

//   // Then
//   I.see('아이디 혹은 비밀번호가 맞지 않습니다');
// });
