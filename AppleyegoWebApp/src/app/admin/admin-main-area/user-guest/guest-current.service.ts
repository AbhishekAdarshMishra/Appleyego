import { Guest } from "./guest.model";

export class GuestCurrentService{
    
    currentGuest:Guest=new Guest('','','','','','','','','','');

    setGuestParams(guest:Guest){
        this.currentGuest = guest;
    }
    getGuestParams():Guest{
        return this.currentGuest;
    }
}