import commentAvatar from "../images/comment-avatar.png"

const CommentsListItem = ({comment}) => {

    return (
        <div className="d-flex align-items-start">
            <img className="me-2" src={commentAvatar} style={{width: '2rem'}} alt="..."/>
            <div className="ms-3">
                <div>
                    <span className="text-primary h5">{comment.createdBy.firstname}</span>
                    <span className="ms-4 text-secondary">{(new Date(comment.createdAt)).toLocaleString()}</span>
                </div>
                <p>{comment.text}</p>

            </div>
        </div>
    )
}

export default CommentsListItem