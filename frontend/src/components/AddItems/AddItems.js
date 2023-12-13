import React, { useState } from 'react'
import './AddItems.css'
import icon from './add_drop.png'
const AddItems = (props) => {

    let URL = 'http://localhost:4000/Fupload';
    if (props.found) URL = 'http://localhost:4000/Lupload';

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const [data, setData] = useState({
        myFile: ""
    });
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const newData = { ...data };
        newData[e.target.name] = await convertToBase64(file);
        setData(newData);
        icon = newData.myFile;
    }
    const postItems = async (e) => {
        e.preventDefault();
        const newData = { ...data };
        const myFile = newData.myFile;
        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    myFile
                })
            });
            console.log(res);
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }
    return (
        <div className='hero'>
            <label className='input-file' id='drop-area'>
                <input onChange={(e) => handleUpload(e)} type='file' accept='image/*' name='myFile' id='input-file' hidden />
                <div className='img-view'>
                    <img src={icon} height={150} width={200} alt='' />
                    <p>Drag and drop or click here</p>
                    <span>to upload Image</span>
                </div>
                <button type='submit' onClick={postItems}>Submit</button>
            </label>
        </div >
    )
}

export default AddItems

