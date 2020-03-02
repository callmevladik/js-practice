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

function collectionCheck(collection) {
    let collectionInfo;
    if (typeof collection === 'object' && typeof collection !== null) {
        collectionInfo = new Object();
    } else {
        throw new TypeError(collection + ' is not a collection')
    }
    
    collectionInfo.length = isArray(collection) || isObject(collection) ? collection.length : collection.size;

    collectionInfo.type = isArray(collection) ? '[object Array]' : 
    isObject(collection) ? '[object Object]' : 
    isMap(collection) ? '[object Map]' :
    isWeakMap(collection) ? '[object WeakMap]' : 
    isSet(collection) ? '[object Set]' : 
    isWeakSet(collection) ? '[object WeakSet]': null;

    return collectionInfo;
}

function each(collection, callback) {
    callbackCheck(callback);
    let collectionInfo = collectionCheck(collection);

    if (collectionInfo.type === '[object Array]') {
        for (let i = 0; i < collectionInfo.length; i++) {
            let value = collection[i];
            callback(value, i);
        }
    } else if (collectionInfo.type === '[object Object]') {
        for (let key in collection) {
            let value = collection[key];
            callback(value, prop);
        }
    } else if (collectionInfo.type === '[object Map]' 
        || collectionInfo.type === '[object WeakMap]' 
        || collectionInfo.type === '[object Set]' 
        || collectionInfo.type === '[object WeakSet]') {
        for (let [prop, value] of collection) {
            callback(value, prop);
        }
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

function reduce(collection, callback, accum) {
    callbackCheck(callback);
    let i = !accum ? 1 : 0;
    accum = !accum ? collection[0] : accum;
    if (isArray(collection)) {
        for (; i < collection.length; i++) {
            let value = collection[i];
            accum = callback(accum, value, i);
        }
        return accum;
    } else {
        throw new TypeError(collection + ' is not a collection');
    }
}