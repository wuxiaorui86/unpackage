import System;
import System.Windows.Forms;
import Fiddler;

// GLOBALIZATION NOTE:
// Be sure to save this file with UTF-8 Encoding if using any non-ASCII characters
// in strings, etc.
//
// JScript Reference
// http://www.fiddler2.com/redir/?id=msdnjsnet
//
// FiddlerScript Reference
// http://www.fiddler2.com/redir/?id=fiddlerscriptcookbook
//
// FiddlerScript Editor:
// http://www.fiddler2.com/redir/?id=fiddlerscripteditor

class Handlers{
    // The following snippet demonstrates a custom-bound column for the web sessions list.
    // See http://www.fiddler2.com/fiddler/help/configurecolumns.asp for more info
    //public static BindUIColumn("Method", 60)
    //function FillMethodColumn(oS: Session){
    //	if ((oS.oRequest != null) && (oS.oRequest.headers != null))
    //	return oS.oRequest.headers.HTTPMethod; else return String.Empty;
    //}
    public static RulesOption("Enable Unpacker")
    var m_Unpacker : boolean = false;

    public static RulesOption("Assets Proxy")
    var m_AssetsProxy : boolean = false;

    public static var pathFrom : String = FiddlerObject.prompt('输入被代理的路径', "g.tbcdn.cn/ju/life/1.0.2", "Assets Proxy");
    public static var pathTo : String = FiddlerObject.prompt('输入目标路径', "127.0.0.1/gitlab/life/src", "Assets Proxy");

    // Cause Fiddler to override the User-Agent header with one of the defined values
    RulesString("&User-Agents", true)
    RulesStringValue(0, "Netscape &3", "Mozilla/3.0 (Win95; I)")
    RulesStringValue(1, "KIN2 &IEMobile", "Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 6.12; en-US; KIN.Two 1.0)")
    RulesStringValue(2, "WinMobile7", "Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0) Microsoft;FuturePhone")
    RulesStringValue(3, "&Safari5 (Win7)", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16")
    RulesStringValue(4, "IPAD", "Mozilla/5.0 (iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10")
    RulesStringValue(5, "IE &6 (XPSP2)", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)")
    RulesStringValue(6, "IE &7 (Vista)", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1)")
    RulesStringValue(7, "IE 8 (Win2k3 x64)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; WOW64; Trident/4.0)")
    RulesStringValue(8, "IE &8 (Win7)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)")
    RulesStringValue(9, "IE 8 (IE7 CompatMode)", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0)")
    RulesStringValue(10, "IE 9 (Win7)", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)")
    RulesStringValue(11, "&Opera", "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.5.28/2.5.23 Version/10.60")
    RulesStringValue(12, "&Firefox 2", "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.10) Gecko/20071115 Firefox/2.0.0.10")
    RulesStringValue(13, "&Firefox 3.6", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.7) Gecko/20100625 Firefox/3.6.7")
    RulesStringValue(14, "&Firefox (Mac)", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3")
    RulesStringValue(15, "Chrome", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.99 Safari/533.4")
    RulesStringValue(16, "GoogleBot Crawler", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")
    RulesStringValue(17, "&Custom...", "%CUSTOM%")
    public static var sUA : String = null;

    // Cause Fiddler to delay HTTP traffic to simulate typical 56k modem conditions
    public static RulesOption("Simulate &Modem speeds", "Per&formance")
    var m_SimulateModem : boolean = false;

    // Removes HTTP-caching related headers and specifies "no-cache" on requests and responses
    public static RulesOption("&Disable Caching", "Per&formance")
    var m_DisableCaching : boolean = false;

    // Show the duration between the start of Request.Send and Response.Completed in Milliseconds
    public static RulesOption("&Show Time-to-Last-Byte", "Per&formance")
    var m_ShowTTLB : boolean = false;

    // Show the time of response completion
    public static RulesOption("Show Response &Timestamp", "Per&formance")
    var m_ShowTimestamp : boolean = false;

    // Force a manual reload of the script file.  Resets all
    // RulesOption variables to their defaults.
    public static ToolsAction("Reset Script")
    function DoManualReload() {
        FiddlerObject.ReloadScript();
    }

    public static ContextAction("Decode Selected Sessions")
    function DoRemoveEncoding(oSessions : Session[]) {
        for (var x = 0; x < oSessions.Length; x++) {
            oSessions[x].utilDecodeRequest();
            oSessions[x].utilDecodeResponse();
        }
    }

    static function OnBoot() {
        //		MessageBox.Show("Fiddler has finished booting");
        //		System.Diagnostics.Process.Start("iexplore.exe");

        //		FiddlerObject.UI.ActivateRequestInspector("HEADERS");
        //		FiddlerObject.UI.ActivateResponseInspector("HEADERS");
    }

    static function OnShutdown() {
        //		MessageBox.Show("Fiddler has shutdown");
    }

    static function OnAttach() {
        //		MessageBox.Show("Fiddler is now the system proxy");
        //		System.Diagnostics.Process.Start("proxycfg.exe", "-u");	// Notify WinHTTP of proxy change
    }

    static function OnDetach() {
        //		MessageBox.Show("Fiddler is no longer the system proxy");
        //		System.Diagnostics.Process.Start("proxycfg.exe", "-u");	// Notify WinHTTP of proxy change
    }

    static function OnBeforeRequest(oSession : Session) {
        // Sample Rule: Color ASPX requests in RED
        if (oSession.uriContains("tbcdn.cn") || oSession.uriContains("assets.daily.taobao.net")) {
            if (oSession.url.indexOf('.js') > -1) {}
            if (oSession.url.indexOf('.css') > -1) {}
        }

        if (m_AssetsProxy && oSession.uriContains(pathFrom)) {
            oSession.url = oSession.url.Replace(pathFrom, pathTo);
            oSession.url = oSession.url.Replace("-min.", ".");
            oSession["ui-color"] = "red";
            oSession["ui-bold"] = "true";
            FiddlerObject.log("代理的url ：" + oSession.url);
        }

        // Sample Rule: Flag POSTs to fiddler2.com in italics
        //		if (oSession.HostnameIs("www.fiddler2.com") && oSession.HTTPMethodIs("POST")) {	oSession["ui-italic"] = "yup";	}

        // Sample Rule: Break requests for URLs containing "/sandbox/"
        //		if (oSession.uriContains("/sandbox/")){
        //			oSession.oFlags["x-breakrequest"] = "yup";	// Existence of the x-breakrequest flag creates a breakpoint; the "yup" value is unimportant.
        //		}

        if ((null != gs_ReplaceToken) && (oSession.url.indexOf(gs_ReplaceToken) > -1)) { // Case sensitive
            oSession.url = oSession.url.Replace(gs_ReplaceToken, gs_ReplaceTokenWith);
        }
        if ((null != gs_OverridenHost) && (oSession.host.toLowerCase() == gs_OverridenHost)) {
            oSession["x-overridehost"] = gs_OverrideHostWith;
        }

        if ((null != bpRequestURI) && oSession.uriContains(bpRequestURI)) {
            oSession["x-breakrequest"] = "uri";
        }

        if ((null != bpMethod) && (oSession.HTTPMethodIs(bpMethod))) {
            oSession["x-breakrequest"] = "method";
        }

        if ((null != uiBoldURI) && oSession.uriContains(uiBoldURI)) {
            oSession["ui-bold"] = "QuickExec";
        }

        if (m_SimulateModem) {
            // Delay sends by 300ms per KB uploaded.
            oSession["request-trickle-delay"] = "300";
            // Delay receives by 150ms per KB downloaded.
            oSession["response-trickle-delay"] = "150";
        }

        if (m_DisableCaching) {
            oSession.oRequest.headers.Remove("If-None-Match");
            oSession.oRequest.headers.Remove("If-Modified-Since");
            oSession.oRequest["Pragma"] = "no-cache";
        }

        // User-Agent Overrides
        if (null != sUA) {
            oSession.oRequest["User-Agent"] = sUA;
        }

    }

    //
    // If a given session has response streaming enabled, then the OnBeforeResponse function
    // is actually called AFTER the response was returned to the client.
    //
    // In contrast, this OnPeekAtResponseHeaders method is called before the response headers are
    // sent to the client (and before the body is read from the server).  Hence this is an opportune time
    // to disable streaming (oSession.bBufferResponse = true) if there is something in the response headers
    // which suggests that tampering with the response body is necessary.
    //
    // Note: oSession.responseBodyBytes is not available within this function!
    //
    static function OnPeekAtResponseHeaders(oSession : Session) {
        //FiddlerApplication.Log.LogFormat("Session {0}: Response header peek shows status is {1}", oSession.id, oSession.responseCode);
        if (m_DisableCaching) {
            oSession.oResponse.headers.Remove("Expires");
            oSession.oResponse["Cache-Control"] = "no-cache";
        }
    }

    static function OnBeforeResponse(oSession : Session) {
        if (m_ShowTimestamp) {
            oSession["ui-customcolumn"] = DateTime.Now.ToString("H:mm:ss.ffff") + " " + oSession["ui-customcolumn"];
        }

        if (m_ShowTTLB) {
            oSession["ui-customcolumn"] = oSession.oResponse.iTTLB + "ms " + oSession["ui-customcolumn"];
        }

        if ((bpStatus > 0) && (oSession.responseCode == bpStatus)) {
            oSession["x-breakresponse"] = "status";
        }

        if ((null != bpResponseURI) && oSession.uriContains(bpResponseURI)) {
            oSession["x-breakresponse"] = "uri";
        }

        if (m_Unpacker && oSession.oResponse.headers.ExistsAndContains("Content-Type", "html")) {
            oSession.utilDecodeResponse();
            var oBody = oSession.GetResponseBodyEncoding() == 'System.Text.UTF8Encoding' ?
                System.Text.Encoding.UTF8.GetString(oSession.responseBodyBytes) :
                System.Text.Encoding.Default.GetString(oSession.responseBodyBytes),
                oRegSnippet = /<(link|script).*?(src|href)="http:\/\/(assets.daily.taobao.net|a.tbcdn.cn|l.tbcdn.cn)(.*?)\/\?\?(.*?)".*?>/gi,
                oRegSrc = /(href|src)="http:\/\/(.*?)\/\?\?(.*?)"/i,
                oRegCharset = /charset="(.*?)"/i,
                arrTwist = oBody.match(oRegSnippet) || [];

            var replacer = function (s) {
                    var arr = s.match(oRegSrc),
                        arrFiles = [],
                        arrSnippet = [],
                        arrCharset = s.match(oRegCharset),
                                str,
                        path = 'http://' + arr[2] + '/',
                        template = arr[1] === 'src' ?
                        '<script src="{src}" {charset}></script>' :
                        '<link rel="stylesheet" href="{src}" {charset} />';

                    arrFiles = arr[3] ? arr[3].split(',') : [];

                    for (var j = 0; j < arrFiles.length; j++) {
                        if (arrFiles[j]) {
                            str = template.substr(0).replace('{src}', path + arrFiles[j]);
                            str = str.substr(0).replace('{charset}', arrCharset && arrCharset[1] ? 'charset="' + arrCharset[1] + '"' : '');
                            arrFiles[j] && arrSnippet.push(str);
                        }
                    }
                    oBody = oBody.replace(s, '\r\n<!--Fiddler Unpacker Enabled START-->\r\n' + arrSnippet.join('\r\n') + '\r\n<!--Fiddler Unpacker Enabled END-->\r\n');
                };

            for (var i = 0; i < arrTwist.length; i++) {
                replacer(arrTwist[i]);
            };

            oSession.utilSetResponseBody(oBody);
        }

    }
	/*
	QuickLinkMenu("&Links") 
    QuickLinkItem("IE GeoLoc TestDrive", "http://ie.microsoft.com/testdrive/HTML5/Geolocation/Default.html")
    QuickLinkItem("FiddlerCore", "http://fiddler.wikidot.com/fiddlercore")
    public static function DoLinksMenu(sText: String, sAction: String)
    {
        Utilities.LaunchHyperlink(sAction);
    }*/

    static function Main() {
        var today : Date = new Date();
        FiddlerObject.StatusText = " CustomRules.js was loaded at: " + today;
        // Uncomment to add a "Server" column containing the response "Server" header, if present
        // FiddlerObject.UI.lvSessions.AddBoundColumn("Server", 50, "@response.server");
    }

    // These static variables are used for simple breakpointing & other QuickExec rules
    static var bpRequestURI : String = null;
    static var bpResponseURI : String = null;
    static var bpStatus : int = -1;
    static var bpMethod : String = null;
    static var uiBoldURI : String = null;
    static var gs_ReplaceToken : String = null;
    static var gs_ReplaceTokenWith : String = null;
    static var gs_OverridenHost : String = null;
    static var gs_OverrideHostWith : String = null;

    // The OnExecAction function is called by either the QuickExec box in the Fiddler window,
    // or by the ExecAction.exe command line utility.
    static function OnExecAction(sParams : String[]) {
        FiddlerObject.StatusText = "ExecAction: " + sParams[0];

        var sAction = sParams[0].toLowerCase();
        switch (sAction) {
            case "bold":
                if (sParams.Length < 2) {
                    uiBoldURI = null;
                    FiddlerObject.StatusText = "Bolding cleared";
                    return;
                }
                uiBoldURI = sParams[1];
                FiddlerObject.StatusText = "Bolding requests for " + uiBoldURI;
                break;
            case "bp":
                FiddlerObject.alert("bpu = breakpoint request for uri\nbpm = breakpoint request method\nbps=breakpoint response status\nbpafter = breakpoint response for URI");
                break;
            case "bps":
                if (sParams.Length < 2) {
                    bpStatus = -1;
                    FiddlerObject.StatusText = "Response Status breakpoint cleared";
                    return;
                }
                bpStatus = parseInt(sParams[1]);
                FiddlerObject.StatusText = "Response status breakpoint for " + sParams[1];
                break;
            case "bpv":
            case "bpm":
                if (sParams.Length < 2) {
                    bpMethod = null;
                    FiddlerObject.StatusText = "Request Method breakpoint cleared";
                    return;
                }
                bpMethod = sParams[1].toUpperCase();
                FiddlerObject.StatusText = "Request Method breakpoint for " + bpMethod;
                break;
            case "bpu":
                if (sParams.Length < 2) {
                    bpRequestURI = null;
                    FiddlerObject.StatusText = "RequestURI breakpoint cleared";
                    return;
                }
                if (sParams[1].toLowerCase().StartsWith("http://")) {
                    sParams[1] = sParams[1].Substring(7);
                }
                bpRequestURI = sParams[1];
                FiddlerObject.StatusText = "RequestURI breakpoint for " + sParams[1];
                break;
            case "bpafter":
                if (sParams.Length < 2) {
                    bpResponseURI = null;
                    FiddlerObject.StatusText = "ResponseURI breakpoint cleared";
                    return;
                }
                if (sParams[1].toLowerCase().StartsWith("http://")) {
                    sParams[1] = sParams[1].Substring(7);
                }
                bpResponseURI = sParams[1];
                FiddlerObject.StatusText = "ResponseURI breakpoint for " + sParams[1];
                break;
            case "overridehost":
                if (sParams.Length < 3) {
                    gs_OverridenHost = null;
                    FiddlerObject.StatusText = "Host Override cleared";
                    return;
                }
                gs_OverridenHost = sParams[1].toLowerCase();
                gs_OverrideHostWith = sParams[2];
                FiddlerObject.StatusText = "Connecting to [" + gs_OverrideHostWith + "] for requests to [" + gs_OverridenHost + "]";
                break;
            case "urlreplace":
                if (sParams.Length < 3) {
                    gs_ReplaceToken = null;
                    FiddlerObject.StatusText = "URL Replacement cleared";
                    return;
                }
                gs_ReplaceToken = sParams[1];
                gs_ReplaceTokenWith = sParams[2].Replace(" ", "%20"); // Simple helper
                FiddlerObject.StatusText = "Replacing [" + gs_ReplaceToken + "] in URIs with [" + gs_ReplaceTokenWith + "]";
                break;
            case "select":
                if (sParams.Length < 2) {
                    FiddlerObject.StatusText = "Please specify Content-Type to select.";
                    return;
                }
                FiddlerObject.UI.actSelectSessionsWithResponseHeaderValue("Content-Type", sParams[1]);
                FiddlerObject.StatusText = "Selected sessions returning Content-Type: " + sParams[1] + ".";
                if (FiddlerObject.UI.lvSessions.SelectedItems.Count > 0) {
                    FiddlerObject.UI.lvSessions.Focus();
                }
                break;
            case "allbut":
            case "keeponly":
                if (sParams.Length < 2) {
                    FiddlerObject.StatusText = "Please specify Content-Type to retain during wipe.";
                    return;
                }
                FiddlerObject.UI.actSelectSessionsWithResponseHeaderValue("Content-Type", sParams[1]);
                FiddlerObject.UI.actRemoveUnselectedSessions();
                FiddlerObject.UI.lvSessions.SelectedItems.Clear();
                FiddlerObject.StatusText = "Removed all but Content-Type: " + sParams[1];
                break;
            case "stop":
                FiddlerObject.UI.actDetachProxy();
                break;
            case "start":
                FiddlerObject.UI.actAttachProxy();
                break;
            case "cls":
            case "clear":
                FiddlerObject.UI.actRemoveAllSessions();
                break;
            case "g":
            case "go":
                FiddlerObject.UI.actResumeAllSessions();
                break;
            case "help":
                Utilities.LaunchHyperlink("http://www.fiddler2.com/redir/?id=quickexec");
                break;
            case "hide":
                FiddlerObject.UI.actMinimizeToTray();
                break;
            case "log":
                FiddlerApplication.Log.LogString((sParams.Length < 2) ? FiddlerApplication.Log.LogString("User couldn't think of anything to say...") : sParams[1]);
                break;
            case "nuke":
                FiddlerObject.UI.actClearWinINETCache();
                FiddlerObject.UI.actClearWinINETCookies();
                break;
            case "show":
                FiddlerObject.UI.actRestoreWindow();
                break;
            case "tail":
                if (sParams.Length < 2) {
                    FiddlerObject.StatusText = "Please specify # of sessions to trim the session list to.";
                    return;
                }
                FiddlerObject.UI.TrimSessionList(int.Parse(sParams[1]));
                break;
            case "quit":
                FiddlerObject.UI.actExit();
                break;
            case "dump":
                FiddlerObject.UI.actSelectAll();
                FiddlerObject.UI.actSaveSessionsToZip(CONFIG.GetPath("Captures") + "dump.saz");
                FiddlerObject.UI.actRemoveAllSessions();
                FiddlerObject.StatusText = "Dumped all sessions to " + CONFIG.GetPath("Captures") + "dump.saz";
                break;

            default:
                if (sAction.StartsWith("http") || sAction.StartsWith("www")) {
                    System.Diagnostics.Process.Start(sAction);
                } else
                    FiddlerObject.StatusText = "Requested ExecAction: " + sAction + " not found. Type HELP to learn more.";
        }
    }
}