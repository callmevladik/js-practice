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

function callbackCheck(callback) {
    if(!typeof callback === 'function') {
        throw new TypeError(callback + ' is not a function');
    }
}

function each(collection, callback) {
    callbackCheck(callback);

    if (isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            let value = collection[i];
            callback(value, i);
        }
    } else if (isObject(collection)) {
        for (let key in collection) {
            let value = collection[key];
            callback(value, prop);
        }
    } else if (isMap(collection) || isWeakMap(collection) || isSet(collection) || isWeakSet(collection)) {
        for (let [prop, value] of collection) {
            callback(value, prop);
        }
    } else {
        throw new TypeError(collection + ' is not a collection');
    }
}

function map(collection, callback) {
    callbackCheck(callback);

    const collectionLength = collection.length;
    const map = Array(collectionLength);
    let mappedValue;
    let k = 0;
    if (isArray(collection)) {
        for (let i = 0; i < collectionLength; i++) {
            mappedValue = collection[i];
            map[k] = callback(mappedValue);
            k++;
        }
    } else if (isObject(collection)) {
        for (let prop in collection) {
            mappedValue = collection[prop];
            map[k] = callback(mappedValue);
            k++;
        }
    } else if (isMap(collection) || isWeakMap(collection) || isSet(collection) || isWeakSet(collection)) {
        for (let [prop, value] of collection) {
            mappedValue = value;
            map[k] = callback(mappedValue);
            k++;
        }
    } else {
        throw new TypeError(collection + ' is not a collection');
    }

    return map;
}