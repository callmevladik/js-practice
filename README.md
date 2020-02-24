 - **Хелперы**
 1. ***isArrayLike***. Функция проверки субъекта на тип - массив.

>     function isArrayLike (obj) {
>         if (Array.isArray) {
>             if (Array.isArray(obj)) {
>                 return true;
>             }
>         }
>         if (!Array.isArray
>             Array.isArray = function(arr) {
>                 return Object.prototype.toString.call(arr) === '[object Array]';
>             };
>         } else {
>             return false;
>         }
>     }

- **Коллекции** 

2. ***Each***. Перебор массива или объекта с вызовом коллбека для каждого элемента

>     function each(collection, callback) {
>         if (isArrayLike(collection)) {
>             for (let i = 0; i<collection.length; i++) {
>                 let el = collection[i];
>                 callback(el, i, collection);
>             }
>         } else {
>             for (let key in collection) {
>                 let el = collection[key];
>                 callback(el, key, collection);
>             }
>         }
>     }
