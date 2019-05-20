const {Services} = ChromeUtils.import("resource://gre/modules/Services.jsm");

var windowLoadObserver = {
    observe: function(aSubject, aTopic, aData) {
        var window = aSubject;
        var document = window.document;
        if (!document.location || document.location.protocol != "chrome:") {
            return;
        }
        var file = Services.dirsvc.get("UChrm", Components.interfaces.nsIFile);
        file.append("userChrome.js");
        if (! file.exists()) {
            return;
        }
        var url = Services.io.getProtocolHandler("file").
            QueryInterface(Components.interfaces.nsIFileProtocolHandler).
            getURLSpecFromFile(file);
        Services.scriptloader.loadSubScriptWithOptions(url, {
            target: document.defaultView,
            charset: "UTF-8",
            ignoreCache: true
        });
    }
}

function startup() {
    Services.obs.addObserver(windowLoadObserver, "mail-startup-done", false);
}

function shutdown() {
    Services.obs.removeObserver(windowLoadObserver, "mail-startup-done");
}

function install() {
    var windows = Services.wm.getEnumerator("mail:3pane");
    while (windows.hasMoreElements()) {
        windowLoadObserver.observe(
            windows.getNext(), "mail-startup-done", null);
    }
}

function uninstall() {
}
