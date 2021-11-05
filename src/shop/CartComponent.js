import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";

const CartComponent = () => {

    const history = useHistory();
    const [header] = useState(['Product Name', 'Product Code', 'Description', 'Qty', 'Price', 'Action']);
    const [myWishList, setMyWishList] = useState([]);

    useEffect(()=>{
        validationGetData();
    })

    const validationGetData = () => {
        if(myWishList.length === 0 && localStorage.getItem('productList') != null)
            setMyWishList(JSON.parse(localStorage.getItem('productList')));
    }
    
    const deleteProduct = (productCode)  => {
        let idx = myWishList.findIndex((wish) => wish.productCode === productCode);
        myWishList[idx].picked = 0;
        myWishList[idx].subTotalPrice = 0;
        myWishList[idx].wish = false;
        localStorage.setItem('productList', JSON.stringify(myWishList));
        setMyWishList(JSON.parse(localStorage.getItem('productList')));
    }

    const submitCart = () => {
        myWishList.forEach((wish, idx) => {
            if(wish.wish) process(idx, true);
        })
        localStorage.setItem('productList', JSON.stringify(myWishList));
        setMyWishList(JSON.parse(localStorage.getItem('productList')));
        history.push('/store');
    }

    const cancelCart = () => {
        myWishList.forEach((wish, idx) => {
            if(wish.wish) process(idx, false);
        })
        localStorage.setItem('productList', JSON.stringify(myWishList));
        setMyWishList(JSON.parse(localStorage.getItem('productList')));
        history.push('/store');
    }

    const process = (idx, submit) => {
        if(submit) myWishList[idx].productStock = myWishList[idx].productStock - myWishList[idx].picked;
        myWishList[idx].picked = 0;
        myWishList[idx].subTotalPrice = 0;
        myWishList[idx].wish = false;
    }

    return (
        <div  className='M-15px'>
        <div className='row'>
            <div className='col-sm-10'>
                <table className='table'>
                    <thead>
                        <tr>
                        {
                            header.map((header, idx) => {
                                return (
                                    <th className='form-label col-sm-2' key={idx}>{header}</th>
                                )
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myWishList.map((prd, idx) => {
                                console.log('load tbl', prd);
                                if(prd.wish)
                                return (
                                    <tr key={idx}>
                                        <td className='form-label col-sm-2'>{prd.productName}</td>
                                        <td className='form-label col-sm-2'>{prd.productCode}</td>
                                        <td className='form-label col-sm-2'>{prd.description}</td>
                                        <td className='form-label col-sm-2'>{prd.picked}</td>
                                        <td className='form-label col-sm-2'>{prd.subTotalPrice}</td>
                                        <td className='form-label col-sm-2'>
                                            <div className='col'>
                                                <button className='btn btn-primary'
                                                    onClick={()=>deleteProduct(prd.productCode)}>
                                                    DELETE</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                else return(<></>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='row'>
            <div className='col-sm-8'></div>
                <div className='col-sm-4'>
                        <div className='col-sm-5'>
                            <button className='btn btn-primary M-5px' onClick={cancelCart}>Cancel</button>
                            <button className='btn btn-primary M-5px' onClick={submitCart}>Submit</button>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default CartComponent