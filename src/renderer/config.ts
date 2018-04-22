export default {

  /** URL of authorization server */
  server_url:     process.env.SERVER_URL || '',

  /** Type of update channel */
  update_channel: process.env.UPDATE_CHANNEL || 'stable',

  /** Specify to skip authorization while developing */
  url:            (process.env.NODE_ENV !== 'production' && process.env.URL) || '',
  steraming_url:  (process.env.NODE_ENV !== 'production' && process.env.STREAMING_URL) || '',
  access_token:   (process.env.NODE_ENV !== 'production' && process.env.ACCESS_TOKEN) || '',
};
