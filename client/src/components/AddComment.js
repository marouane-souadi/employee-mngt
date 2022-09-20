import {useState} from "react";

const AddComment = ({onAdd}) => {

    const [comment, setComment] = useState()

    const onSubmit = (e) => {
        e.preventDefault()
        onAdd(comment).then(() => {
            setComment('')
        })
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <textarea className="form-control" id="comment" rows="3"
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                >
                </textarea>
            </div>
            <div className="text-end">
                <button className="btn btn-primary">Add</button>
            </div>
        </form>
    )
}

export default AddComment