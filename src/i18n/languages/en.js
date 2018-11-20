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
    RepPassword: 'Repeat Password',
    rep_password: 'repeat password',
    Login: 'Login',
    login: 'login',
    Language: 'Language',
    Welcome: 'Welcome, ',
    redirect: 'redirecting...',
    Forget:'Forget...',
    Reset: 'Reset',
    Help_Number: 'Help Number',
    help_number: 'help number',
    Submit: 'Submit',
    $vali:{
        noHelpNumber: 'Please input your help number.',
        noAccount: 'Please input your account.',
        noPassword: 'Please input your password.',
        phone: "It's not a correct phone number",
        noReptPassword: 'Please repeat your password.',
        helpNumber: 'Help number must be six charactor.',
        twoPassword: 'The two passwords you typed do not match.',
        password: 'A password need several charactors from six to twenty.',
        account:'An account need several charactors from eight to sixteen.',
    },
    message:{
        ACCOUNT_NULL: 'Account not exist',
        PASSWORD_ERROR:'Incorrect password',
    },
    ...enLocale
}

export default en;