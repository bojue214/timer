const g = typeof window == "undefined" ? global : window;
/** config
 * default timeout config options
 */
const config = {
    // excute time, -1 is infinite loop
    time: 1,
    // excuted time
    score: 0,
    // *key
    key: null,
    // interval time
    interval: 3000,
    // is running
    running: false,
    // *will be excuted
    callback: null,
    // the behavior's source target
    context: null,
    // excuted parameters
    params: null,
    // timeout function
    timeout: null,
    // excuting function
    excution: null,
    // excute immediately
    immediately: true,
    // cache the timeout after the end of excution.
    keep: false
};

/** Queue
 * cache core
 */
const Queue = {};

Object.defineProperties(Queue, {
    /** length
     * key number in Queue
     */
    length: {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 0
    },
    
    /** size
     * return the size of Queue
     */
    size: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(){
            let n = 0;
            for(var i in Queue){
                Queue.hasOwnProperty(i) && n++;
            }
            return n;
        }
    },

    /** remove
     * delete a timeout excution by key
     * @param {string} key
     */
    remove:{
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(key){
            delete Queue[key];
            Object.defineProperty(Queue, 'length', {value: Queue.size()});
        }
    },

    /** add
     * add a timeout excution with an unique key
     * @param {object} options  custom timeout options
     */
    add:{
        configurable:false,
        enumerable:false,
        writable:false,
        value:function(options){
            let opts = Object.assign({}, config, options);
            Queue[opts.key] = opts;
            Object.defineProperty(Queue, 'length', {value: Queue.size()});
            return opts;
        } 
    },

    /** get
     * get a timeout excution with an unique key
     * @param {string} key
     */
    get:{
        configurable:false,
        enumerable:false,
        writable:false,
        value:function(key){
            return Queue[key];
        }  
    }
});

/** timeout
 * timeout function
 * @param {object} options  custom timeout options
 */
const timeout = function(options){
    if(!options.key){ return new Errow('timeout need an unique key.');}
    
    let opts = Queue.add(options);

    opts.excution = function(){
        opts.running = true;
        opts.timeout = g.setTimeout(function(){
            opts.callback.call((opts.context ? opts.context : opts), opts.params);
            opts.score++;
            if(opts.time < 0 || opts.time > opts.score){
                opts.excution();
            } else{
                opts.running = false;
                !opts.keep && Queue.remove(opts.key);
            }
        },opts.interval);
    }

    if(opts.immediately && !opts.running && opts.time !== 0){
        opts.excution();
    }
};

/** one
 * excuted once
 * @param {object} options  custom timeout options
 */
timeout.one = function(options){
    options.time = 1;
    return timeout(options);
};

/** on
 * excute immediately
 * @param {object} options  custom timeout options
 */
timeout.on = function(options){
    if(typeof options === 'string'){
        options = Queue.get(options);
    }
    options.immediately = true;
    options.running = false;
    return timeout(options);
};

/** off
 * stop an excuted timeout by an unique key
 * @param {string} key  timeout key
 */
timeout.off = function(key){
    if(Queue[key]){
        g.clearTimeout(Queue[key].timeout);
        Queue[key].running = false;
        if(!Queue[key].keep){
            Queue.remove(key);
        }
    }
};

/** get
 * get a timeout options by an unique key
 * @param {string} key  timeout key
 */
timeout.get = function(key){
    return Queue.get(key);
};

/** size
 * return timeout queue length
 */
timeout.size = function(){
    return Queue.length;
};

/** isRunning
 * return timeout running status
 * @param {string} key  timeout key
 */
timeout.isRunning = function(key){
    if(Queue[key]){
        return Queue[key].running;
    } else{
        return new Error('not exist timeout.');l
    }
};

/** install
 *  vue install function
 * @param {object} Vue  Vue
 */
timeout.install = function(Vue){
    Vue.prototype.$timeout = timeout;
};
export default timeout;