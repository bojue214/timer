const userQuery = require('../action/query/user');
const res = require('../response');
const tokens = require('../token');

module.exports = {
    login(account, password){
        let user = userQuery.byAccount(account);
        if(user){
            if(user.password == password){
                if(tokens.get(user.account)){
                    user.token = tokens.update(user.account);
                } else {
                    user.token = tokens.create(user.account);
                }
                return res.format('LOGIN_SUCCESS', user);
            } else {
                return res.format('PASSWORD_ERROR', null);
            }
        } else {
            return res.format('ACCOUNT_NULL', null);
        }
    }
};