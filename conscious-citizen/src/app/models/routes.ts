const PORT = '8086'

export const API_ROUTES = {
    LOCAL_URL:'http://localhost:4200',
    LOGIN_URL: 'http://localhost:'+PORT+'/auth/login',
    REGISTRATION_URL: 'http://localhost:'+PORT+'/auth/registration',
    FORGOT_PASSWORD_URL: 'http://localhost:'+PORT+'/forgot_password',
    RESET_PASSWORD_URL: 'http://localhost:'+PORT+'/forgot_password/reset_password/',
    GET_USER_INFO: 'http://localhost:'+PORT+'/user',
    UPDATE_USER_INFO: 'http://localhost:'+PORT+'/user/update',
    GET_ALL_EVENTS: 'http://localhost:'+PORT+'/event',
    GET_EVENT_BY_ID: 'http://localhost:'+PORT+'/event?id={id}',
    CREATE_INCIDENT: 'http://localhost:'+PORT+'/event',
}
