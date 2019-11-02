import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../states/tab';

interface WebView extends Element {
  src: string
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @Input()
  page:Page;

  constructor() { }

  ngOnInit() {
    console.log(this.page);
    
    const webview = document.querySelector('webview') as WebView

    webview.src = this.page.url; 
  }

}
