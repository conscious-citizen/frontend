export class User {
    firstName: string = '';
    lastName: string = '';
    patronymic: string = '';
    phoneNumber: string = '';
    eMail: string = '';
    city: string = '';
    street: string = '';
    login: string = '';
    password: string = '';

    constructor(firstName: string, lastName: string, patronymic: string,
                phoneNumber: string,
                eMail: string,
                city: string,
                street: string,
                login: string,
                password: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
        this.phoneNumber = phoneNumber;
        this.eMail = eMail;
        this.city = city;
        this.street = street;
        this.login = login;
        this.password = password;
    }

}
