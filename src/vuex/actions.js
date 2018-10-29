import map from './map';

const actions = {
    [map['ACTION_LANGUAGE']](context, language){
        context.commit(map['SET_LANGUAGE'], language);
    },
};

export default actions;