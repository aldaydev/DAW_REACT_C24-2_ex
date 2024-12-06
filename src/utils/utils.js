const getCount = (product, index, operation, id)=>{
    const updatedProduct = {...product};

    if(operation === 'sumar'){

        updatedProduct.count = parseInt(product.count) + 1;
        localStorage[id] = JSON.stringify(updatedProduct);

    }else if(operation === 'restar'){

        if(updatedProduct.count > 0){
            updatedProduct.count = parseInt(product.count) - 1;
            localStorage[id] = JSON.stringify(updatedProduct);
        }else if(updatedProduct.count === 0){
            localStorage.removeItem(id);
        }
    }
    return updatedProduct;
}


const cartProds = (product)=>{
    if(!localStorage[product.id]){
        localStorage[product.id] = JSON.stringify(product);
    }
}

const calcTaxes = (price) =>{
    let priceTaxes = price * 0.21;
    return priceTaxes + price;
}

export {getCount, cartProds, calcTaxes};