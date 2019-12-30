import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { TabbarComponent } from './tabbar/tabbar.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './states/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MainComponent } from './main/main.component';
import { WebviewDirective } from './webview.module';
import { ContentComponent } from './content/content.component';
import { TabbarItemComponent } from './tabbar/tabbar-item/tabbar-item.component';
import { TabbarListComponent } from './tabbar/tabbar-list/tabbar-list.component';
import { TabbarItemEditComponent } from './tabbar/tabbar-item-edit/tabbar-item-edit.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { metaReducer } from './states/reducer.store';
library.add(fas);

import { GridsterModule } from 'angular-gridster2';
import { GridsComponent } from './content/grids/grids.component';
import { GridItemComponent } from './content/grid-item/grid-item.component';

import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddressbarComponent } from './content/addressbar/addressbar.component';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { HelpComponent } from './dialogs/help/help.component';
import { SlideProgressComponent } from './slide/slide-progress/slide-progress.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SlideService } from './slide/slide.service';
import { DialogSettingsComponent } from './dialogs/dialog-settings/dialog-settings.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SettingsGeneralComponent } from './dialogs/dialog-settings/settings-general/settings-general.component';
import { SettingsSlideComponent } from './dialogs/dialog-settings/settings-slide/settings-slide.component';
import { SettingsHistoryComponent } from './dialogs/dialog-settings/settings-history/settings-history.component';
import { SettingsKeyboardComponent } from './dialogs/dialog-settings/settings-keyboard/settings-keyboard.component';
import { SettingsJsinjectionsComponent } from './dialogs/dialog-settings/settings-jsinjections/settings-jsinjections.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
  declarations: [AppComponent, TabbarListComponent, TabbarComponent, MainComponent, WebviewDirective, ContentComponent, TabbarItemComponent, TabbarItemEditComponent, GridsComponent, GridItemComponent, AddressbarComponent, MenuComponent, HelpComponent, SlideProgressComponent, DialogSettingsComponent, SettingsGeneralComponent, SettingsSlideComponent, SettingsHistoryComponent, SettingsKeyboardComponent, SettingsJsinjectionsComponent],
  imports: [
    MatTreeModule,
    MatExpansionModule,
    MatSliderModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatToolbarModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    DragDropModule,
    GridsterModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, { metaReducers: metaReducer }),
    StoreDevtoolsModule.instrument({     // Required for ReduxDevTools
      maxAge: 25                         // Track history for 25 actions
    }),
    BrowserAnimationsModule
    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true
    //   }
    // })
  ],
  entryComponents: [
    HelpComponent, DialogSettingsComponent
  ],
  providers: [SlideService],
  bootstrap: [AppComponent]
})
export class AppModule { }
