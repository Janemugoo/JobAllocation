export class Comment {
    public commentDate: Date;
    public content: string;

    constructor (
        commentDate:Date,
        content: string,
    ) {
        this.commentDate=commentDate;
        this.content=content;
 
    }
createComment() {}
deleteComment() {}
updateComment() {}
retriveComment() {}

}