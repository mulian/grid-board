import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, getPagesFromCurrentTab } from '../states/reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  pages$: Observable<any>;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.pages$ = this.store.pipe(select(getPagesFromCurrentTab));
  }

}
