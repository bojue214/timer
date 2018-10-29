import map from './map';

const getters = {
    [map['GETTER_LANGUAGE']](state){
        if( state.language ){
            return state.language;
        }
        let lang = window.localStorage.getItem('language');
        if(lang !== undefined && lang !== 'undefined'){
            this.$store.dispatch('ACTION_LANGUAGE', lang);
            return lang;
        }
        return state.language;
    }
};

export default getters;