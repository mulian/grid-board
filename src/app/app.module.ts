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
import { initialState, reducers } from './states/reducers';
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

import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, TabbarListComponent, TabbarComponent, MainComponent, WebviewDirective, ContentComponent, TabbarItemComponent, TabbarItemEditComponent, GridsComponent, GridItemComponent],
  imports: [
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
