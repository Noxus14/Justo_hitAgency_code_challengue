class Hits {
    id = 0;
    hitName = "";
    description = "";
    status = "";
    managerId = 0;
    managerName = "";

    constructor(id, hitName, description, status, managerId, managerName){
        this.id = id;
        this.hitName = hitName;
        this.description = description;
        this.status = status;
        this.managerId = managerId;
        this.managerName = managerName;
    }

    get id(){
        return this.id;
    }

    set id(id){
        this.id = id;
    }

    get hitName(){
        return this.hitName;
    }

    set hitName(hitName){
        this.hitName = hitName;
    }

    get description(){
        return this.description;
    }

    set description(description){
        this.description = description;
    }

    get status(){
        return this.status;
    }

    set status(status){
        this.status = status;
    }

    get managerId(){
        return this.managerId;
    }

    set managerId(managerId){
        this.managerId = managerId;
    }

    get managerName(){
        return this.managerName;
    }

    set managerName(managerName){
        this.managerName = managerName;
    }

}

module.exports = Hits;