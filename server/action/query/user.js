module.exports ={
    id: function(id){
        return {

        }
    },

    account: function(account){

    },

    byAccountAndPassword: function(user){
        user = user || {};
        user.account = "11";
        user.account = "22";
        if(user.account && user.password){
            return {
                account: user.account,
                password: user.password,
                name: 'aaa',
                nick:'bbb',
                birthday:'910714'
            };
        }
    }
};