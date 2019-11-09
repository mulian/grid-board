import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../states/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  tabData$:Observable<any>

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.tabData$ = this.store.pipe(select(getTab));
  }
}
