const config = require('./config');

const tokens = {};

const operation = {

    create(account){
        console.log('token:create:' + account);
        const time = new Date().getTime();
        const token = 'token:'+ Math.round( Math.random(10000) ) + time;
        tokens[token] = {
            token: token,
            account: account,
            createTime: time,
            updateTime: time,
            expireTime: time + config.token.expire
        };
        console.log('token:created:' + account + ':' + token);
        return tokens[token];
    },

    get(token){ return tokens[token]; },

    delete(token){ delete tokens[token]; },

    update(token){
        const time = new Date().getTime();
        if( tokens[token] ){
            tokens[token].updateTime = time;
            tokens[token].expireTime = time + config.token.expire;
        }
        return tokens[token];
    },

    verify(token){
        if( !operation.checkIsExist(token) ){
            return 0;
        }
        if( operation.checkIsExpire(token) ){
            return -1;
        }
        return 1;
    },

    checkIsExpire(token){
        return tokens[token].expireTime >= new Date().getTime();
    },

    checkIsExist(token){
        return tokens[token] ? true : false;
    },

    getTokenByAccount(account){
        for(let key in tokens){
            if(tokens[key].account == account){
                return tokens[key];
            }
        }
        return null;
    }
};

module.exports = operation;