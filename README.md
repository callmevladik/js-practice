## Хелперы

 1. ***isArray***. Функция проверки объекта на тип - object Array.
```javascript
function isArray (collection) {
    return Object.prototype.toString.call(collection) === '[object Array]';
}
```
2. ***isObject***. Функция проверки объекта на тип - object Object.
> 
```javascript
function isObject (collection) {
	return Object.prototype.toString.call(collection) === '[object Object]';
}
```

3. ***isMap***. Функция проверки объекта на тип - object Map.
```javascript
function isMap (collection) {  
	return  Object.prototype.toString.call(collection) === '[object Map]';  
}
```
4. ***isWeakMap***. Функция проверки объекта на тип - object WeakMap.
```javascript
function isWeakMap (collection) {
	return Object.prototype.toString.call(collection) === '[object WeakMap]';
}
```
5. ***isSet***. Функция проверки объекта на тип - object Set.
```javascript
function isSet (collection) {
	return Object.prototype.toString.call(collection) === '[object Set]';
}
```
6. ***isWeakSet***. Функция проверки объекта на тип - object WeakSet.
```javascript
function isWeakSet (collection) {
	return Object.prototype.toString.call(collection) === '[object WeakSet]';
}
```
7. ***callbackCheck***. Функция проверки коллбэка на тип - function.
```javascript
function callbackCheck(callback) {
    if(!typeof callback === 'function') {
        throw new TypeError(callback + ' is not a function');
    }
}
```
8. ***getCollectionProps***. Функция обработки коллекции и получения данных о ней
```javascript
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
```

## Коллекции

1. ***Each***. Перебор коллекции с вызовом коллбэка для каждого элемента.
```javascript
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
```
2. ***Map***. Создание нового массива на основе данной коллекции с вызовом коллбэка для каждого её элемента.
```javascript
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
```
3.***Reduce***. Перебор коллекции и сведение к одному значению
```javascript
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
```
