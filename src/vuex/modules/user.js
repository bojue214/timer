import map from '../map';
import i18n from '../../i18n/i18n';
import http from '../../plugins/http';

const user = {
    state:{
        name:'',
        birthday:'',
        account:'',
        password:'',
        token:'',
        language:''
    },

    mutations:{
        [map['user']['SET_USER']](state, user){
            state.name =        user.name;
            state.sex =         user.sex;
            state.birthday =    user.birthdayy;
            state.account =     user.account;
            state.password =    user.password;
            state.language =    user.language;
            state.token =       user.token;
        },

        [map['user']['SET_USER_NAME']](state, name){
            state.name = name;
        },

        [map['user']['SET_USER_BIRTHDAY']](state, birthday){
            state.birthday = birthday;
        },

        [map['user']['SET_USER_ACCOUNT']](state, account){
            state.account = account;
        },

        [map['user']['SET_USER_PASSWORD']](state, password){
            state.password = password;
        },

        [map['user']['SET_USER_TOKEN']](state, token){
            state.token = token;
        },

        [map['user']['SET_USER_LANGUAGE']](state, language){
            window.localStorage.removeItem('language');
            window.localStorage.setItem('language', language);
            state.language = language;
            i18n.locale = state.language;
        },
    },

    actions:{
        [map['user']['ACTION_USER_LANGUAGE']](context, language){
            context.commit('SET_USER_LANGUAGE', language);
        },
        
        /** ACTION_USER
         * get target user's infomations and set its information into vuex store
         * @param {store} context 
         * @param {object} user 
         */
        async [map['user']['ACTION_USER']](context, user){
            let res = await http({
                api: '/user/login',
                data: {
                    account: user.account,
                    password: user.password
                },
                token: false
            });

            if(res && res.data && res.data){
                context.commit('SET_USER', res.data.data);
            }
        },
    },

    getters:{
        [map['user']['GETTER_USER_LANGUAGE']](state){
            return function(){
                return state.language;
            }
        },
    }
};

export default user;