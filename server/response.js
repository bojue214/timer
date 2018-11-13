const messages = {
    '0': 'ACCOUNT_NULL',
    '1': 'PASSWORD_ERROR',
    '2': 'LOGIN_SUCCESS',
};

const mapping = {
    'ACCOUNT_NULL': '0',
    'PASSWORD_ERROR': '1',
    'LOGIN_SUCCESS': '2'
};

module.exports = {
    format(key, data) {
        let status = null;
        let message = null;
        if(typeof key === 'string'){
            status = mapping[key];
            message = key;
        } else {
            status = key.toString();
            message = messages[status];
        }
        return {
            status: status,
            data: data,
            message: message
        };
    }
};