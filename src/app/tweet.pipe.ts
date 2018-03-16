import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { Tweet } from './tweet';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'tweet'
})
export class TweetPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(tweet: Tweet, args?: any): any {
    let text = this.sanitizer.sanitize(SecurityContext.NONE, tweet.full_text);

    // Replace screen names with links
    if (tweet.entities.user_mentions) {
      tweet.entities.user_mentions.forEach(mention => {
        text = text.replace(new RegExp(`@${mention.screen_name}`, 'gi'), `<a href="https://twitter.com/${mention.screen_name}" target="_blank">@${mention.screen_name}</a>`);
      });
    }

    // Replace links with clickable links
    if (tweet.entities.urls) {
      tweet.entities.urls.forEach(url => {
        text = text.replace(url.url, `<a href="${url.url}" target="_blank">${url.display_url}</a>`);
      });
    }
    
    // Remove media urls since we display them
    if (tweet.entities.media) {
      tweet.entities.media.forEach(url => {
        text = text.replace(url.url, '');
      });
    }

    // Replace newline characters
    text = text.replace(/\n/gm, '<br />');

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

}
