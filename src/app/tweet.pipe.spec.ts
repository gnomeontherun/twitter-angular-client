import { TweetPipe } from './tweet.pipe';
import { DomSanitizer } from '@angular/platform-browser';
const tweets = require('../assets/tweets.spec.json');

class Sanitizer {
  bypassSecurityTrustHtml(text) {
    return text;
  }
};

fdescribe('TweetPipe', () => {
  let pipe, sanitizer;

  beforeEach(() => {
    sanitizer = new Sanitizer() as DomSanitizer;
    pipe = new TweetPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should process URLs', () => {
    expect(pipe.transform(tweets.url)).toContain(`<a href="https://t.co/dnF7CwsmGf" target="_blank">sb.gl/2FvQD88</a>`);
  });

  it('should process mentions', () => {
    console.log(pipe.transform(tweets.mentions))
    expect(pipe.transform(tweets.mentions)).toContain(`<a href`);
  });
});
