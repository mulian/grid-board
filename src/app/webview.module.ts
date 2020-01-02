import { Directive, Input, ElementRef, OnInit, OnChanges } from '@angular/core';

@Directive({
    selector: 'webview'
})

/** Dummy directive to allow html-tag 'webview' */
export class WebviewDirective implements OnInit, OnChanges {
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        console.log("changes webview");
        this.el.nativeElement.src = this.src;
    }
    @Input()
    src:string
    @Input()
    useragent:string

    constructor(private el: ElementRef<any>) {
        
    }

    ngOnInit() {
        console.log("set src:",this.src);
        
        this.el.nativeElement.src = this.src;
        if(this.el.nativeElement.useragent!=null) this.el.nativeElement.useragent = this.useragent;
    }

    setZoomFactor(factor:number) {
        console.log("factor:",factor);
        
    }
}