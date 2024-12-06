const getCount = (product, index, operation, id)=>{
    const updatedProduct = {...product};

    if(operation === 'sumar'){
        updatedProduct.count = parseInt(product.count) + 1;
        localStorage[id] = JSON.stringify(updatedProduct);

    }else if(operation === 'restar'){

        // if (product.count > 0) {
        //     updatedProduct.count = parseInt(product.count) - 1;
    
        //     if (updatedProduct.count === 0) {
        //         localStorage.removeItem(id);
        //     } else {
        //         localStorage[id] = JSON.stringify(updatedProduct);
        //     }
        // }


        if(updatedProduct.count > 0){
            updatedProduct.count = parseInt(product.count) - 1;
            localStorage[id] = JSON.stringify(updatedProduct);
        }else if(updatedProduct.count === 0){
            localStorage.removeItem(id);
        }
    }

    return updatedProduct;

    // -----------
    // const updatedProducts = [...products];
    // updatedProducts.splice(index,1,updatedProduct);
    // setProducts(updatedProducts);
    // cartProducts(product);

    // console.log('updatedProduct',updatedProduct);
}



const cartProds = (product)=>{

    if(!localStorage[product.id]){
        localStorage[product.id] = JSON.stringify(product);
    }
    
}

export {getCount, cartProds};