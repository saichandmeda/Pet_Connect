import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';
// import { post } from 'src/app/Core/Model/Classes/post';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  providers: [ForumService,AuthService],
  standalone: true,
  imports: [CommonModule,FormsModule],
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {

  
  allComment:any[]=[];
  parentComments:any[]=[];
  currentPostId:number=0
  currentUserId:number=0;

  
  showInput:boolean=false;
 
  commentObj:any={
    commentId: 0,
    postId: 0,
    parentCommentId: 0,
    comment: "",
    commentUserId: 0,
    commentDate: new Date(),
    isEdit:false
  }
  postObj:any={
    postId: 0,
    userName:"",
    email:"",
    userId: 0,
    postTitle:"",
    postDescription:"",
    createdDate: new Date(),
    isOpen: true,
    liked: 0,
    totalComments: 0,
    totalLikes: 0
   }
  
  
  loggedUserId: number = 0;
  constructor(private forumService:ForumService,private activatedRoute:ActivatedRoute,private router:Router,private auth: AuthService){
    const storedUserDataString = localStorage.getItem('user');
   
  const loggedUserId =  localStorage.getItem('id');
  if(loggedUserId != null) {
    this.loggedUserId =  Number(loggedUserId);
  }

  
  }
  
  ngOnInit(): void {
     this.activatedRoute.params.subscribe((id: any) => {
       if (id.postId && id.userId != null) {
         this.currentPostId = id.postId;
         this.currentUserId = id.userId;
         this.forumService
           .getPostByPostId(this.currentPostId, this.currentUserId)
           .subscribe((res: any) => {
             this.postObj = res.data;
           });
       }
     });
     this.getallCommentByPostId(this.currentPostId);
  }
  
  likePost(postObj: any){
    const obj = {
      likeId: 0,
      postId: postObj.postId,
      userId: this.loggedUserId,
    };
    this.forumService.likePost(obj).subscribe((res: any) => {
      postObj.liked = 1;
    });
  }
 
  
  dislikePost(postObj: any){
   const obj = {
     likeId: 0,
     postId: postObj.postId,
     userId: this.loggedUserId,
   };
   this.forumService.removelikePost(obj).subscribe((res: any) => {
     postObj.liked = 0;
   });
 }
  getChildComments(parentCommentId:number) {
   return  this.allComment.filter(m=>m.parentCommentId !==0 && m.parentCommentId == parentCommentId);
  }
  getallCommentByPostId(id:number){
    this.forumService.getAllCommentByPostId(id).subscribe((res:any)=>{
      this.allComment = res.data;
      this.parentComments =  this.allComment.filter(m=>m.parentCommentId ==0);
      console.log(this.allComment)
    })
   }


   logOut(){
     
    this.auth.signOut();
    
  }
  
  home(){
    const localData = localStorage.getItem('token');
    if (localData != null) {
      this.router.navigateByUrl('/home2')
      return true;
    } else {
      this.router.navigateByUrl('/home')
      // alert("Please Login First")
      return false;
    }
  }


  newComment(){
    this.commentObj.commentUserId=this.loggedUserId;
    this.commentObj.postId=this.currentPostId;
    this.forumService.addNewComment(this.commentObj).subscribe((res:any)=>{
      alert("Comment Added");
      this.commentObj={
        "commentId": 0,
        "postId": 0,
        "parentCommentId": 0,
        "comment": "",
        "commentUserId": 0,
        "commentDate": ""
      },
      this.getallCommentByPostId(this.currentPostId);
    })
   }


   onCommentEdit(obj:any){
    const comment = JSON.stringify(obj);
    this.commentObj= JSON.parse(comment);
   }

   updateComment(){
    this.forumService.updateComment(this.commentObj).subscribe((res:any)=>{
      alert(res.message);
      this.commentObj={
        "commentId": 0,
        "postId": 0,
        "parentCommentId": 0,
        "comment": "",
        "commentUserId": 0,
        "commentDate": ""
      },
      this.getallCommentByPostId(this.currentPostId);
    })
   }

   onCommentDelete(id:number){
    const confirm = window.confirm('Are you sure you want to delete..?');
    if (confirm) {
      this.forumService.deleteComment(id).subscribe((res: any) => {
        alert(res.message);
        this.getallCommentByPostId(this.currentPostId);
      });
    }
   }

   showReply(comment: any){
    comment.isEdit=true; 

    }
   reply(id:number){
   
    const Obj={
      commentId: 0,
      postId: this.currentPostId,
      parentCommentId: id,
      comment:this.commentObj.comment,
      commentUserId: this.loggedUserId,
      commentDate: new Date()
    }

    this.forumService.addNewComment(Obj).subscribe((res:any)=>{
        alert(res.message) 
         this.getallCommentByPostId(this.currentPostId);
      
         this.allComment.forEach(element => {
          element.isEdit =false;
         });
    })
   }
  
}
