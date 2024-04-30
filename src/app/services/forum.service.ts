import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forum } from '../helpers/forumConstant';


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  // apiStartPoint = "https://localhost:44355/api/youtube/";
  apiStartPoint ='https://localhost:7196/api/Forum/';

  constructor(private http:HttpClient) { }
 
  getAllForumUsers(){
    return this.http.get(this.apiStartPoint+forum.forumEndPoint.GetAllForumUsers);
  }
  getAllPost(userId:number){
    return this.http.get(this.apiStartPoint+forum.forumEndPoint.GetAllPost+'?userid='+ userId);
  }
  getPostByPostId(postId:number,userId:number){
    return this.http.get(this.apiStartPoint+`getPostByPostId?userId=${userId}&postid=${postId}`);
  }
  createNewPost(object:any){
    return this.http.post(this.apiStartPoint+forum.forumEndPoint.createNewPost,object);
  }

  updatePost(object:any){
    return this.http.put(this.apiStartPoint+forum.forumEndPoint.updatePost,object);

  }
  deletePost(id:number){
    return this.http.delete(this.apiStartPoint+forum.forumEndPoint.deletePost+id);

  }

  likePost(object:any){
    return this.http.post(this.apiStartPoint+forum.forumEndPoint.likePost,object);

  }
  removelikePost(object:any){
    return this.http.post(this.apiStartPoint+forum.forumEndPoint.removelikePost,object);

  }
  getAllCommentByPostId(id:number){
    return this.http.get(this.apiStartPoint+forum.forumEndPoint.GetAllCommentByPostId+id);

  }
  addNewComment(object:any){
    return this.http.post(this.apiStartPoint+forum.forumEndPoint.addNewComment,object);

  }
  updateComment(object:any){
    return this.http.put(this.apiStartPoint+forum.forumEndPoint.updateComment,object);

  }
  deleteComment(id:number){
    return this.http.delete(this.apiStartPoint+forum.forumEndPoint.deleteComment+id);

  }
  sendMessage(obj:any){
    return this.http.post(this.apiStartPoint+forum.forumEndPoint.sendMessage, obj); 
  }
  getAllChatHistory(fromUser:number,toUser: number){
    return this.http.get(this.apiStartPoint+forum.forumEndPoint.getCharHistory+"?fromUserId="+fromUser+"&touserId="+toUser);

  }
}
