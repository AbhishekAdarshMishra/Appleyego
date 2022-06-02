export class PathBackService {
    path: string='';

    onAddPath(getPath:string){
        this.path= getPath;
        // console.log(this.path);
    }

    getPath():string {
        return this.path;
        }

}