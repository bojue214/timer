const config = { 
    server: {
        port : '8080'
    },
    db:{
        mysql:{}
    },
    token:{
        expire: 1 * 60 * 1000
    }
};

module.exports = config;