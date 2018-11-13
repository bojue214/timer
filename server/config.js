const config = { 
    server: {
        port : '8080'
    },
    db:{
        mysql:{}
    },
    token:{
        expire: 1 * 60 * 1000,
        safe: ['/login', '/api/user/login'],
        key:'X-Timer-Token'
    }
};

module.exports = config;