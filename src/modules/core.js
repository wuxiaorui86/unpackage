var EXPORTED_SYMBOLS = ['unpackageMod'],
    unpackageMod = unpackageMod || {};

const Cc = Components.classes;
const Ci = Components.interfaces;

unpackageMod.Nginx = {
    _status:0,
    get status(){return this._status},
    setStatus:function(v){
        this._status = v;
    }
};
