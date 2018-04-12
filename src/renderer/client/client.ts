import * as Mastodon from '@/types/Mastodon';
import querystring from 'querystring';

export class Client {

  private url: string;
  private urlVersion: string;

  constructor () {
    this.url = '';
    this.urlVersion = '/api/v1';
  }

  private _request = (url: string, options?: RequestInit): Promise<any|Mastodon.Error> => {
    return fetch(url, options)
      .then((response) => response.json()).then((data) => data)
      .catch((error)   => error.json()).then((error) => error);
  }

  private _get = (path: string, params?: object, options?: RequestInit): Promise<any|Mastodon.Error> => {
    return this._request(`${this.getBaseUrl()}${path}?${querystring.stringify(params)}`, {
      method: 'GET',
      ...options,
    });
  }

  private _post = (path: string, body?: any, options?: RequestInit): Promise<any|Mastodon.Error> => {
    return this._request(`${this.getBaseUrl()}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  private _put = (path: string, body?: any, options?: RequestInit): Promise<any|Mastodon.Error> => {
    return this._request(`${this.getBaseUrl()}${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  private _delete = (path: string, body?: any, options?: RequestInit): Promise<any|Mastodon.Error> => {
    return this._request(`${this.getBaseUrl()}${path}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
      ...options,
    });
  }

  private _patch = (path: string, body?: any, options?: RequestInit): Promise<any|Mastodon.Error> => {
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

  public getAccountById = (id: string): Promise<Mastodon.Account|Mastodon.Error> => {
    return this._get(`/accounts/${id}`);
  }

  public verfiyCredentials = (): Promise<Mastodon.Credentials|Mastodon.Error> => {
    return this._get('/accounts/verify_credentials');
  }

  public updateCredentials = (options?: Mastodon.UpdateCredentialsOptions): Promise<Mastodon.Credentials|Mastodon.Error> => {
    return this._patch('/accounts/update_credentials', options, {headers: {'Content-Type': 'multipart/form-data'}});
  }

  public getAccountFollowers = (id: string, options?: Mastodon.GetAccountFollowersOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get(`/accounts/${id}/followers`, options);
  }

  public getAccountFollowing = (id: string, options?: Mastodon.GetAccountFollowingOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get(`/accounts/${id}/following`, options);
  }

  public getAccountStatuses = (id: string, options?: Mastodon.GetAccountStatusesOptions): Promise<Mastodon.Status[]|Mastodon.Error> => {
    return this._get(`/accounts/${id}/statuses`, options);
  }

  public followAccount = (id: string): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/follow`);
  }

  public unfollowAccount = (id: string): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/unfollow`);
  }

  public blockAccount = (id: string): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/block`);
  }

  public unblockAccount = (id: string): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/unblock`);
  }

  public muteAccount = (id: string, options?: Mastodon.MuteAccountOptions): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/mute`, options);
  }

  public ummuteAccount = (id: string, options?: Mastodon.MuteAccountOptions): Promise<Mastodon.Relationship|Mastodon.Error> => {
    return this._post(`/accounts/${id}/ummute`, options);
  }

  public getAccountRelationships = (options?: Mastodon.GetAccountRelationshipsOptions): Promise<Mastodon.Relationship[]|Mastodon.Error> => {
    return this._get(`/accounts/relationship`, options);
  }

  public searchAccounts = (q: string, options?: Mastodon.SearchAccountsOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get('/accounts/search', { q, ...options });
  }

  public createApp = (options: Mastodon.CreateAppOptions): Promise<Mastodon.OAuth|Mastodon.Error> => {
    return this._post('/apps', options);
  }

  public getBlocks = (options?: Mastodon.GetBlocksOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get('/blocks', options);
  }

  public getDomainBlocks = (options?: Mastodon.GetDomainBlocksOptions): Promise<string[]|Mastodon.Error> => {
    return this._get('/domain_blocks', options);
  }

  public blockDomain = (domain: string): Promise<{}|Mastodon.Error> => {
    return this._post('/domain_blocks', { domain });
  }

  public unblockDomain = (domain: string): Promise<{}|Mastodon.Error> => {
    return this._delete('/domain_blocks', { domain });
  }

  public getFavourites = (options?: Mastodon.GetFavouritesOptions): Promise<Mastodon.Status[]|Mastodon.Error> => {
    return this._get('/favourites', options);
  }

  public getFollowRequests = (options?: Mastodon.GetFollowRequestsOptions): Promise<Mastodon.Account[]|Mastodon.Error> => {
    return this._get('/follow_requests', options);
  }

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

  public getTimeline = (path: string, options?: Mastodon.GetTimelineOptions): Promise<Mastodon.Status[]|Mastodon.Error> => {
    return this._get(`/timelines/${path}`, options);
  }

  public getHomeTimeline = (options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/home`, options);

  public getCommunityTimeline = (options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/public`, { local: true, ...options});

  public getPublicTimeline = (options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/public`, options);

  public getTagTimeline = (id: string, options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/tag/${id}`, options);

  public getListTimeline = (id: string, options?: Mastodon.GetTimelineOptions) => this.getTimeline(`/timeline/list/${id}`, options);

}
