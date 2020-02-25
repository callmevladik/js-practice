function isArray (obj) {
    if (Array.isArray) {
        if (Array.isArray(obj)) {
            return true;
        }
    }
    if (!Array.isArray) {
        Array.isArray = function(arr) {
            return Object.prototype.toString.call(arr) === '[object Array]';
        };
    } else {
        return false;
    }
}

function isObject (collection) {
	return Object.prototype.toString.call(collection) === '[object Object]';
}

function  isMap (collection) {  
	return  Object.prototype.toString.call(collection) ===  '[object Map]';  
}

function isWeakMap (collection) {
	return Object.prototype.toString.call(collection) === '[object WeakMap]';
}

function isSet (collection) {
	return Object.prototype.toString.call(collection) === '[object Set]';
}

function isWeakSet (collection) {
	return Object.prototype.toString.call(collection) === '[object WeakSet]';
}

function each(collection, callback) {
    if(!typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            let el = collection[i];
            callback(el, i);
        }
    } else if (isObject(collection)) {
        for (let key in collection) {
            let el = collection[key];
            callback(el, key);
        }
    } else if (isMap(collection) || isWeakMap(collection) || isSet(collection) || isWeakSet(collection)) {
        for (let [key, value] of collection) {
            callback(value, key);
        }
    } else {
        throw new TypeError(collection + ' is not a collection');
        return false;
    }
}