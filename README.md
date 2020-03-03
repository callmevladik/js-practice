## Константы
1. ***Константы типов***
```javascript
const objectType = 'object';
const objectFunctionType = 'function';
const objectObjectType = '[object Object]';
const objectArrayType = '[object Array]';
const objectMapType = '[object Map]';
const objectWeakMapType = '[object WeakMap]';
const objectSetType = '[object Set]';
const objectWeakSetType = '[object WeakSet]';
```

## Хелперы

1. ***callbackCheck***. Функция проверки коллбэка на тип - function.
```javascript
function callbackCheck(callback) {
    if(!typeof callback === objectFunctionType) {
        throw new TypeError(callback + ' is not a function');
    }
}
```
2. ***getCollectionProps***. Функция обработки коллекции и получения данных о ней
```javascript
function getCollectionProps(collection) {
    let collectionProps;
    if (typeof collection === objectType && typeof collection !== null) {
        collectionProps = new Object();
    } else {
        throw new TypeError(collection + ' is not a collection')
    }
    
    collectionProps.type = collectionTypeCheck(collection);
    collectionProps.length = collectionTypeCheck(collection) === objectArrayType || collectionTypeCheck(collection) === objectObjectType ? collection.length : collection.size;

    return collectionProps;
}
```
3. ***collectionTypeCheck***. Функция проверки коллекции на тип
```javascript
function collectionTypeCheck(collection) {
    return Object.prototype.toString.call(collection);
}
```

## Коллекции

1. ***Each***. Перебор коллекции с вызовом коллбэка для каждого элемента.
```javascript
function each(collection, callback) {
    let collectionProps = getCollectionProps(collection);

    callbackCheck(callback);

    if (collectionProps.type === objectArrayType) {
        for (let i = 0; i < collectionProps.length; i++) {
            let value = collection[i];
            callback(value, i);
        }
    } else if (collectionProps.type === objectObjectType) {
        for (let key in collection) {
            let value = collection[key];
            callback(value, prop);
        }
    } else if (collectionProps.type === objectMapType 
        || collectionProps.type === objectWeakMapType 
        || collectionProps.type === objectSetType 
        || collectionProps.type === objectWeakSetType) {
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
    if (collectionProps.type === objectArrayType) {
        for (let i = 0; i < collectionProps.length; i++) {
            mappedValue = collection[i];
            map[k] = callback(mappedValue);
            k++;
        }
    } else if (collectionProps.type === objectObjectType) {
        for (let prop in collection) {
            mappedValue = collection[prop];
            map[k] = callback(mappedValue);
            k++;
        }
    } else if (collectionProps.type === objectMapType 
        || collectionProps.type === objectWeakMapType 
        || collectionProps.type === objectSetType 
        || collectionProps.type === objectWeakSetType) {
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
    if (collectionProps.type === objectArrayType) {
        for (; i < collectionProps.length; i++) {
            let value = collection[i];
            accum = callback(accum, value, i);
        }
        return accum;
    }
}
```
