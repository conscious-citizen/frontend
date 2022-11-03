export enum INPUT_TYPES {
    LOGIN,
    EMAIL,
    PASSWORD,
    REPEAT_PASSWORD,
    PHONE_NUMBER,
    FULL_NAME,
    CITY,
    STREET,
    BUILDING,
    LETTER,
    FLAT_NUMBER
}

export interface Tooltip {
    isShow: boolean;
    tooltipText: string;
}

export type Tooltips = {
    [key: string]: Tooltip
}

export const INPUT_TOOLTIP_ERROR_MESSAGES = {
    required: 'Поле обязательно для заполнения! ',
    maxLength: 'Поле превышает допустимую длину: {value}! ',
    minLength: 'Поле меньше минимальной длины: {value}! ',
    pattern: 'Поле должно иметь формат: {value} ! ',
    email: 'Введите корректный email в формате: example@mailbox.com',
    password: 'Значение пароля и его повтора не совпадает'
}

export enum ROLES {
    'USER',
    'ADMIN',
}
export const KEYS = {
    TOKEN: 'AuthToken',
    USERNAME: 'AuthUsername',
    AUTHORITIES: 'AuthAuthorities',
    TOKEN_HEADER: 'Authorization',
    TOKEN_TYPE: 'AuthTokenType',
}

