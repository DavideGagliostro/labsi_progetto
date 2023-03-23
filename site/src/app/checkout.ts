export class Checkout {
    id?: number;
    name?: string;
    bar_code?: string;
    description?: string;
    price?: number;
    quantity?: number;
    barcodeg?: string;
    image?: string;
    iduser?: string;



    constructor(id?: number,name?: string,bar_code?:string,description?: string, price?: number, quantity?: number, barcodeg?: string,image?: string,iduser?:string){
        this.id=id;
        this.name = name;
        this.bar_code = bar_code;
        this.description= description;
        this.price= price;
        this.quantity=quantity;
        this.barcodeg=barcodeg;
        this.image=image;
        this.iduser=iduser;
    }
}
