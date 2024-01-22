import React, { useState, useContext } from 'react'
import axios from 'axios';
import icon from './add_drop.png';
import './AddItem.css'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UseContext from '../../Context/UseContext';
axios.defaults.withCredentials = true;
let upload = icon;
const AddItem = () => {
    const [loading, setLoading] = useState();
    const [myfile, setmyFile] = useState();
    const { setUser } = useContext(UseContext);

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
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const imageUpdate = async (e) => {
        const file = e.target.files[0];
        upload = await convertToBase64(file);
        setmyFile(upload);
    };

    const postItems = async (e) => {
        e.preventDefault();
        try {
            if (!myfile) {
                showToastMessageE("You have not Selected the Image!");
                return;
            }
            setLoading("Loading");
            const formData = new FormData();
            formData.append('myFile', myfile);
            const res = await axios.post('http://localhost:4000/addimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(null);
            if (res.status === 200) {
                setUser(res.data.user);
                showToastMessage("File uploaded successfully !");
                setmyFile(null);
                upload = icon;
            } else {
                showToastMessageE("Failed to upload file !");
                console.error('Failed to upload file');
            }
        } catch (error) {
            setLoading(null);
            console.error('Error in uploading file: ', error);
            showToastMessageE("Error in uploading file !");
        }
    };
    return (
        <>
            <div className='hero'>
                <label className='input-file' id='drop-area'>
                    <input
                        onChange={(e) => imageUpdate(e)}
                        type='file'
                        accept='image/*'
                        name='myFile'
                        id='input-file'
                        hidden
                    />
                    <div className='img-view'>
                        {upload === icon && <img src={upload} height={150} width={200} alt='' />}
                        {upload !== icon && <img src={upload} height={155} width={356} alt='' />}
                    </div>
                </label>
                <div className='upload'>
                    <button
                        type='submit'
                        onClick={postItems}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="icons" viewBox="0 0 16 16" color='white'>
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                        </svg>
                        Upload
                    </button>
                    {loading && <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>}
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

export default AddItem
