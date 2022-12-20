/* global actor */

module.exports = () => actor({
  login({ username, password }) {
    this.fillField('아이디', username);
    this.fillField('비밀번호', password);

    this.click('로그인');
  },
});
