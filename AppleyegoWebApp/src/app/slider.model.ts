export class Slider {
    public _id: string='';
    public caption:string='';
    public image: string='';
    public link: string='';

    constructor(_id:string,caption:string,image:string,link:string){
            this._id=_id;
            this.caption=caption;
            this.image=image;
            this.link=link;
    }
}