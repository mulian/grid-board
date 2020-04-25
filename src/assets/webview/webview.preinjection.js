const { ipcRenderer } = require("electron")

var eventShowTab = document.createEvent("event")
eventShowTab.initEvent("tab-show", true, true)

var eventLeaveTab = document.createEvent("event")
eventLeaveTab.initEvent("tab-leave", true, true)

var eventPageIsFocus = document.createEvent("event")
eventPageIsFocus.initEvent("page-focus", true, true)

var eventPageLeaveFocus = document.createEvent("event")
eventPageLeaveFocus.initEvent("page-leave", true, true)

ipcRenderer.on("webviewdata", (event, webviewData) => {
    console.log("webviewdata", webviewData)
    window.scrollTo(webviewData.scrollX, webviewData.scrollY)
})

ipcRenderer.on("tab-show", event => {
    document.dispatchEvent(eventShowTab)
})
ipcRenderer.on("tab-leave", event => {
    document.dispatchEvent(eventLeaveTab)
})
ipcRenderer.on("page-focus", event => {
    document.dispatchEvent(eventPageIsFocus)
})
ipcRenderer.on("page-leave", event => {
    document.dispatchEvent(eventPageLeaveFocus)
})

let scroll = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
}
document.addEventListener("scroll", event => {
    let newScroll = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
    }
    if (scroll.scrollX != newScroll.scrollX || scroll.scrollY != newScroll.scrollY) {
        ipcRenderer.sendToHost("change_scroll", {
            scrollX: window.scrollX,
            scrollY: window.scrollY,
        })
        scroll = newScroll
    }
})

const availableKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"]
function isAvailableKey(key) {
    return key.length == 1 || _.includes(availableKeys, key)
}

document.addEventListener("keydown", event => {
    ipcRenderer.sendToHost("keydown-client", event)
})

console.log("hallo")

document.addEventListener("tab-show", event => {
    console.log("bingo tab-show")
})
document.addEventListener("tab-leave", event => {
    console.log("bingo tab-leave")
})
document.addEventListener("page-focus", event => {
    console.log("bingo page-focus")
})
document.addEventListener("page-leave", event => {
    console.log("bingo page-leave")
})
