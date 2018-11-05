module.exports ={
    
    byId: function(id){
        return {

        }
    },

    byAccount: function(account){

    },

    byAccountAndPassword: function(user){
        if(user.account === '1' && user.password ==='2'){
            return {
                account: user.account,
                password: user.password,
                name: 'aaa',
                nick:'bbb',
                birthday:'910714'
            };
        } else{
            return {}
        }
    }
};