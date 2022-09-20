import CommentsListItem from "./CommentsListItem";

const CommentsList = ({comments}) => {
    return (
        <div className="mt-4">
            {
                comments.map(comment => <CommentsListItem key={comment.id} comment={comment}/>)
            }
        </div>
    )
}

export default CommentsList