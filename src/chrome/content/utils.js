Components.utils.import('resource://unpackage/core.js');
var unpackage = unpackage || {};

unpackage.Utils = {
    merge:function(source,target){
        
    },
    getWindow:function(){
        var ret = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                       .getInterface(Components.interfaces.nsIWebNavigation)
                       .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                       .rootTreeItem
                       .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                       .getInterface(Components.interfaces.nsIDOMWindow); 
        return ret;
    },
    getCurrentTab:function(){

    },
    findWindow:function(id) {
        var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator),
            win0 = windowManager.getMostRecentWindow(id),enumerator,win1,winID;

        if (win0) {
            enumerator = windowManager.getEnumerator(null);
            while (enumerator.hasMoreElements()) {
                win1 = enumerator.getNext();
                winID = win1.document.documentElement.id;
                if (winID == "commonDialog" && win1.opener == win0){return win1;};
            }
            return win0;
        }
        return null;
    },
    onDialog:function(id,xulFile,args,parms,idToClose) {
        var wnd = this.findWindow(id);
        if (wnd) {
            try {
                wnd.focus();
            }catch(e){
                wnd.getAttentionWithCycleCount(4);
            };
        } else {
            if (idToClose) {
                wnd = this.findWindow(idToClose); 
                wnd && wnd.close();
            };
            window.openDialog(xulFile, "", "minimizable,dialog,chrome,resizable=yes" + (args?(","+args):""), parms).focus();
        };
    },
    openTab:function(url){

    }
}
