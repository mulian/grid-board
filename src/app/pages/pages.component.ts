import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, getPagesFromCurrentTab } from '../states/reducers';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {
  pages$: Observable<any>;
  
  constructor(private store: Store<AppState>) { }

  ngAfterViewInit() {
    document.getElementById("pageTable").style.height = (document.documentElement.offsetHeight-20)+'px'
  }

  ngOnInit() {
    this.pages$ = this.store.pipe(select(getPagesFromCurrentTab));

    
  }

}
