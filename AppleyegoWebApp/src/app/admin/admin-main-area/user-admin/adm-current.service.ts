import { Adm } from "./adm.model";


export class AdmCurrentService{
    
    currentGuest:Adm=new Adm('','','','','','','','','','','');

    setAdmParams(adm:Adm){
        this.currentGuest = adm;
    }
    getAdmParams():Adm{
        return this.currentGuest;
    }
}