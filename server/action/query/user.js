module.exports ={
    byAccount: function(account){
        if(account === '1'){
            return {
                account: account,
                password: '2',
                name: 'admin',
                nick:'3333333',
                birthday:'910714',
                help_number:'123456'
            };
        } else{
            return null;
        }
    }
};