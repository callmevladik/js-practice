function isArrayLike (obj) {
    if (Array.isArray) {
        if (Array.isArray(obj)) {
            return true;
        }
    }
    if (!Array.isArray) {
        Array.isArray = function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };
    }
    
}
