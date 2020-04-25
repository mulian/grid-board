import { Injectable, OnInit } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { fromEvent, of, empty } from "rxjs"
import { map, filter, mergeMap, switchMap, tap, take } from "rxjs/operators"
import * as KeyCode from "keycode-js"
import { AppState } from "../reducers"
import { Store } from "@ngrx/store"
import { KeyboardState } from "./keyboard.state"
import { selectKeyboardState, selectKeyboardIsRecord } from "./keyboard.selector"
import { RelevantKeyboardEvent, KeyboardModel } from "./keyboard.model"
import { getKeyId } from "./keyboard.adapter"
import { recordKey, _upsertKey } from "./keyboard.actions"
import { navigateSelectTab, NavigationSelectTabType } from "../tab"

@Injectable()
export class KeyboardEffects {
    private currentKeyboardState: KeyboardState = null

    onKeyPress$ = createEffect(() =>
        fromEvent(document, "keydown").pipe(
            filter(() => !this.isKeyRecordActive()),
            map(event => event as KeyboardEvent),
            filter(this.isValidKeyPress),
            filter(this.isTargetNotTypeInField),
            map(event => this.getKeyEntity(event)),
            filter(keyboardEntity => keyboardEntity != null),
            switchMap(event => event.actions)
        )
    )

    // onRecord$ = createEffect(
    //     () => this.store.select(selectKeyboardIsRecord).pipe(filter(isRecordActive => isRecordActive),switchMap(() => {
    //         return fromEvent(document,"keydown").pipe(filter(this.isValidKeyPress),filter(this.isTargetNotTypeInField),map(event => event as KeyboardEvent),mergeMap((event) => {

    //         }))
    //     })),
    //     { dispatch: false }
    // )

    onRecordKey$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(recordKey),
                mergeMap(({ withActions }) => {
                    return fromEvent(document, "keydown").pipe(
                        filter(this.isValidKeyPress),
                        filter(this.isTargetNotTypeInField),
                        map(event => (event as KeyboardEvent) as RelevantKeyboardEvent),
                        tap(event => {
                            console.log(event)
                        }),
                        switchMap(event => {
                            return of(
                                _upsertKey({
                                    key: event,
                                    withActions,
                                })
                            )
                        }),
                        take(1)
                    )
                    return empty()
                })
            ),
        { dispatch: true }
    )

    constructor(private actions$: Actions, private store: Store<AppState>) {
        this.store.select(selectKeyboardState).subscribe(keyboardState => {
            console.log("set keyboard state", keyboardState)

            this.currentKeyboardState = keyboardState
        })
    }

    getKeyEntity(event: RelevantKeyboardEvent): KeyboardModel {
        return this.currentKeyboardState.entities[getKeyId(event)]
    }

    isKeyRecordActive(): boolean {
        return this.currentKeyboardState.isRecordActive
    }

    isTargetNotTypeInField(event: KeyboardEvent): boolean {
        let target: HTMLElement = event.target as HTMLElement

        if (target != null && (target.closest("input") || target.closest("div")?.getAttribute("contenteditable")))
            return false
        else return true
    }

    isValidKeyPress(event: KeyboardEvent): boolean {
        if (event.repeat) return false
        switch (event.keyCode) {
            case KeyCode.KEY_SHIFT:
            case KeyCode.KEY_CONTROL:
            case KeyCode.KEY_ALT:
            case KeyCode.KEY_CAPS_LOCK:
            case KeyCode.KEY_LEFT_CMD:
            case KeyCode.KEY_RIGHT_CMD:
                return false
            default:
                return true
        }
    }
}
