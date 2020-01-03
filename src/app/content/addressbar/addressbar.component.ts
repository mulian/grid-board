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

  isPageActiv: boolean = false

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(selectActivePage)).subscribe((currentActivePage: string) => {
      if (this.item.id == currentActivePage) this.isPageActiv = true
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

  updatePage(changes: Partial<PageModel>) {
    this.store.dispatch(new UpdatePage({
      page: {
        id: this.item.id,
        changes
      }
    }))
  }

  zoomIn() {
    this.updatePage({
      webviewData: {
        zoomFactor: 1,
        zoomLevel: this.item.webviewData.zoomLevel + 0.2,
        isDeveloperConsoleVisible: this.item.webviewData.isDeveloperConsoleVisible
      }
    })
  }
  zoomOut() {
    this.updatePage({
      webviewData: {
        zoomFactor: 1,
        zoomLevel: this.item.webviewData.zoomLevel - 0.2,
        isDeveloperConsoleVisible: this.item.webviewData.isDeveloperConsoleVisible
      }
    })
  }
  zoomReset() {
    this.updatePage({
      webviewData: {
        zoomFactor: 0,
        zoomLevel: 0,
        isDeveloperConsoleVisible: this.item.webviewData.isDeveloperConsoleVisible
      }
    })
  }

  openDevToggle() {
    this.updatePage({
      webviewData: {
        zoomFactor: this.item.webviewData.zoomFactor,
        zoomLevel: this.item.webviewData.zoomLevel,
        isDeveloperConsoleVisible: !this.item.webviewData.isDeveloperConsoleVisible,
      }
    })
  }

  reloadPage() {
    this.updatePage({ reload: true })
  }
  back() {
    this.updatePage({ back: true })
  }
  forward() {
    this.updatePage({ forward: true })
  }

  toggleAddressbar() {
    this.updatePage({ addressbarOpen: !this.item.addressbarOpen })
  }

  showAdditionalOptions() {
    this.updatePage({ isAdditionAddressbarOptionsOpen: !this.item.isAdditionAddressbarOptionsOpen })
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

      this.updatePage({
        url: url,
        urlChangeFromWebview: false
      })
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
