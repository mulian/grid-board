import { Injectable } from "@angular/core"
import { Actions, createEffect } from "@ngrx/effects"

@Injectable()
export class TabEffects {
    constructor(private actions$: Actions) {}
}
