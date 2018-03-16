import { Component , OnInit} from '@angular/core';
import { TwitterService } from './twitter.service';
import { Tweet } from './tweet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TwitterService]
})
export class AppComponent implements OnInit {
  user;

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.twitter.user().subscribe(user => this.user = user.data);
  }
}
