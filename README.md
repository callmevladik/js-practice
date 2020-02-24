## Хелперы

 1. ***isArray***. Функция проверки субъекта на тип - object Array.

>     function isArray (obj) {
>         if (Array.isArray) {
>             if (Array.isArray(obj)) {
>                 return true;
>             }
>         }
>         if (!Array.isArray) {
>             Array.isArray = function(arr) {
>                 return Object.prototype.toString.call(arr) === '[object Array]';
>             };
>         } else {
>             return false;
>         }
>     }
2. ***isObject***. Функция проверки субъекта на тип - object Object.
> 
>     function isObject (collection) {
>         return Object.prototype.toString.call(collection) === '[object Object]';
>     }
3. ***isMap***. Функция проверки субъекта на тип - object Map.
> 
>     function  isMap (collection) {  
>     	return  Object.prototype.toString.call(collection) ===  '[object Map]';  
>     }
4. ***isWeakMap***. Функция проверки субъекта на тип - object WeakMap.
>
>     function isSet (collection) {
>         return Object.prototype.toString.call(collection) === '[object WeakMap]';
>     }
5. ***isSet***. Функция проверки субъекта на тип - object Set.
>
>     function isSet (collection) {
>         return Object.prototype.toString.call(collection) === '[object Set]';
>     }
6. ***isWeakSet***. Функция проверки субъекта на тип - object WeakSet.
>
>     function isSet (collection) {
>         return Object.prototype.toString.call(collection) === '[object WeakSet]';
>     }

## Коллекции

2. ***Each***. Перебор массива или объекта с вызовом коллбека для каждого элемента

>     function each(collection, callback) {
>         if (isArray(collection)) {
>             for (let i = 0; i < collection.length; i++) {
>                 let el = collection[i];
>                 callback(el, i);
>             }
>         } else if (isObject(collection)) {
>             for (let key in collection) {
>                 let el = collection[key];
>                 callback(el, key);
>             }
>         } else if (isMap(collection) || isWeakMap(collection) || isSet(collection) || isWeakSet(collection)) {
>             for (let [key, value] of collection) {
>                 callback(value, key);
>             }
>         }
>     }
