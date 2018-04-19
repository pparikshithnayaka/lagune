const { env } = process;

export default {

  /** URL of authorization server */
  server_url:     env.SERVER_URL || '',

  /** Type of update channel */
  update_channel: env.UPDATE_CHANNEL || 'stable',

  /** Specify to skip authorization while developing */
  url:            (env.NODE_ENV !== 'production' && env.URL) || '',
  steraming_url:  (env.NODE_ENV !== 'production' && env.STREAMING_URL) || '',
  access_token:   (env.NODE_ENV !== 'production' && env.ACCESS_TOKEN) || '',
};
