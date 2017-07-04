function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
function hasProp(obj, prop) {
    return obj.hasOwnProperty(prop);
}

function mixin (target, source, force, deep) {
    "use strict";
    if (!source) return;
    if (!isObject(target)) return;
    for(let item in source) {
        if (!hasProp(target, item)) {
            if(isObject(source[item]) && deep) {
                target[item] = force ? {}: source[item];
                mixin(target[item], source[item], force, deep);
                continue;
            }
        } else if(target[item] && force){
            if(isObject(source[item]) && deep){
                mixin(target[item], source[item], force, deep);
                continue;
            }
        } else {
            if(!force) continue;
        }
        target[item] = source[item];
    }
}

module.exports.mixin = mixin