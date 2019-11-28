import { Component, OnInit, Input } from '@angular/core';
import { Update } from '@ngrx/entity';
import { UpdatePage, Page, DeletePage } from '../../states/page';
import { AppState } from '../../states/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-addressbar',
  templateUrl: './addressbar.component.html',
  styleUrls: ['./addressbar.component.scss']
})
export class AddressbarComponent implements OnInit {
  @Input() item
  @Input() callbacks
  @Input() webview
  constructor(private store: Store<AppState>) { }

  showAddressbar: boolean = false

  ngOnInit() {
  }

  reloadPage() {
    let update: Update<Page> = {
      id: this.item.id,
      changes: {
        reload:true
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
  }
  back() {
    let update: Update<Page> = {
      id: this.item.id,
      changes: {
        back:true
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
  }
  forward() {
    let update: Update<Page> = {
      id: this.item.id,
      changes: {
        forward:true
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
  }

  toggleAddressbar() {
    this.showAddressbar = !this.showAddressbar
  }
  changePage(url:string) {
    if (url != this.item.url) {
      let update: Update<Page> = {
        id: this.item.id,
        changes: {
          url: url,
          urlChangeFromWebview: false
        }
      }
      this.store.dispatch(new UpdatePage({ page: update }))
    }
  }
  keypress(event) {
    event.preventDefault()
    event.stopPropagation()
    console.log(event.target.innerHTML);
    this.changePage(event.target.innerHTML)
  }
  onBlur(value: string, event) {
    event.preventDefault()
    event.stopPropagation()
    console.log(event.target.innerHTML);
    this.changePage(event.target.innerHTML)
  }
  removePage(event:Event) {
    event.preventDefault()
    event.stopPropagation()
    this.store.dispatch(new DeletePage({ id: this.item.id }))
    this.item.isDeleted = true
  }
}
