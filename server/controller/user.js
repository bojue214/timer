const userQuery = require('../action/query/user');
const response = require('../response');
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
                return response.format('LOGIN_SUCCESS', user);
            } else {
                return response.format('PASSWORD_ERROR', null);
            }
        } else {
            return response.format('ACCOUNT_NULL', null);
        }
    }
};