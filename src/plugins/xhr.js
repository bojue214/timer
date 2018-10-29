/** config
 * default options
 */
const config = {
    method: 'POST',
    url: '',
    token: true,
    timeout: 6000,
    data: null,
    base: window.location.origin + '/api'
};

/** setting
 * default headers
 */
const header = {

};

/** xhr
 * ajax proxy
 * @param {object} options  request config options
 */
const xhr = function (options) {
    let opts = Object.assign({}, config, options),
        params,
        xhr,
        promise;

        if(opts.api){
            opts.url = opts.base + opts.api;
        }

        opts.url = opts.url.replace(/\r|\n|\\s/g, '');

        promise = new Promise(function(resolve, reject) {
            xhr = new XMLHttpRequest();
            xhr.open(opts.method, opts.url, true);

            xhr.onload = function( response ) {
                let data = xhr.response;
                let status = xhr.status;
                try {
                    data = JSON.parse( data );
                } catch(e) {
                    console.log( opts.url, "response can't be parsed to JSON format." );
                }
                
                if(status >= 200 && status < 400) {
                    resolve({data, response, xhr});
                    return;
                } else {
                    console.error(status, opts.url, data, response);
                }
            };

            xhr.onerror = function(response) {
                reject(response);
            };

            xhr.timeout = function() {};

            for(let key in DEFAULT_HEADERS ){
                xhr.setRequestHeader(key, DEFAULT_HEADERS[key]);
                opts.headers[key] = header[key];
            }

            for(let key in options.headers) {
                xhr.setRequestHeader(key, options.headers[key]);
                opts.headers[key] = options.header[key];
            }
            
            if(!opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/json';
            }

            if(opts.token === true) {
                
            } else {
                delete opts.headers['TIMER-TOKEN'];
            }

            try {
                params = JSON.stringify(opts.data);
            } catch(e) {
                params = opts.data;
            }

            if(options.data) {
                xhr.send(params)
            } else {
                xhr.send();
            }
        });

        promise.xhr = xhr;
        return promise;
};

export default {
    install: function(Vue, options){
        Vue.prototype.$xhr = xhr;
    }
};