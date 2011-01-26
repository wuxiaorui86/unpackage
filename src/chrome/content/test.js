var unpackage = unpackage || {};

unpackage.Test = {
    observerService:null,
    case1:function(e){
        /*var win = unpackage.Utils.getTopWindow(),doc = win.document,*/
        /*var win = window,doc = document;*/
        var iframe = document.getElementById("contentiframe");
            targetDoc = iframe.contentDocument;
        scripts = targetDoc.getElementsByTagName('script');
        alert(scripts.length);
    },
    observe : function(aSubject, aTopic, aData) {
        if (aTopic == "xulschoolhello-test-topic") {
            window.alert("Data received: " + aData);
        }
    },
    case2:function(){
        var self = this,observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
        observerService.addObserver(self, "xulschoolhello-test-topic", false);
        observerService.notifyObservers(null, "xulschoolhello-test-topic", "hello");
    },
    case3:function(){
        /*gBrowser.selectedTab = gBrowser.addTab("http://www.google.com/");*/
        var doc = gBrowser.contentDocument,scripts = doc.getElementsByTagName('script');
        alert(scripts.length);
    },
    onTest:function(event){
        this.case3(event);
    }
};
/*document.addEventListener("TestEvent",function(e){unpackage.Test.case1(e);},false,true);*/
/*window.addEventListener('load',function(){unpackage.Test.case3();},false);*/
