import * as Mastodon from '@/types/Mastodon';
import querystring from 'querystring';

export class Client {

  private url: string;
  private urlVersion: string;

  constructor () {
    this.url = '';
    this.urlVersion = '/api/v1';
  }

  private _request = (url: string, options?: RequestInit): Promise<any> => {
    return fetch(url, options)
      .then((response) => response.json()).then((data) => data)
      .catch((error)   => error.json()).then((error) => error);
  }

  private _get = (path: string, params?: object, options?: RequestInit): Promise<any> => {
    return this._request(`${this.getBaseUrl()}${path}?${querystring.stringify(params)}`, {
      method: 'GET',
      ...options,
    });
  }

  private _post = (path: string, body?: any, options?: RequestInit): Promise<any> => {
    return this._request(`${this.getBaseUrl()}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  private _put = (path: string, body?: any, options?: RequestInit): Promise<any> => {
    return this._request(`${this.getBaseUrl()}${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  private _delete = (path: string, body?: any, options?: RequestInit): Promise<any> => {
    return this._request(`${this.getBaseUrl()}${path}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      ...options,
    });
  }

  private _patch = (path: string, body?: any, options?: RequestInit): Promise<any> => {
    return this._request(`${this.getBaseUrl()}${path}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    });
  }

  public setBaseUrl = (url: string): void => {
    this.url = url;
  }

  public getBaseUrl = (): string => {
    return this.url;
  }

  /**
   * Fetching an account
   * @param id ID of the account
   * @return An account
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#fetching-an-account
   */
  public getAccount = (id: string): Promise<Mastodon.Account|Mastodon.Error> => {
    return this._get(`/accounts/${id}`);
  }

  /**
   * Getting the current user
   * @return The authenticated user's Account with an extra attribute source which contains these keys
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#getting-the-current-user
   */
  public verfiyCredentials = (): Promise<Mastodon.Credentials|Mastodon.Error> => {
    return this._get('/accounts/verify_credentials');
  }

  /**
   * Updating the current user
   * @param options Form data
   * @return The authenticated user's Account.
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#updating-the-current-user
   */
  public updateCredentials = (options?: Mastodon.UpdateCredentialsOptions): Promise<Mastodon.Credentials|Mastodon.Error> => {
    return this._patch('/accounts/update_credentials', options, {headers: {'Content-Type': 'multipart/form-data'}});
  }

  /**
   * Getting an account's followers
   * - Note: `max_id` and `since_id` for next and previous pages are provided in the Link header. It is not possible to use the id of the returned objects to construct your own URLs, because the results are sorted by an internal key.
   * @param id ID of the target account
   * @param options Query paramerters
   * @return An array of accounts
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#getting-an-accounts-followers
   */
  public getAccountFollowers = (id: string, options?: Mastodon.GetAccountFollowersOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get(`/accounts/${id}/followers`, options);
  }

  /**
   * Getting who account is following
   * - Note: `max_id` and `since_id` for next and previous pages are provided in the Link header. It is not possible to use the id of the returned objects to construct your own URLs, because the results are sorted by an internal key.
   * @param id ID of the target account
   * @param options Query parameters
   * @return An array of accounts
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#getting-who-account-is-following
   */
  public getAccountFollowing = (id: string, options?: Mastodon.GetAccountFollowingOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get(`/accounts/${id}/following`, options);
  }

  /**
   * Getting an account's statuses
   * - Note: `max_id` and `since_id` for next and previous pages are provided in the Link header. It is not possible to use the id of the returned objects to construct your own URLs, because the results are sorted by an internal key.
   * @param id ID of the target account
   * @param options Query parameters
   * @return An array of statuses
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#getting-an-accounts-statuses
   */
  public getAccountStatuses = (id: string, options?: Mastodon.GetAccountStatusesOptions): Promise<Mastodon.Status[]|Mastodon.Error> => {
    return this._get(`/accounts/${id}/statuses`, options);
  }

  /**
   * Following an account
   * @param id ID of the target account
   * @return The target account's relationship
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#followingunfollowing-an-account
   */
  public followAccount = (id: string): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/follow`);
  }

  /**
   * Unfollowing an account
   * @param id ID of the target account
   * @return The target account's relationship
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#followingunfollowing-an-account
   */
  public unfollowAccount = (id: string): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/unfollow`);
  }

  /**
   * Blocking an account
   * @param id ID of the target account
   * @return The target account's relationship
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#blockingunblocking-an-account
   */
  public blockAccount = (id: string): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/block`);
  }

  /**
   * Unblocking an account
   * @param id ID of the target account
   * @return The target account's relationship
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#blockingunblocking-an-account
   */
  public unblockAccount = (id: string): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/unblock`);
  }

  /**
   * Muting an account
   * @param id ID of the target account
   * @return The target account's relationship
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#mutingunmuting-an-account
   */
  public muteAccount = (id: string, options?: Mastodon.MuteAccountOptions): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/mute`, options);
  }

  /**
   * Unmuting an account
   * @param id ID of the target account
   * @return The target account's relationship
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#mutingunmuting-an-account
   */
  public ummuteAccount = (id: string, options?: Mastodon.MuteAccountOptions): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/ummute`, options);
  }

  /**
   * Getting an account's relationships
   * @param options Query parameters
   * @return An array of Relationships of the current user to a list of given accounts.
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#getting-an-accounts-relationships
   */
  public getAccountRelationships = (options?: Mastodon.GetAccountRelationshipsOptions): Promise<Mastodon.Relationship[]|Mastodon.Error> => {
    return this._get(`/accounts/relationship`, options);
  }

  /**
   * Searching for accounts
   * - Will lookup an account remotely if the search term is in the `username@domain` format and not yet in the database.
   * @param q What to search for
   * @param options Query parameters
   * @return An array of matching accounts
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#searching-for-accounts
   */
  public searchAccounts = (q: string, options?: Mastodon.SearchAccountsOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get('/accounts/search', { q, ...options });
  }

  /**
   * Registering an application
   * - These values should be requested in the app itself from the API for each new app install + mastodon domain combo, and stored in the app for future requests.
   * @param options From data
   * @return Returns `id`, `client_id` and `client_secret` which can be used with OAuth authentication in your 3rd party app.
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#registering-an-application
   */
  public createApp = (options: Mastodon.CreateAppOptions): Promise<Mastodon.OAuth|Mastodon.Error> => {
    return this._post('/apps', options);
  }

  /**
   * Fetching a user's blocks
   * - Note: `max_id` and `since_id` for next and previous pages are provided in the Link header. It is not possible to use the id of the returned objects to construct your own URLs, because the results are sorted by an internal key.
   * @param options Query parameters
   * @return An array of accounts blocked by the atuhenticated user
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#fetching-a-users-blocks
   */
  public getBlocks = (options?: Mastodon.GetBlocksOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get('/blocks', options);
  }

  /**
   * Fetching a user's blocked domains
   * - Note: `max_id` and `since_id` for next and previous pages are provided in the Link header. It is not possible to use the id of the returned objects to construct your own URLs, because the results are sorted by an internal key.
   * @param options Query parameters
   * @return An array of strings
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#fetching-a-users-blocked-domains
   */
  public getDomainBlocks = (options?: Mastodon.GetDomainBlocksOptions): Promise<string[]|Mastodon.Error> => {
    return this._get('/domain_blocks', options);
  }

  /**
   * Blocking a domain
   * @param domain Domain to block
   * @return An empty object
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#blocking-a-domain
   */
  public blockDomain = (domain: string): Promise<{}|Mastodon.Error> => {
    return this._post('/domain_blocks', { domain });
  }

  /**
   * Unblocking a domain
   * @param domain Domain to unblock
   * @return An empty object
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#unblocking-a-domain
   */
  public unblockDomain = (domain: string): Promise<{}|Mastodon.Error> => {
    return this._delete('/domain_blocks', { domain });
  }

  /**
   * Fetching a user's favourites
   * - Note: `max_id` and `since_id` for next and previous pages are provided in the Link header. It is not possible to use the id of the returned objects to construct your own URLs, because the results are sorted by an internal key.
   * @param options Query parameters
   * @return Return an array of Statuses favourited by the authenticated user
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#fetching-a-users-favourites
   */
  public getFavourites = (options?: Mastodon.GetFavouritesOptions): Promise<Mastodon.Status[]|Mastodon.Error> => {
    return this._get('/favourites', options);
  }

  /**
   * Fetching a list of follow requests
   * - Note: `max_id` and `since_id` for next and previous pages are provided in the Link header. It is not possible to use the id of the returned objects to construct your own URLs, because the results are sorted by an internal key.
   * @param options Query parameters
   * @return Returns an array of Accounts which have requested to follow the authenticated user.
   * @see https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#fetching-a-list-of-follow-requests
   */
  public getFollowRequests = (options?: Mastodon.GetFollowRequestsOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get('/follow_requests', options);
  }

  /**
   *
   */
  public authorizeFollowRequest = (id: string): Promise<{}|Mastodon.Error> => {
    return this._post(`/follow_requests/${id}/authorize`);
  }

  public rejectFollowRequest = (id: string): Promise<{}|Mastodon.Error> => {
    return this._post(`/follow_requests/${id}/reject`);
  }

  public followAccountByUsername = (uri: string): Promise<Mastodon.Account|Mastodon.Error> => {
    return this._post('/follows', { uri });
  }

  public getInstance = (): Promise<Mastodon.Instance|Mastodon.Error> => {
    return this._get('/instance');
  }

  public getCustomEmojis = (): Promise<Mastodon.Emoji[]|Mastodon.Error> => {
    return this._get('/custom_emojis');
  }

  public getLists = (): Promise<Mastodon.List[]|Mastodon.Error> => {
    return this._get('/lists');
  }

  public getListByMembership = (id: string): Promise<Mastodon.List[]|Mastodon.Error> => {
    return this._get(`/lists/${id}/lists`);
  }

  public getAccountsByList = (id: string): Promise<Mastodon.List[]|Mastodon.Error> => {
    return this._get(`/list/${id}/accounts`);
  }

  public getList = (id: string): Promise<Mastodon.List|Mastodon.Error> => {
    return this._get(`/lists/${id}`);
  }

  public createList = (options: Mastodon.CreateListOptions): Promise<Mastodon.List|Mastodon.Error> => {
    return this._post('/lists', options);
  }

  public updateList = (id: string, options: Mastodon.UpdateListOptions): Promise<Mastodon.List|Mastodon.Error> => {
    return this._put(`/lists/${id}`, options);
  }

  public deleteList = (id: string): Promise<{}|Mastodon.Error> => {
    return this._delete(`/lists/${id}`);
  }

  public addAccountToList = (id: string, account_ids: string[]): Promise<{}|Mastodon.Error> => {
    return this._post(`/lists/${id}/accounts`, { account_ids });
  }

  public removeAccountFromList = (id: string, account_ids: string[]): Promise<{}|Mastodon.Error> => {
    return this._post(`/lists/${id}/accounts`, { account_ids });
  }

  public uploadMediaAttachment = (options: Mastodon.UploadMediaOptions): Promise<Mastodon.Attachment|Mastodon.Error> => {
    return this._post('/media', options, {headers: {'Content-Type': 'multipart/form-data'}});
  }

  public updateMediaAttachment = (id: string, options?: Mastodon.UpdateMediaOptions): Promise<Mastodon.Attachment|Mastodon.Error> => {
    return this._put(`/media/${id}`, options);
  }

  public getMutes = (options?: Mastodon.GetMutesOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get('/mutes', options);
  }

  public getNotifications = (options?: Mastodon.GetNotifications): Promise<Mastodon.Notification[]|Mastodon.Error> => {
    return this._get('/notifications', options);
  }

  public getNotification = (id: string): Promise<Mastodon.Notification|Mastodon.Error> => {
    return this._get(`/notifications/${id}`);
  }

  public clearNotifications = (): Promise<{}|Mastodon.Error> => {
    return this._post('/notifications/clear');
  }

  public dissmissNotification = (id: string): Promise<{}|Mastodon.Error> => {
    return this._post(`/notifications/dismiss`, { id });
  }

  public getReports = (): Promise<Mastodon.Report[]|Mastodon.Error> => {
    return this._post('/reports');
  }

  public reportUser = (options: Mastodon.ReportUserOptions): Promise<Mastodon.Report|Mastodon.Error> => {
    return this._post('/reports', options);
  }

  public search = (q: string, resolve = false ): Promise<Mastodon.Results|Mastodon.Error> => {
    return this._post('/search', { q, resolve });
  }

  public getStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._get(`/statuses/${id}`);
  }

  public getStatusContext = (id: string): Promise<Mastodon.Context|Mastodon.Error> => {
    return this._get(`/statuses/${id}/context`);
  }

  public getCard = (id: string): Promise<Mastodon.Card|Mastodon.Error> => {
    return this._get(`/statuses/${id}/card`);
  }

  public getWhoReblogged = (id: string, options: Mastodon.GetWhoRebloggedOptions): Promise<Mastodon.Account[]> => {
    return this._get(`/statuses/${id}/reblogged_by`, options);
  }

  public getWhoFavourited = (id: string, options: Mastodon.GetWhoFavouritedOptions): Promise<Mastodon.Account[]> => {
    return this._get(`/statuses/${id}/favourited_by`, options);
  }

  public createStatus = (status: string, options?: Mastodon.CreateStatusOptions): Promise<Mastodon.Status> => {
    return this._post(`/statuses`, {status, ...options});
  }

  public deleteStatus = (id: string): Promise<{}|Mastodon.Error> => {
    return this._delete(`/statuses/${id}`);
  }

  public reblogStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._post(`/statuses/${id}/reblog`);
  }

  public unreblogStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._post(`/statuses/${id}/unreblog`);
  }

  public favouriteStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._post(`/statuses/${id}/favourite`);
  }

  public unfavouriteStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._post(`/statuses/${id}/unfavourite`);
  }

  public pinStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._post(`/statuses/${id}/pin`);
  }

  public unpinStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._post(`/statuses/${id}/unpin`);
  }

  public muteStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._post(`/statuses/${id}/mute`);
  }

  public unmuteStatus = (id: string): Promise<Mastodon.Status|Mastodon.Error> => {
    return this._post(`/statuses/${id}/unmute`);
  }

  public getTimeline = (id: string, options?: Mastodon.GetTimelineOptions): Promise<Mastodon.Status[]|Mastodon.Error> => {
    return this._get(`/timelines/${id}`, options);
  }

  public getHomeTimeline = (options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/home`, options);

  public getCommunityTimeline = (options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/public`, { local: true, ...options});

  public getPublicTimeline = (options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/public`, options);

  public getTagTimeline = (id: string, options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/tag/${id}`, options);

  public getListTimeline = (id: string, options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/list/${id}`, options);

}
