export default (url) => {
  switch (url) {
    case 'userX/repo-2000-02-03':
      return Promise.resolve('2000-02-03T18:55:10Z');
    case 'userY/repo-2001-05-06':
      return Promise.resolve('2001-05-06T13:20:00Z');
    case 'timeout/timeout':
      return new Promise(() => {});
    case 'a^b_c/repo':
    case 'userX/a@bc':
      return Promise.reject(new Error('Invalid Argument: Must be called with a valid repo name'));
    default:
      return Promise.reject(new Error('404 Not Found'));
  }
};
