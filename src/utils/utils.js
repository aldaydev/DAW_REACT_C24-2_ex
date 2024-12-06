const getCount = (product, index, operation, id)=>{
    const updatedProduct = {...product};

    if(operation === 'sumar'){

        updatedProduct.count = parseInt(product.count) + 1;
        localStorage[id] = JSON.stringify(updatedProduct);

    }else if(operation === 'restar'){

        if(updatedProduct.count > 1){
            updatedProduct.count = parseInt(product.count) - 1;
            localStorage[id] = JSON.stringify(updatedProduct);
        }else if(updatedProduct.count === 1){
            localStorage.removeItem(id);
            updatedProduct.count = 0;
        }
    }
    return updatedProduct;
}


const cartProds = (product)=>{
    if(!localStorage[product.id]){
        localStorage[product.id] = JSON.stringify(product);
    }
}

export {getCount, cartProds};