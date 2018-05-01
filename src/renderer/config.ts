export default {

  /** URL of the authorization server */
  server_url:     process.env.SERVER_URL || '',

  /** Type of the update channel */
  update_channel: process.env.UPDATE_CHANNEL || 'stable',

  /** Specify them to skip the authorization while developing */
  url:            (process.env.NODE_ENV !== 'production' && process.env.URL) || '',
  steraming_url:  (process.env.NODE_ENV !== 'production' && process.env.STREAMING_URL) || '',
  access_token:   (process.env.NODE_ENV !== 'production' && process.env.ACCESS_TOKEN) || '',
};
