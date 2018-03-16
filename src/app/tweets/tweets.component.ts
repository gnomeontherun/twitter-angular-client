import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Tweet } from '../tweet';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit, OnDestroy {
  inflight = false;
  tweets: Tweet[] = [];
  ids = [];
  timer;
  since = '';

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.getTweets();
    this.timer = setInterval(() => this.getTweets(), 61000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getTweets() {
    this.twitter.home(this.since).subscribe(tweets => {
      tweets.data.reverse().forEach(tweet => {
        if (this.ids.indexOf(tweet.id_str) < 0) {
          this.ids.push(tweet.id_str);
          this.tweets.unshift(tweet);
        }
      });
      this.since = this.tweets[0].id_str;
      this.cleanUp();
    });
  }

  cleanUp() {
    if (this.tweets.length > 1000) {
      this.tweets.splice(1000);
      this.ids.splice(1000);
    }
  }

  action(action, index) {
    if (this.inflight) {
      return;
    }

    const stateKey = action.property === 'favorite' ? 'favorited' : 'retweeted';
    const newState = !action.tweet[stateKey];

    this.inflight = true;
    this.twitter.action(action.property, action.tweet.id_str, newState).subscribe(tweet => {
      this.tweets[index][stateKey] = newState;
      this.tweets[index][action.property + '_count'] += newState ? 1 : -1;
      this.inflight = false;
    });
  }
}
