/** config
 * default options
 */
const config = {
    method: 'POST',
    url: '',
    token: true,
    timeout: 6000,
    data: null,
    base: window.location.origin + '/api',
    header:{}
};

/** setting
 * default header
 */
const header = {};

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
xhr.install = function(Vue){
    Vue.prototype.$xhr = xhr;
};

export default xhr;