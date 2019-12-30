import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-jsinjections',
  templateUrl: './settings-jsinjections.component.html',
  styleUrls: ['./settings-jsinjections.component.scss']
})
export class SettingsJsinjectionsComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }

}
