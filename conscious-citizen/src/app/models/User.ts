import {ROLES} from "./constants";

export class User {
    firstName: string = '';
    lastName: string = '';
    patronymic: string = '';
    phoneNumber: string = '';
    email: string = '';
    city: string = '';
    street: string = '';
    login: string = '';
    password: string = '';
    /*house: string = '';
    apartament?: string = '';*/

    constructor(firstName: string,
                lastName: string,
                patronymic: string,
                phoneNumber: string,
                email: string,
                city: string,
                street: string,
                /*house: string,*/
                login: string,
                password: string,
                /*apartament?: string*/
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.city = city;
        this.street = street;
        this.login = login;
        this.password = password;
        /*this.house = house;
        this.apartament = apartament;*/
    }

}

export type LoggedUser = {
    id: string,
    role: [],
    token: string,
    type: string,
    username: string
}

export type UserInfo = {
    flatNumber: string
    city: string
    email: string
    fullName: string
    login: string
    phoneNumber: number
    street: string
    building: string
    letter: string
}

export type UserInfoForUpdate = {
    firstName: string,
    lastName: string,
    patronymic: string,
    phoneNumber: string,
/*email:string,*/
    /*house: string,
    apartament: string*/
    city: string,
    street: string,
    login: string,
    /*password: string,*/
}
