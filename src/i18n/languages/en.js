import enLocale from 'element-ui/lib/locale/lang/en';

const en = {
    languages:{
        'zh': '简体中文',
        'en': 'English'
    },
    Account: 'Account',
    account: 'account',
    Password: 'Password',
    password: 'password',
    Login: 'Login',
    login: 'login',
    select_language: 'Language',
    welcome: 'Welcome, ',
    redirect: 'redirecting...',
    Forget:'Forget...',
    $vali:{
        noAccount: 'Please input your account.',
        noPassword: 'Please input your password.',
        phone: "It's not a correct phone number",
    },
    message:{
        ACCOUNT_NULL: 'Account not exist',
        PASSWORD_ERROR:'Incorrect password',
    },
    ...enLocale
}

export default en;