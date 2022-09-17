import {useState} from "react";
import axios from "axios";
import {useAuth} from "../hooks/auth";
import {useNavigate} from "react-router-dom";

const UploadCSV = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const auth = useAuth()

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
        setError('')
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setError('')
        const formData = new FormData();
        formData.append("csv", selectedFile);

        setIsLoading(true)
        axios({
            method: 'post',
            url: '/api/employees/import-csv',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${auth.user.token}`,
            },
        })
            .then(() => navigate('/'))
            .catch(err => {
                console.log(err)
                if (err.response && err.response.status === 401) {
                    auth.setCurrentUser(null)
                }
                if (err.response) {
                    setError(err.response.data.message)
                } else {
                    setError(err.message)
                }
            }).finally(() => setIsLoading(false))
    }
    return (
        <section className="py-4 px-3" >
            <h1>Import CSV File</h1>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form className="my-4" onSubmit={onSubmit}>
                <div className="mb-3" style={{maxWidth: '40rem'}}>
                    <label htmlFor="formFile" className="form-label">Please Select a file</label>
                    <input className="form-control" name="csv" type="file" accept=".csv" id="csv" onChange={handleFileSelect}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!selectedFile}>
                    Upload
                </button>
            </form>
        </section>
    )
}

export default UploadCSV