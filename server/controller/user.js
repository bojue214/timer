const query = require('../action/query/user');

module.exports = {
    login(account, password){
        return query.byAccountAndPassword(account, password);
    }
};