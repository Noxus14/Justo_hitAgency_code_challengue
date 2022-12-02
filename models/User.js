class User {

    id = 0;
    idRole = 0;
    name = "";
    email = "";
    password = "";

    constructor(id, idRole, name, email, password){
        this.id = id;
        this.idRole = idRole;
        this.name = name;
        this.email = email;
        this.password = password;
    }


    get id(){
        return this.id;
    }

    set id(id){
        this.id = id;
    }

    get idRole(){
        return this.idRole;
    }

    set idRole(idRole){
        this.idRole = idRole;
    }

    get name(){
        return this.name;
    }

    set name(name){
        this.name = name;
    }

    get email(){
        return this.email;
    }

    set email(email){
        this.email = email;
    }

    get password(){
        return this.password;
    }

    set password(password){
        this.password = password;
    }

}

module.exports = User;