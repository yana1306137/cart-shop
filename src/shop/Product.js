export class Product {
    productName;
    productCode;
    productStock;
    description;
    price;
    picked;
    wish;
    subTotalPrice;

    constructor(productName, productCode, productStock, description, price, picked = 0, wish = false, subTotalPrice) {
        this.productName = productName;
        this.productCode = productCode;
        this.productStock = productStock;
        this.description = description;
        this.price = price;
        this.picked = picked;
        this.wish = wish;
        this.subTotalPrice = subTotalPrice;
    }
}