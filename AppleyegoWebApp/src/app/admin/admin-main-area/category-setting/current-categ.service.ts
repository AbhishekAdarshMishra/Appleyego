import { Post } from "src/app/post.model";

export class CurrentCategService{
    
    currentCateg:{_id:string;category:string; link: string;icon:string}={_id:'',category:'',link:'',icon:''};

    setCategParams(icon:{_id:string;category:string; link: string,icon:string}){
        this.currentCateg._id = icon._id;
        this.currentCateg.category =icon.category;
        this.currentCateg.link = icon.link;
        this.currentCateg.icon = icon.icon;
        
    }
    getCategParams():{_id:string;category:string; link: string;icon:string}{
        return this.currentCateg;
    }
}