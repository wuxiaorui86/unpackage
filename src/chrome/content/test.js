var unpackage = unpackage || {};

unpackage.Test = {
    case1:function(e){
        /*var win = unpackage.Utils.getTopWindow(),doc = win.document,*/
        /*var win = window,doc = document;*/
        var iframe = document.getElementById("contentiframe");
            targetDoc = iframe.contentDocument;
        scripts = targetDoc.getElementsByTagName('script');
        alert(scripts.length);
    }     
};
/*document.addEventListener("TestEvent",function(e){unpackage.Test.case1(e);},false,true);*/
