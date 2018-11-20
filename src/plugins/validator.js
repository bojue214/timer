import i18n from '../i18n/i18n';

/** REGEX
 * regEx defined variables map
 */
const REGEX = {
    phone: /^1[3|4|5|7|8][0-9]\d{8}$/,
    notEmpty: /\r|\n|\\s/g,
    helpNumber: /^[A-Za-z0-9]{6}$/,
    password: /^[A-Za-z0-9]{6,20}$/,
    account: /^[A-Za-z0-9]{8,16}$/,
};

const getValue = function(context, chains){
    if(chains.indexOf('.') === -1){
        return context[chains];
    } else {
        chains.split('.').forEach(function(v){ context = context[v]; });
        return context;
    }
};

/** CHECK
 * validate functions list
 */
const CHECK = {
    phone(val){ return REGEX['phone'].test(val); },
    notEmpty(val){ return val.replace(REGEX.empty, '') !== ''; },
    helpNumber(val){ return REGEX['helpNumber'].test(val); },
    equal(val, context, property){ return val === getValue(context, property); },
    password(val){ return REGEX['password'].test(val); },
    account(val){ return REGEX['account'].test(val); },
};

/** validator
 * validate factory
 * @param {string} ruleKey rule regEx key
 * @param {string} messageKey i18n key
 * @param {object} context  scope
 * @param {string} property tobe property
 */
const validator = function(ruleKey, messageKey, context, property, after){
    return function(rule, value, callback){
        if( !CHECK[ruleKey](value, context, property) ){ 
            callback( new Error(i18n.t(messageKey)) );
        } else {
            callback();
            after && after.call( context ? context : null );
        }
    };
};

/** install
 *  vue install function
 * @param {object} Vue  Vue
 */
validator.install = function(Vue){
    Vue.prototype.$vali = validator;
};

export default validator;