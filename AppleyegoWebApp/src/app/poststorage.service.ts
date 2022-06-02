import { Subject } from "rxjs";
import { Post } from "./post.model";

export class PoststorageService{
    public posts:Post[]=[];
    public postsUpdated =new Subject<Post[]>();
    public postCategory:Post[]=[];

    setEmpty(){
        this.posts=[];
    }
    setPosts(_id:string,title: string,subtitle: string,category: string,classs: string,startDate: string,endDate: string,applyLink: string[],author: string, importantInformation: string,details: string,howTo: string,someInfo: string, links: string,image: string){
        this.posts.push(new Post(_id,title,subtitle,category,classs,startDate?startDate.split("T",1)[0]:startDate,endDate?endDate.split("T",1)[0]:endDate,applyLink,author, importantInformation,details,howTo,someInfo,links,image));
    }
    getPosts():Post[]{
        return this.posts;
    }
    getPostCategory(category:string):Post[]{
        this.getPosts();
        this.postCategory =[];
        for(let post of this.posts){
            if(post.category===category){
                this.postCategory.push(post);
            }
        }
        return this.postCategory;
    }
    getPostUpdateListner(){
        return this.postsUpdated.asObservable();
    }
    delPost(id:string){
        const updatedposts=[...this.posts];
        const delIndex= this.posts.findIndex(p=>p._id === id);
        updatedposts.splice(delIndex, 1);
        this.posts = updatedposts;

        this.postsUpdated.next([...this.posts]);
    }
    updatePost(id:string,newPost:Post){
        const updatedposts=[...this.posts];
        const delIndex= this.posts.findIndex(p=>p._id === id);
        updatedposts[delIndex] = newPost;
        this.posts = updatedposts;
        this.postsUpdated.next([...this.posts]);
    }

    updateImg(id:string,newPost:Post){
        const updatedposts=[...this.posts];
        const delIndex= this.posts.findIndex(p=>p._id === id);
        updatedposts[delIndex] = newPost;
        this.posts = updatedposts;
        this.postsUpdated.next([...this.posts]);
    }

    addPost(newPost:Post) {
        const updatedposts=[...this.posts];
        updatedposts.push(newPost);
        this.posts = updatedposts;
        this.postsUpdated.next([...this.posts]);
    }
}