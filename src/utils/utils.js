const getCount = (product, index, operation, id)=>{
    const updatedProduct = {...product};

    if(operation === 'sumar'){
        updatedProduct.count = parseInt(product.count) + 1;
        localStorage[id] = JSON.stringify(updatedProduct);

    }else if(operation === 'restar'){
        if(product.count > 0){
            updatedProduct.count = parseInt(product.count) - 1;
            localStorage[id] = JSON.stringify(updatedProduct);
        }else if(product.count === 1){
            console.log(id);
            localStorage.removeItem(id);
        }
    }
    
    console.log('COUNT', updatedProduct.count);

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
    // else{
    //     localStorage.removeItem(product.id);
    // }
    // let newCart = [...cart, product.id];
    // setCart([newCart]);
}

export {getCount, cartProds};