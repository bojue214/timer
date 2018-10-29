const defaultOpts = {
    method: 'POST',
    url: '',
    headers: {},
    token: true,
    timeout: 6000,
    data: null
};

let xhr = function (options) {
    let opts = Object.assign({}, defaultOpts, options),
        params,
        xhr,
        promise;
        opts.url = opts.url.replace(/\r|\n|\\s/g,'');

        promise = new Promise(function(resolve, reject) {
            xhr = new XMLHttpRequest();
            xhr.open(opts.method, opts.url, true);

            xhr.onload = function(response) {
                let data = xhr.response;
                let status = xhr.status;
                try {
                    data = JSON.parse(data);
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

            if(opts.token === true) {
                
            } else {
                delete opts.headers['TIMER-TOKEN'];
            }

            if(!opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/json';
            }

            for(let key in opts.headers) {
                xhr.setRequestHeader(key, opts.headers[key]);
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
        Vue.prototype.$http = xhr;
    }
};