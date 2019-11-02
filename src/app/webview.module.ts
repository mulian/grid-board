import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: 'webview'
})

/** Dummy directive to allow html-tag 'webview' */
export class WebviewDirective implements OnInit {
    @Input()
    src:string
    constructor(private el: ElementRef<any>) {
        
    }

    ngOnInit() {
        console.log("set src:",this.src);
        
        this.el.nativeElement.src = this.src;
    }
}