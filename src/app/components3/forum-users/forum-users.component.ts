import { compileNgModule } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { post } from '../../models/post';
import { ForumService } from '../../services/forum.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forum-users',
  templateUrl: './forum-users.component.html',
  providers: [ForumService,AuthService],
  standalone: true,
  imports: [CommonModule,FormsModule],
  styleUrls: ['./forum-users.component.css']
})
export class ForumUsersComponent implements OnInit {

postObj:post=new post();
@ViewChild('chatWindow') chatWindow: ElementRef | undefined;
postData:any[]=[];
loggedUserId: number = 0;
isChat: boolean = false;


userData:any={
    
  "userId": 1,
  "userName": "Chetan",
  "email": "chetan@gmailc,om",
  "imageUrl": null,
  "createdDate": "2024-04-03T17:49:22",
  "password": "112233"
}

storedUserData:any={};
chatToUserId: number = 0;
charUserName: string = '';
chatObj: any = {
  "chatId": 0,
  "fromUserId": 0,
  "toUserId": 0,
  "createdDate": new Date(),
  "messages": ""
}

allChatHistory: any[]= [];
constructor(private forumService:ForumService,private router:Router,private auth: AuthService){
  const user = JSON.stringify(this.userData)
  const loggedUserId =  localStorage.getItem('id');
  if(loggedUserId != null) {
    this.loggedUserId =  Number(loggedUserId);
  }
  localStorage.setItem('user',user)

}
showChat(post:any) {
  debugger;
  this.charUserName =  post.userName;
  this.chatToUserId =  post.userId;
  this.chatObj.fromUserId =  this.loggedUserId;
  this.chatObj.toUserId = post.userId;
  this.isChat =  !this.isChat;
  this.getChatHistory(this.loggedUserId,post.userId)
   
}
getChatHistory(fromUser:number,toUser:number) {
  this.forumService.getAllChatHistory(fromUser,toUser).subscribe((res:any)=>{
    this.allChatHistory =  res.data;
   
    setTimeout(() => {
      debugger;
      if(this.chatWindow) {
        const objDiv = document.getElementById("chat-box");
        if(objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight;
        } 
      }
    }, 500);
   
    
  })
}

ngOnInit(): void { 
  this.getAllPost();
}


// Post Crud Start
getAllPost(){
  this.forumService.getAllPost(this.loggedUserId).subscribe((res:any)=>{
    this.postData=res.data;
  }) 
}
sendMessage() {
  this.forumService.sendMessage(this.chatObj).subscribe((res:any)=>{
     this.getChatHistory(this.loggedUserId,this.chatObj.toUserId);
  }) 
}

 onPostCraete(){
  this.postObj.userId=this.loggedUserId;
    this.forumService.createNewPost(this.postObj).subscribe((res:any)=>{
        alert(res.message);
        this.getAllPost();
        this.postObj=new post();
       
    })
 }

 likePost(postObj: any){
   const obj ={
    likeId: 0,
    postId:postObj.postId,
    userId: this.loggedUserId
   }
    this.forumService.likePost(obj).subscribe((res:any)=>{ 
      postObj.liked = 1;
       
    })
 }

 
 dislikePost(postObj: any){
  const obj ={
   likeId: 0,
   postId:postObj.postId,
   userId: this.loggedUserId
  }
   this.forumService.removelikePost(obj).subscribe((res:any)=>{ 
     postObj.liked = 0;
      
   })
}


 onEditPost(postid:number,userId:number){
  this.forumService.getPostByPostId(postid,userId).subscribe((res:any)=>{
    this.postObj=res.data
  })
 }

 getPostByPostID(postid:any){
    this.router.navigate(['postdetails',this.loggedUserId,postid])
 }

 updatePost(){
  this.forumService.updatePost(this.postObj).subscribe((res:any)=>{
    alert("Post Updated successfully");
    this.postObj=new post();
    this.getAllPost();
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

 onDeletePost(id:number){

  const confirm= window.confirm("Are You Sure You want Delete Post");
  if(confirm){
  this.forumService.deletePost(id).subscribe((res:any)=>{
      alert(res.message);
      this.getAllPost();
   })
 }
 }





}
