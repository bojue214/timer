const config = {
    // excute time, -1 is infinite loop
    times: 1,
    // excuted time
    score: 0,
    // key
    key: null,
    // interval time
    interval: 3000,
    // is running
    running: false,
    // will be excuted
    callback: null,
    // the behavior's source target
    context: null,
    //excuted parameters
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

const queue = {};

Object.defineProperties(queue, {
    length: {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 0
    },
    
    size: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(){
            let n = 0;
            for(var i in queue){
                queue.hasOwnProperty(i) && n++;
            }
            return n;
        }
    },

    remove:{
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(key){
            delete queue[key];
            Object.defineProperty(queue, 'length', {value: queue.size()});
        }
    },

    add:{
        configurable:false,
        enumerable:false,
        writable:false,
        value:function(options){
            let opts = Object.assign({}, config, options);
            queue[opts.key] = opts;
            Object.defineProperty(queue, 'length', {value: queue.size()});
            return opts;
        } 
    }
});

const timeout = function(options){
    if(!options.key){ return new Errow('timeout need an unique key!');}
    
    let opts = queue.add(options);

    if(opts.immediately && !opts.running && opts.times !== 0){
        
        opts.excution = function(){
            opts.running = true;
            opts.timeout = window.setTimeout(function(){
                callback.call(opts.context ? opts.context : null, opts.params);
                opts.score++;
                if(opts.times < 0 || opts.times > opts.score){
                    opts.excution();
                } else{
                    opts.running = false;
                    !opts.keep && timeout.remove(opts.key);
                }
            },opts.interval);
        }
    }
};

timeout.one = function(options){
    options.times = 1;
    return timeout(options);
};

timeout.on = function(options){
    if(typeof options === 'string'){
        options = timeout.get(key);
    }
    options.immediately = true;
    return timeout(options);
};

timeout.off = function(key){
    if(queue[key]){
        window.clearTimeout(queue[key].timeout);
        queue[key].running = false;
    }
};

timeout.start = function(key){ timeout.on(key); };

timeout.get = function(key){ return queue[key]; };

timeout.remove = function(key){
    if(queue[key]){ 
        window.clearTimeout(queue[key].timeout);
        queue.remove(queue[key]);
    }
};

timeout.size = function(){
    return queue.length;
};

export default {
    install(Vue, options){
        Vue.prototype.$timeout = timeout;
    }
};