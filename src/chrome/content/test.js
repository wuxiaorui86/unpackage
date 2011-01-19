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
    }
};
/*document.addEventListener("TestEvent",function(e){unpackage.Test.case1(e);},false,true);*/
/*window.addEventListener('load',unpackage.Test.case2,false);*/

/*unpackage.Test2 = {
  _observerService : null,
  init : function() {
    this._observerService = Components.classes["@mozilla.org/observer-service;1"].
       getService(Components.interfaces.nsIObserverService);
    this._observerService.addObserver(this, "xulschoolhello-test-topic", false);
  },
  uninit : function() {
    this._observerService.removeObserver(
      this, "xulschoolhello-test-topic");
  },
  observe : function(aSubject, aTopic, aData) {
    if (aTopic == "xulschoolhello-test-topic") {
      aSubject.QueryInterface(Components.interfaces.nsISupportsString);
      window.alert("Subject: " + aSubject.data);  // => "This is a test"
      window.alert("Data: " + aData);  // => "Hello"
    }
  }
}

window.addEventListener(
  "load", function() { unpackage.Test2.init(); }, false);
window.addEventListener(
  "unload", function() { unpackage.Test2.uninit(); }, false);*/
