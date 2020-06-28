import { Component, OnDestroy } from '@angular/core';
import { TitleService } from './core/_services/common/title.service';
import { Subscription } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  subManager = new Subscription();

  constructor(public titleService: TitleService, private updates: SwUpdate) {
    this.subManager.add(
      updates.available.subscribe(event => {
        updates.activateUpdate().then(() => document.location.reload());
      })
    );
    this.titleService.init();
  }


  ngOnDestroy() {
    this.subManager.unsubscribe();
  }


}
