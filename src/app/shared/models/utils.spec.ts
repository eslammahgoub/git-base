import { Utils } from '@models/utils';

// Utils Unit test
describe('Utils', () => {

  it('should getUrlIssue Fn return string with repo page', () => {
    const url = Utils.getUrlIssue("https://api.github.com/repos/dtrupenn/Tetris/issues{/number}");
    const result = "https://github.com/dtrupenn/Tetris/issues";

    expect(url).toBeTruthy(result);
  });
});
