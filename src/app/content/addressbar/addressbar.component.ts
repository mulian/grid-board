import { Component, OnInit, Input } from '@angular/core';
import { Update } from '@ngrx/entity';
import { UpdatePage, PageModel, DeletePage, selectActivePage } from '../../states/page';
import { AppState } from '../../states/reducers';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash-es'
import * as encodeUrl from 'encodeurl'

@Component({
  selector: 'app-addressbar',
  templateUrl: './addressbar.component.html',
  styleUrls: ['./addressbar.component.scss']
})
export class AddressbarComponent implements OnInit {
  @Input() item
  @Input() callbacks
  @Input() webview

  isPageActiv:boolean = false

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(selectActivePage)).subscribe((currentActivePage:string) => {
      if(this.item.id == currentActivePage) this.isPageActiv = true
      else this.isPageActiv = false
    })
  }

  selectAll(target) {
    let selection: Selection = window.getSelection()
    let range = document.createRange()
    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  zoomIn() {
    console.log("zoomIn");
    this.store.dispatch(new UpdatePage({
      page: {
        id: this.item.id,
        changes: {
          webviewData: {
            zoomFactor: 1,
            zoomLevel: this.item.webviewData.zoomLevel + 0.2,
          }
        }
      }
    }))
  }
  zoomOut() {
    console.log("zoomOut");
    
    this.store.dispatch(new UpdatePage({
      page: {
        id: this.item.id,
        changes: {
          webviewData: {
            zoomFactor: 1,
            zoomLevel: this.item.webviewData.zoomLevel - 0.2,
          }
        }
      }
    }))
  }
  zoomReset() {
    this.store.dispatch(new UpdatePage({
      page: {
        id: this.item.id,
        changes: {
          webviewData: {
            zoomFactor: 0,
            zoomLevel: 0,
          }
        }
      }
    }))
  }

  reloadPage() {
    let update: Update<PageModel> = {
      id: this.item.id,
      changes: {
        reload: true
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
  }
  back() {
    let update: Update<PageModel> = {
      id: this.item.id,
      changes: {
        back: true
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
  }
  forward() {
    let update: Update<PageModel> = {
      id: this.item.id,
      changes: {
        forward: true
      }
    }
    this.store.dispatch(new UpdatePage({ page: update }))
  }

  toggleAddressbar() {
    this.store.dispatch(new UpdatePage({
      page: {
        id: this.item.id,
        changes: {
          addressbarOpen: !this.item.addressbarOpen
        }
      }
    }))
  }

  showAdditionalOptions() {
    this.store.dispatch(new UpdatePage({
      page: {
        id: this.item.id,
        changes: {
          isAdditionAddressbarOptionsOpen: !this.item.isAdditionAddressbarOptionsOpen
        }
      }
    }))
  }

  private urlPrefix: RegExp = /^https?:\/\//
  private urlPostFix: RegExp = /\.[a-zA-Z]{2,3}/
  private autoUpdateUrl(url: string): string {
    if (!this.urlPrefix.test(url)) {
      if (!this.urlPostFix.test(url)) { //if pre and postfix is wrong search on google
        url = "http://google.de/search?q=" + encodeUrl(url)
      } else { //if only prefix is wrong, add http:// prefex to url
        url = "http://" + url
      }
    }
    return url
  }
  changePage(url: string) {
    if (url != this.item.url) {
      url = this.autoUpdateUrl(url)
      let update: Update<PageModel> = {
        id: this.item.id,
        changes: {
          url: url,
          urlChangeFromWebview: false
        }
      }
      this.store.dispatch(new UpdatePage({ page: update }))
    }
  }
  changePageWithEvent(value: string, event) {
    event.preventDefault()
    event.stopPropagation()
    this.changePage(value)
  }

  removePage(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    this.store.dispatch(new DeletePage({ id: this.item.id }))
    this.item.isDeleted = true
  }
}
