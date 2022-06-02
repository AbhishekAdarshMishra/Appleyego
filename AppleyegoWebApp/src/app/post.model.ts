export class Post {
    public _id:string='';
    public title: string='';
    public subTitle: string='';
    public category: string='';
    public class: string='';
    public startDate: string='';
    public endDate: string='';
    public applyLink: string[]=[];
    public author: string='';
    public importantInformation: string='';
    public details: string='';
    public howTo: string='';
    public someInfo: string='';
    public links: string='';
    public image: string='';
    constructor(_id:string,title: string,subtitle: string,category: string,classs: string,startDate: string,
        endDate: string,applyLink: string | string[],author: string, importantInformation: string,details: string,
        howTo: string,someInfo: string, links: string, image:string){
            this._id=_id;
        this.title=title;
        this.subTitle=subtitle;
        this.category=category;
        this.class=classs;
        this.startDate=startDate;
        this.endDate=endDate;
        this.author=author;
        this.importantInformation=importantInformation;
        this.details=details;
        this.howTo=howTo;
        this.someInfo=someInfo;
        this.links=links;
        this.image=image;
        if(typeof applyLink ==="string")
        {
            this.applyLink=applyLink.split(",");
        }
        else{
            this.applyLink=applyLink;
        }
    }
}