const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;

var EXPORTED_SYMBOLS = ['unpackageMod'],
    unpackageMod = unpackageMod || {};

/*Nginx Switch*/
unpackageMod.Nginx = {
    _status:0,
    get status(){return this._status},
    setStatus:function(v){
        this._status = v;
        /*observerService.notifyObservers(null,'unpackage-nginx','hello');*/
    }
};
/*httpRequestObserver*/
/*unpackageMod.RequestObserver = {
    init:function(){
        this.observers = [];
        this.observersCount = 0;
    },
    registerObserver:function(){
        observerService.addObserver(this,'unpackage-nginx',false);
    },
    observe:function(subject,topic,data){
        window.alert(data);
    },
    addObserver:function(observer,topic,weak){
        this.observers.push(observer);
    },
    removeObserver:function(observer, topic){
        for (var i=0;i<this.observers.length;i++) {
            if (this.observers[i] == observer) {
                this.observers.splice(i,1);
                return;
            };
        };
    },
    notifyObservers: function(subject,topic,data) {
        for (var i=0; i<this.observers.length;i++){
            this.observers[i].observe(subject,topic,data);
        };
    }
};*/

/*launch*/
/*unpackageMod.RequestObserver.init();
unpackageMod.RequestObserver.registerObserver();*/
