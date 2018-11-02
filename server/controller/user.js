const userQuery = require('../action/query/user');

module.exports = {
    login(account, password){
        return userQuery.byAccountAndPassword(account, password);
    }
};