// import * as uuid from 'uuid';

export class Utils {

  /**
   * getUrlIssue
   * @function
   * @description modify the url from api url to github issues page
   * @param {string} url
   * @returns {string} url of github issue page for the repo
   */
   static getUrlIssue(url: string): string {
    return url.replace('api.', '').replace('repos/', '').split('issues')[0] + 'issues';
  }
}
