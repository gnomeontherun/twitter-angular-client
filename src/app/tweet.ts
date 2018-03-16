export class Tweet {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  full_text: string;
  entities: {
    hashtags: any[];
    symbols: any[];
    media: {
      id: number;
      media_url_https: string;
      url: string;
      type: 'photo' | 'video';
      expanded_url: string;
      sizes: {
        thumb: {
          w: number;
          h: number;
          resize: 'fit' | 'crop';
        };
      };
    }[];
    urls: {
      display_url: string;
      expanded_url: string;
      url: string;
    }[];
    user_mentions: {
      screen_name: string;
      name: string;
      id: number;
    }[];
  };
  source: string;
  in_reply_to_status_id: number;
  in_reply_to_user_id: number;
  in_reply_to_screen_name: string;
  user: {
    id: number;
    name: string;
    screen_name: string;
    location: string;
    description: string;
    url: string;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    created_at: string;
    favourites_count: number;
    utc_offset: number;
    time_zone: string;
    verified: boolean;
    statuses_count: number;
    lang: string;
    profile_image_url_https: string;
    following: boolean;
    follow_request_sent: boolean;
  };
  retweet_count: number;
  favorited: boolean;
  retweeted: boolean;
  lang: string;
  retweet_status: Tweet;
}
