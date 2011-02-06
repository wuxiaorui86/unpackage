
FBL.ns(function() {with(FBL){ 
    const Cc = Components.classes;
    const Ci = Components.interfaces;
    const Cr = Components.results;

    const panelName = 'unpackage';
    const prefDomain = Firebug.prefDomain + '.' + panelName;

    var cache = Cc["@mozilla.org/network/cache-service;1"].getService(Ci.nsICacheService),
        prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch2),
        PrefService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService);

    /*utils*/
    var utils = {
        str:function(s){
            return $STR(s,'unpackage-strings');
        },
        strformat:function(s,arg){
            return $STRF(s,arg,'unpackage-strings');
        },
        setPref:function(name,value){
            return Firebug.setPref(prefDomain,name,value);
        },
        getPref:function(name,value){
            return Firebug.getPref(prefDomain,name); 
        },
        optionMenu:function(context,label,option){
            var value = this.getPref(option);
            return {label:this.str(label),nol10n:true,type:'checkbox',checked:value,command:bindFixed(this.setPref,this,option,!value)};
        }
    };
    /*ovservers*/
    var SwitchObserver,SplitObserver,UnpackObserver,HttpObserver;
    HttpObserver = {

    };
    SwitchObserver = {

    };
    SplitObserver = {

    };
    UnpackObserver = {

    };
    /*rep*/
    var Templates = {
        Dashboard:domplate(Firebug.Rep,new Firebug.Listener(),{
                
        }),
        Test:domplate(Firebug.Rep,{
            tag: DIV({style: "padding-left: 20px"},
                    H2("My Activable Panel"),
                    SPAN("Now activated!")
                )
        })
    }; 
    /*module*/
    Firebug.Unpackage = extend(Firebug.ActivableModule,{
        showPanel:function(browser,panel){
        },
        initialize:function(){
            Firebug.ActivableModule.initialize.apply(this, arguments);

            if (FBTrace.DBG_UNPACKAGE)
                FBTrace.sysout("ActivableModule.initialize;");
        },
        internationalizeUI:function(doc){
            var elements = [
                    'unpackage_panel_refresh',
                    'unpackage_panel_dashboard',
                    'unpackage_panel_switch',
                    'unpackage_panel_split',
                    'unpackage_panel_build',
                    'unpackage_panel_tools',
                    'unpackage_tools_options',
                    'unpackage_tools_export',
                    'unpackage_tools_import',
                    'unpackage_tools_help',
                    'unpackage_tools_about'
                ],
                attributes = ["label", "tooltiptext"];

            FBL.internationalizeElements(doc,elements,attributes);
        },
        shutdown: function(){
            Firebug.ActivableModule..shutdown.apply(this, arguments);

            if (FBTrace.DBG_UNPACKAGE)
                FBTrace.sysout("ActivableModule.shutdown;");
        },
        onAction: function(){
            alert("Hello from my activable panel!");
        },
        onObserverChange: function(observer){
            if (FBTrace.DBG_UNPACKAGE)
                FBTrace.sysout("ActivableModule.onObserverChange;");

            if (this.hasObservers()){

            } else {
                // There are no observer using this model, let's clean up registered hooks.
            }
        },
        onSuspendFirebug: function(context){
            if (FBTrace.DBG_UNPACKAGE)
                FBTrace.sysout("ActivableModule.onSuspendFirebug;");
        },
        // Called before any suspend actions. Firest caller to return true aborts suspend.
        onSuspendingFirebug: function(){
            if (FBTrace.DBG_UNPACKAGE)
                FBTrace.sysout("ActivableModule.onSuspendingFirebug;");
        },
        onResumeFirebug: function(context){
            if (FBTrace.DBG_UNPACKAGE)
                FBTrace.sysout("ActivableModule.onResumeFirebug;");
        }
    });
    /*panel*/
    Firebug.UnpackagePanel = function UnpackagePanel(){};
    Firebug.UnpackagePanel.prototype = extend(Firebug.ActivablePanel,{
        name:panelName,
        title:utils.str('unpackage.panel.unpackage'),
        initialize:function(){
            Firebug.ActivablePanel.initialize.apply(this,arguments);

            if (FBTrace.DBG_UNPACKAGE){
                FBTrace.sysout("ActivablePanel.initialize;");
            };

            Templates.Test.tag.replace({},this.panelNode);
        }, 
        initializeUI:function(){
            Firebug.ActivablePanel.initializeUI.apply(this,arguments);
        },
        onActivationChanged:function(enable){
            if (FBTrace.DBG_UNPACKAGE){
                FBTrace.sysout("unpackagePanel.onActivationChanged; " + enable);
            };

            if (enable){
                Firebug.Unpackage.addObserver(this);
            } else {
                Firebug.Unpackage.removeObserver(this); 
            };
        },
        getOptionsMenuItems:function(context) {
            return [
                utils.optionMenu(context,'unpackage.switch.label','option.switch'),
                utils.optionMenu(context,'unpackage.split.label','option.split'),
                utils.optionMenu(context,'unpackage.build.label','option.build')
            ];
        },
        show: function(state) {
            Firebug.ActivablePanel.show.apply(this,arguments);
            this.showToolbarButtons('fbUnpackageButtons',true);
            if (FBTrace.DBG_UNPACKAGE){
                FBTrace.sysout("ActivablePanel.hide;");
            };
        },
        hide: function() {
            Firebug.ActivablePanel.hide.apply(this,arguments);
            this.showToolbarButtons('fbUnpackageButtons',false);
            if (FBTrace.DBG_UNPACKAGE){
                FBTrace.sysout("ActivablePanel.hide;");
            };
        }
    });
    /*register*/
    if (Firebug.registerStringBundle){
        Firebug.registerStringBundle("chrome://unpackage/locale/overlay.properties");
    }
    /*Firbug.registerRep(Templates.Dashboard,Templates.Test);*/
    Firebug.registerActivableModule(Firebug.Unpackage);
    Firebug.registerPanel(Firebug.UnpackagePanel);
}});
