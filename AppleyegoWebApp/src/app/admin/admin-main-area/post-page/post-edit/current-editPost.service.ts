import { Post } from "src/app/post.model";

export class CurrentEditPostService{
    
    currentPost:Post=new Post('','','','','','','','','','','','','','','');

    setPostParams(post:Post){
        this.currentPost._id = post._id;
        this.currentPost.title = post.title;
        this.currentPost.subTitle = post.subTitle;
        this.currentPost.category= post.category;
        this.currentPost.class= post.class;
        this.currentPost.startDate = post.startDate;
        this.currentPost.endDate = post.endDate;
        this.currentPost.applyLink = post.applyLink;
        this.currentPost.author = post.author;
        this.currentPost.importantInformation= post.importantInformation;
        this.currentPost.details= post.details;
        this.currentPost.howTo=post.howTo;
        this.currentPost.someInfo=post.someInfo;
        this.currentPost.links= post.links;
        this.currentPost.image=post.image;
        
    }
    getPostParams():Post{
        return this.currentPost;
    }
}