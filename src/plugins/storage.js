const _storage = window.localStorage;

/** storage
 * window.localstorage encapsulated
 */
const storage = {

    /** set
     * set a value into localstorage by an key name.
     * @param {string} key 
     * @param {string} value 
     */
    set( key, value ){
        _storage.setItem( key, value );
    },

    /** get
     * get a localstorage value by a key
     * @param {string} key 
     */
    get( key ){
        return _storage.getItem( key );
    },

    /** clear
     * clear all of the data from localstorage
     */
    clear(){
        _storage.clear();
    },

    /** remove
     * delete a key and its value from localstorage by the key name.
     * @param {string} key 
     */
    remove(key){
        _storage.removeItem(key);
    },

    /** keys
     * get a key list from localstorage. if it has no key, return [].
     */
    keys(){
        let keys = [];
        for(let j = 0; j < _storage.length; j++ ){
            keys.push(_storage.key(j));
        }
        return keys;
    },

    /** size
     * get the length of localstorage
     */
    size(){ return _storage.length; },

    /** forEach
     * method executes a provided function once for each array element
     * @param {function} callback 
     */
    forEach(callback){
        for(let j = 0; j < _storage.length; j++ ){
            callback.call(window.localStorage, _storage[_storage.key(i)], i);
        }
    },
};

export default { 
    install : function(Vue, options) {
        Vue.prototype.$storage = storage;
    }
};