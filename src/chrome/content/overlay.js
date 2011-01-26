unpackage.UI = {
    initialized:false,
    _observerService : null,
    observe : function(subject,topic,data) {
        window.alert("Data: " + data);
    },
    onOptionsDialog:function() {
        unpackage.Utils.onDialog('unpackage-options','chrome://unpackage/content/options.xul',null,null);
    },
    onSBClick:function(evt){
        evt.preventDefault();
        if (evt.button === 0) {
            unpackage.Utils.onDialog('unpackage-options','chrome://unpackage/content/options.xul',null,null);
        };
    },
    onNginx:function(e){
        var target = e.target,status = target.id === 'unpackage-nginx-enabled' ? 1 : 0; 
        /*unpackageMod.Nginx.setStatus(status);
        this._observerService.notifyObservers(null,"xulschoolhello-test-topic","hello");*/
    },
    onUnpacker:function(e){
    },
    onConf:function(e){
    },
    onLoad: function() {
        this.initialized = true;
        this._observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
        this._observerService.addObserver(this, "xulschoolhello-test-topic", false);
    },
    onUnload:function(){
        this.initialized = false;
        this._observerService.removeObserver(this, "xulschoolhello-test-topic");
    }
};

window.addEventListener("load",function(){unpackage.UI.onLoad();}, false);
window.addEventListener("unload",function(){unpackage.UI.onUnload();}, false);
