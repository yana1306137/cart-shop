import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import { Product } from "./Product";

const StoreComponent = () => {

    const [productList, setProductList] = useState([]);
    const [header] = useState(['Product Name', 'Product Code', 'Product Stock', 'Description', 'Price','Action' ]);

    useEffect(()=>{
        validationGetData();
    })

    const validationGetData = () => {
        if(productList.length === 0 && localStorage.getItem('productList') == null) cekUploadFile();
        else if(productList.length === 0) setProductList(JSON.parse(localStorage.getItem('productList')));
    }

    const cekUploadFile = () => {
        const data = document.getElementById('upload');
        if(data)
        data.addEventListener('change', () => { 
            readXlsxFile(data.files[0]).then((brg, idx) => { 
                successUploadData(brg);
        })})

    }
    const successUploadData = (data) => {
        const noDuplicateDataBarang = [];
        data.forEach((prd, idx) => {
            if(idx !== 0) {
                let index = noDuplicateDataBarang.findIndex(t => t[1] === prd[1]);
                prd[2] = parseInt(prd[2]);
                if(index === -1) noDuplicateDataBarang.push(prd);
                else {
                    let baru = noDuplicateDataBarang[index];
                    baru[2] = parseInt(baru[2]) + parseInt(prd[2]);
                    noDuplicateDataBarang.splice(index, 1, baru);
                }
            }
        })
        const tempProductList = [];
        noDuplicateDataBarang.forEach((prd, id)=>{
            tempProductList.push(new Product(prd[0], prd[1], prd[2], prd[3], prd[4]));
        })
        setProductList(tempProductList);
        localStorage.setItem('productList', JSON.stringify(tempProductList));
    }

    const setQty = (idx, add) => {
        if(!add) productList[idx].picked = productList[idx].picked - 1;
        if(add) productList[idx].picked = productList[idx].picked + 1;
        productList[idx].subTotalPrice = productList[idx].picked  * productList[idx].price;
        if(productList[idx].picked < 1) productList[idx].wish = false;
        else productList[idx].wish = true;
        localStorage.setItem('productList', JSON.stringify(productList));
        setProductList(JSON.parse(localStorage.getItem('productList')));
    }

    return (
        <div  className='M-15px'>
            <div className='row'>
                <div className='col-sm-6'></div>
                <div className='col-sm-4'>
                    <input className='form-control' type='file' id='upload'
                    accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'/>
                </div>
                <div className='col-sm-2'></div>
            </div>
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
                                productList.map((prd, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td className='form-label col-sm-2'>{prd.productName}</td>
                                            <td className='form-label col-sm-2'>{prd.productCode}</td>
                                            <td className='form-label col-sm-2'>{prd.productStock}</td>
                                            <td className='form-label col-sm-2'>{prd.description}</td>
                                            <td className='form-label col-sm-2'>{prd.price}</td>
                                            <td className='form-label col-sm-2'>
                                                <div className='row'>
                                                    <div className='col-sm-3'>
                                                        <button className='btn btn-primary'
                                                            onClick={()=>setQty(idx, false)}
                                                            disabled={prd.picked < 1}>
                                                        -</button>
                                                    </div>
                                                    <div className='col-sm-5'>
                                                        <input readOnly className='form-control col-sm-1'
                                                            type='text'
                                                            id={prd.productCode} 
                                                            value={prd.picked}/>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <button className='btn btn-primary'
                                                            onClick={()=>setQty(idx, true)}
                                                            disabled={prd.picked > prd.productStock}>
                                                            +</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StoreComponent