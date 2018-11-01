/** config
 * default options
 */
const config = {
    method: 'POST',
    url: '',
    token: true,
    timeout: 6000,
    data: null,
    base: '127.0.0.1:9999/api',
    header:{}
};

/** setting
 * default header
 */
const header = {};

/** http
 * ajax proxy
 * @param {object} options  request config options
 */
const http = function (options) {
    let opts = Object.assign({}, config, options),
        params,
        xhr = new XMLHttpRequest(),
        promise;

        if(opts.api){
            opts.url = opts.base + opts.api;
        }

        opts.url = opts.url.replace(/\r|\n|\\s/g, '');

        promise = new Promise(function(resolve, reject) {
            console.log(11111);
            xhr.open(opts.method, opts.url, true);

            xhr.onload = function( response ) {
                let data = xhr.response;
                let status = xhr.status;

                if(status >= 200 && status < 400) {
                    try {
                        data = JSON.parse( data );
                    } catch(e) {
                        console.log( opts.url, "response can't be parsed to JSON format." );
                    }
                    resolve({data, response, xhr});
                    return;
                } else {
                    reject(response);
                    console.error(status, opts.url, data, response);
                }
            };

            xhr.onerror = function(response) {
                reject(response);
            };

            xhr.timeout = function() {};

            for(let key in header ){ opts.header[key] = header[key]; }

            for(let key in options.header) { opts.header[key] = options.header[key]; }
            
            if(!opts.header['Content-Type']) { opts.header['Content-Type'] = 'application/json'; }

            if(opts.token === true) {
                
            } else {
                delete opts.header['TIMER-TOKEN'];
            }

            for(let key in opts.header) {
                xhr.setRequestHeader(key, opts.header[key]);
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

/** install
 *  vue install function
 * @param {object} Vue  Vue
 */
http.install = function(Vue){
    Vue.prototype.$http = http;
};

export default http;