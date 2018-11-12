/** config
 * default options
 */
const config = {
    method: 'POST',
    url: '',
    token: true,
    timeout: 6000,
    data: null,
    protocol: 'http://',
    base: '127.0.0.1:8080/api',
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
    let opts = Object.assign({}, config, options);
    let params,
        xhr;

        if(opts.api){
            opts.url =opts.protocol + opts.base + opts.api;
        }
        opts.url = opts.url.replace(/\r|\n|\\s/g, '');
        
    let promise = new Promise(function(resolve, reject) {
            xhr = new XMLHttpRequest();
            xhr.onload = function( response ) {
                let data = xhr.response;
                let status = xhr.status;

                if(status >= 200 && status < 400) {
                    try {
                        data = JSON.parse(data);
                        if(data 
                            && data.data !== undefined 
                            && data.status !== undefined 
                            && data.message !== undefined){
                            resolve(data);
                        } else {
                            reject(response);
                        }
                    } catch(e) {
                        reject(response);
                        console.log( opts.url, "response can't be parsed to JSON format." );
                    }
                } else {
                    reject(response);
                    console.error(status, opts.url, data, response);
                }
            };

            xhr.onerror = function(response) {
                reject(response);
            };

            xhr.timeout = function() {};

            xhr.open(opts.method, opts.url, true);

            for(let key in header ){ opts.header[key] = header[key]; }

            for(let k in options.header) { opts.header[k] = options.header[k]; }
            
            if(!opts.header['Content-Type']) { opts.header['Content-Type'] = 'application/json'; }
            
            if(opts.token === true) {
                
            } else {
                delete opts.header['X-Timer-Token'];
            }

            for(let v in opts.header) {
                xhr.setRequestHeader(v, opts.header[v]);
            }

            try {
                params = JSON.stringify(opts.data);
            } catch(e) {
                params = opts.data;
            }

            if(opts.data) {
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