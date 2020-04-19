import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"
import { Store, select } from "@ngrx/store"
import { AppState } from "../../../stores/reducers"
import { selectGeneralLang, ChangeLanguage } from "../../../stores/general"
import { Observable, Subscription } from "rxjs"
import * as _ from "lodash-es"

@Component({
    selector: "app-settings-general",
    templateUrl: "./settings-general.component.html",
    styleUrls: ["./settings-general.component.scss"],
})
export class SettingsGeneralComponent implements OnInit, OnDestroy {
    langSubscription: Subscription
    constructor(public translate: TranslateService, private store: Store<AppState>) {}
    selectedLang: string //selected lang from drop down (live)
    prevSelectedLang: string //prev selected from ngrx

    onChangeLang(language: string) {
        if (this.prevSelectedLang != language) this.store.dispatch(new ChangeLanguage({ lang: language }))
    }

    ngOnInit() {
        this.langSubscription = this.store.pipe(select(selectGeneralLang)).subscribe((lang: string) => {
            this.prevSelectedLang = lang
            if (this.selectedLang != lang) this.selectedLang = lang
        })
    }
    ngOnDestroy(): void {
        this.langSubscription.unsubscribe()
    }
}
