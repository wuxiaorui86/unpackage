unpackage.UI = {
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

        switch(status) {
            case 0:
                break;
            case 1:
                break;
            default:
                break;
        };

        unpackageMod.Nginx.setStatus(status);
    },
    onUnpacker:function(e){
    },
    onConf:function(e){
    },
    onLoad: function() {
        this.initialized = true;
    },
    onUnload:function(){
        this.initialized = false;
    }
};

window.addEventListener("load", unpackage.UI.onLoad, false);
window.addEventListener("unload", unpackage.UI.onUnload, false);
