var unpackage = {
    findWindow:function(id) {
        var windowManager =
            Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator);
        var win0 =
            windowManager.getMostRecentWindow(id);

        if (win0) {
            var enumerator = windowManager.getEnumerator(null);
            while (enumerator.hasMoreElements()) {
                var win1 = enumerator.getNext();
                var winID = win1.document.documentElement.id;
                if (winID == "commonDialog" && win1.opener == win0)
                    return win1;
            }
            return win0;
        }
        return null;
    },
    onOptionsDialog:function() {
        this.onDialog("unpackage-options","chrome://unpackage/content/options.xul",null,null);
    },
    onSBClick:function(evt){
        evt.preventDefault();
        if (evt.button === 0) {
            this.onDialog("unpackage-options","chrome://unpackage/content/options.xul",null,null);
        };
    },
    onDialog:function(id,xulFile,args,parms,idToClose) {
        var wnd = this.findWindow(id);
        if (wnd) {
            try {
                wnd.focus();
            }catch(e){
                wnd.getAttentionWithCycleCount(4);
            }
        } else {
            if (idToClose) {
                var wnd = foxyproxy.findWindow(idToClose); 
                wnd && wnd.close();
            }
            window.openDialog(xulFile, "", "minimizable,dialog,chrome,resizable=yes" + (args?(","+args):""), parms).focus();
        }
    },
    onLoad: function() {
        this.initialized = true;
        this.strings = document.getElementById("unpackage-strings");
    },
    onMenuItemCommand: function(e) {
        var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
        .getService(Components.interfaces.nsIPromptService);
        promptService.alert(window, this.strings.getString("helloMessageTitle"),
            this.strings.getString("helloMessage"));
    },
    onToolbarButtonCommand: function(e) {
        // just reuse the function above.  you can change this, obviously!
        unpackage.onMenuItemCommand(e);
    }
};

window.addEventListener("load", unpackage.onLoad, false);
