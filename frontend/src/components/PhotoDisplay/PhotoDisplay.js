import React, { useState, useContext } from 'react'
import './PhotoDisplay.css'
import axios from 'axios';
import UseContext from '../../Context/UseContext';
import { useDispatch } from 'react-redux'
import { authActions } from '../../Store';
import { ToastContainer, toast } from 'react-toastify';
import Empty from '../Empty/Empty'

axios.defaults.withCredentials = true;

const PhotoDisplay = () => {
    const dispatch = useDispatch();
    const [download, setDownload] = useState('Download');
    const { user, setUser } = useContext(UseContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState();
    const handleImageClick = (image) => {
        dispatch(authActions.blur());
        setSelectedImage(image);
    };

    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const showToastMessageE = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const handleClose = () => {
        dispatch(authActions.nblur());
        setDownload("Download");
        setSelectedImage(null);
    };

    const handleDelete = async (imageId) => {
        try {
            setLoading("Loading");
            const res = await axios.post('http://localhost:4000/deleteimage', { imageId });
            if (res.status === 400) {
                setLoading(null);
                console.log(res.data.message);
            } else {
                setLoading(null);
                setUser(res.data.user);
                handleClose();
            }
        } catch (error) {
            setLoading(null);
            console.error('Error during fetching:', error);
        }
    };

    const showDialog = () => {
        const body = document.body;
        body.style.position = 'fixed';
    };
    const closeDialog = () => {
        const body = document.body;
        body.style.position = '';
    }

    if (selectedImage) {
        showDialog();
    } else {
        closeDialog();
    }
    const btStyle = () => {
        return {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }
    }
    const handleDownload = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${user.name}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setDownload("Downloaded");
            showToastMessage("Downloaded Successfully !");
        } catch (error) {
            showToastMessageE("Error in Downloading !");
            console.error('Error during fetching:', error);
        }
    }
    return (
        <div>
            {user.images.length !== 0 && (
                <div className='gallery-heading'>
                    <div className='gallery1'>
                        {(user.images).map((url, index) => (
                            <div key={index} className="image-item">
                                <img onClick={() => { handleImageClick(url) }} src={url.imgUrl} alt={''} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {user.images.length === 0 && (
                <Empty />
            )}
            {selectedImage && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={selectedImage.imgUrl} onClick={() => handleImageClick(selectedImage)} alt='' className="modal-image" />
                        <div className='controls'>
                            <button onClick={() =>
                                handleDelete(selectedImage._id)} style={btStyle()}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="icons" viewBox="0 0 16 16" color='red'>
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>Delete</button>
                            {loading && <div className="loader-wrapper">
                                <div className="loader"></div>
                            </div>}
                            <button onClick={handleClose} style={btStyle()}><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="icons" viewBox="0 0 16 16" color='red'>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>Close</button>
                            {download === 'Downloaded' && <button style={btStyle()}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="icons" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg>{download}</button>}
                            {download !== 'Downloaded' && <button onClick={() => handleDownload(selectedImage.imgUrl)} style={btStyle()}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="icons" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg>{download}</button>}
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}

export default PhotoDisplay