function isArray (collection) {
    return Object.prototype.toString.call(collection) === '[object Array]';
}

function isObject (collection) {
	return Object.prototype.toString.call(collection) === '[object Object]';
}

function isMap (collection) {  
	return  Object.prototype.toString.call(collection) === '[object Map]';  
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

function getCollectionProps(collection) {
    let collectionProps;
    if (typeof collection === 'object' && typeof collection !== null) {
        collectionProps = new Object();
    } else {
        throw new TypeError(collection + ' is not a collection')
    }
    
    collectionProps.length = isArray(collection) || isObject(collection) ? collection.length : collection.size;

    collectionProps.type = isArray(collection) ? '[object Array]' : 
    isObject(collection) ? '[object Object]' : 
    isMap(collection) ? '[object Map]' :
    isWeakMap(collection) ? '[object WeakMap]' : 
    isSet(collection) ? '[object Set]' : 
    isWeakSet(collection) ? '[object WeakSet]': null;

    return collectionProps;
}

function each(collection, callback) {
    let collectionProps = getCollectionProps(collection);

    callbackCheck(callback);

    if (collectionProps.type === '[object Array]') {
        for (let i = 0; i < collectionProps.length; i++) {
            let value = collection[i];
            callback(value, i);
        }
    } else if (collectionProps.type === '[object Object]') {
        for (let key in collection) {
            let value = collection[key];
            callback(value, prop);
        }
    } else if (collectionProps.type === '[object Map]' 
        || collectionProps.type === '[object WeakMap]' 
        || collectionProps.type === '[object Set]' 
        || collectionProps.type === '[object WeakSet]') {
        for (let [prop, value] of collection) {
            callback(value, prop);
        }
    }
}

function map(collection, callback) {
    let collectionProps = getCollectionProps(collection);

    callbackCheck(callback);

    const map = Array(collectionProps.length);
    let mappedValue;
    let k = 0;
    if (collectionProps.type === '[object Array]') {
        for (let i = 0; i < collectionProps.length; i++) {
            mappedValue = collection[i];
            map[k] = callback(mappedValue);
            k++;
        }
    } else if (collectionProps.type === '[object Object]') {
        for (let prop in collection) {
            mappedValue = collection[prop];
            map[k] = callback(mappedValue);
            k++;
        }
    } else if (collectionProps.type === '[object Map]' 
        || collectionProps.type === '[object WeakMap]' 
        || collectionProps.type === '[object Set]' 
        || collectionProps.type === '[object WeakSet]') {
        for (let [prop, value] of collection) {
            mappedValue = value;
            map[k] = callback(mappedValue);
            k++;
        }
    }

    return map;
}

function reduce(collection, callback, accum) {
    let collectionProps = getCollectionProps(collection);

    callbackCheck(callback);

    let i = !accum ? 1 : 0;
    accum = !accum ? collection[0] : accum;
    if (collectionProps.type === '[object Array]') {
        for (; i < collectionProps.length; i++) {
            let value = collection[i];
            accum = callback(accum, value, i);
        }
        return accum;
    }
}