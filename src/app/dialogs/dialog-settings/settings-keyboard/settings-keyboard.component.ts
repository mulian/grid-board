import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-keyboard',
  templateUrl: './settings-keyboard.component.html',
  styleUrls: ['./settings-keyboard.component.scss']
})
export class SettingsKeyboardComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }

}
