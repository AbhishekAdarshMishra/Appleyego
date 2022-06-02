import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Post } from 'src/app/post.model';
import { PoststorageService } from 'src/app/poststorage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catelog-box',
  templateUrl: './catelog-box.component.html',
  styleUrls: ['./catelog-box.component.css']
})
export class CatelogBoxComponent implements OnInit {
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>=new ElementRef('');

  public scrollRight(): void {
    this.panel.nativeElement.scrollTo({ left: (this.panel.nativeElement.scrollLeft + 307), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.panel.nativeElement.scrollTo({ left: (this.panel.nativeElement.scrollLeft - 307), behavior: 'smooth' });
  }
  @Input()
  elem!: { category: string; link: string; icon: string; };
  post:Post[] = [];
  url:string=environment.urlApi;
  post19:Post[] = [];
  
  constructor(private poststorageService: PoststorageService) { }
  ngOnInit(): void {
    this.post=this.poststorageService.getPostCategory(this.elem.link);
    this.post19=this.post.reverse();
    this.post19=this.post19.slice(0, 19);
  }
  

}
