import React, { useState } from 'react';
import { storage, db } from '../config/Config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        } else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();
        if (!productImg) {
            setError('Please select an image');
            return;
        }

        const storageRef = ref(storage, `product-images/${productImg.name}`);
        const uploadTask = uploadBytesResumable(storageRef, productImg);

        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message), async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            try {
                await addDoc(collection(db, 'Products'), {
                    ProductName: productName,
                    ProductPrice: Number(productPrice),
                    ProductImg: url
                });
                setProductName('');
                setProductPrice(0);
                setProductImg(null);
                setError('');
                document.getElementById('file').value = '';
            } catch (err) {
                setError(err.message);
            }
        });
    }

    return (
        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(Number(e.target.value))} value={productPrice} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" required
                    onChange={productImgHandler} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    )
}
export default AddProducts;
