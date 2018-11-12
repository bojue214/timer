const config = require('./config');

const tokens = {};
const mapping = {};

const operation = {

    /** create
     * create a token info by an account
     * @param {string} account 
     */
    create(account){
        //console.log('token:create:' + account);
        const time = new Date().getTime();
        const token = 'token:'+ Math.round( Math.random()*1000000 ) + time;
        mapping[account] = {
            token: token,
            account: account,
            createTime: time,
            updateTime: time,
            expireTime: time + config.token.expire
        };
        tokens[token] = mapping[account];
        //console.log('token:created:' + account + ':' + token);
        return JSON.parse( JSON.stringify(tokens[token]) );
    },

    /** get
     * get a token info by an account or a token string.
     * @param {string} key 
     */
    get(key){ return key.length > 20 ? tokens[key] : mapping[key]; },

    delete(key){
        if( key.length > 20 ){
            delete mapping[tokens[key].account];
            delete tokens[key];
        } else {
            delete tokens[mapping[key].token];
            delete mapping[key];
        } 
    },

    /** update
     * reflesh a token info(update its expireTime)
     * @param {string} key 
     */
    update(key){
        let ref = key.length > 20 ? tokens[key] : mapping[key];
        const time = new Date().getTime();
        ref.updateTime = time;
        ref.expireTime = time + config.token.expire;
        return JSON.parse( JSON.stringify(ref) );
    },

    /** expire
     * make a token expired
     * @param {string} token 
     */
    expire(token){
        tokens[token].expireTime = new Date().getTime();
        return JSON.parse( JSON.stringify(tokens[token]) );
    },

    /** verify
     * check a token which is valid. 1: vaild token, 0: not exist, -1: expired
     * @param {string} token 
     */
    verify(token){
        if( !operation.checkIsExist(token) ){
            return 0;
        }
        if( operation.checkIsExpire(token) ){
            return -1;
        }
        return 1;
    },

    /** checkIsExpire
     * check a token which is expired.
     * @param {string} token 
     */
    checkIsExpire(token){
        return tokens[token].expireTime <= new Date().getTime();
    },

    /** checkIsExist
     * check a token which is exist.
     * @param {string} token 
     */
    checkIsExist(token){
        return tokens[token] ? true : false;
    }
};

module.exports = operation;