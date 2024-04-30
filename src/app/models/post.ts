export class post{
    postId: number;
    userId: number;
    postTitle: string;
    postDescription: string;
    createdDate: Date;
    isOpen: boolean;
    modifiedDate: Date;
    liked: number;
    totalComments: number;
    totalLikes: number

    constructor(){
        this.postId=0;
        this.userId=0;
        this.postTitle= '';
        this.postDescription= '';
        this.createdDate= new Date();
        this.isOpen= true;
        this.modifiedDate= new Date();
        this.liked=0;
        this.totalComments=0;
        this.totalLikes=0;
    }
  }