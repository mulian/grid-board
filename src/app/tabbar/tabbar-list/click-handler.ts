export default class ClickHandler<PayLoadType> {
    private timeOut=null;
    private callbackClick;
    private callbackDoubleClick;
    private payload:PayLoadType;
    private time:number = 200;
    private clickInc:number=0

    constructor() { }
    click(payload) {
        if(this.timeOut==null) {
            this.payload = payload;
            this.clickInc=1
            this.timeOut = setTimeout(() => {
                if(this.clickInc==1) {
                    this.callbackClick(payload)
                } else if (this.clickInc>1) {
                    this.callbackDoubleClick(payload)
                } else {
                    console.log("Click error");
                }
                this.reset()
            },
            this.time)
        } else {
            this.clickInc = this.clickInc+1
        }
    }
    private reset() {
        this.clickInc=0;
        this.timeOut=null;
    }
    
    onClick(callbackClick) {
        this.callbackClick = callbackClick
        return this;
    }
    onDoubleClick(callbackDoubleClick) {
        this.callbackDoubleClick = callbackDoubleClick
        return this;
    }
}