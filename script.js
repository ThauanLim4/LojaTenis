const selector = (ele)=>{
    return document.querySelector(ele)
}
const selectors = (ele)=>{
    return document.querySelectorAll(ele)
}

let cart = []
let modalKey = 0;


tenis.map(function(item, index){
    let itemProduct = document.querySelector('.itemProduct').cloneNode(true)
    let quantSelector = selector('.quant')
    let quantItens = 1
    quantSelector.innerHTML = quantItens


    itemProduct.setAttribute('data-key', index)
    itemProduct.querySelector('.titleProduct').innerHTML = item.name
    itemProduct.querySelector('.priceProduct').innerHTML = 'R$ '+item.price.toFixed(2)
    itemProduct.querySelector('.imgProduct').setAttribute('src', `${item.img}`)

    itemProduct.querySelector('.moreInfoProduct').addEventListener('click', (evento) =>{
        let key = evento.target.closest('.itemProduct').getAttribute('data-key')
        modalKey = key

        selector('.wTitleProduct').innerHTML = tenis[key].name
        selector('.wPriceProduct').innerHTML = `R$ ${tenis[key].price.toFixed(2)}`
        selector('.wImgProduct').src = tenis[key].img


        selector('.windowInfoProduct').style.opacity = 0
        selector('.windowInfoProduct').style.display = 'grid'
        setTimeout(function(){
            selector('.windowInfoProduct').style.opacity = 1
        }, 200)
    })

    document.querySelector('.sectionProducts').append(itemProduct)
})


selector('.closeWindow').addEventListener('click', ()=>{
    selector('.windowInfoProduct').style.opacity = 1
    selector('.windowInfoProduct').style.opacity = 0
    setTimeout(function(){
        selector('.windowInfoProduct').style.display = 'none'
    }, 200)
    quantItens = 1
})


selectors('.sizeProduct').forEach((size)=>{
    size.addEventListener('click', function closeWindow(sizes){
        let sizeSelected = sizes.target
        let allSizes = selectors('.sizeProduct')

        allSizes.forEach(function(i){
            i.classList.remove('selected')
        })

        sizeSelected.classList.add('selected')
    })
})

let quantItens = 1

selector('.more').addEventListener('click', () =>{
    setTimeout(()=>{
        quantItens++;
        selector('.quant').innerHTML = quantItens;  
    }, 200)

})
selector('.less').addEventListener('click', () =>{
    if(quantItens > 1){
        quantItens--
        selector('.quant').innerHTML = quantItens    
    }
})

selector('.btnAddToCart').addEventListener('click', () =>{
    let sizes = selector('.sizeProduct.selected').getAttribute('data-key')
    let indentifier = tenis[modalKey].id+'/'+sizes
    let key = cart.findIndex((item) =>{
        return item.indentifier == indentifier
    })
    if(key > -1){
        cart[key].qt += quantItens
    } else {
    cart.push({
        id:tenis[modalKey].id,
        sizes,
        qt:quantItens
    })}

    setTimeout(function(){
        selector('.windowInfoProduct').style.opacity = 1
        selector('.windowInfoProduct').style.opacity = 0
        setTimeout(function(){
            selector('.windowInfoProduct').style.display = 'none'
        }, 200)
        quantItens = 1
    }, 100)
    updateCart()
})

function updateCart(){
    if(cart.length > 0){
        selector('.sectionCart').style.display = 'flex'
        selector('.areaProductsInCart').innerHTML = ''
        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart){
            let tenisItem = tenis.find((item)=> item.id == cart[i].id)
            subtotal += tenisItem.price * cart[i].qt
            let productCart = selector('.model .productInCart').cloneNode(true)
            let tamSelected = cart[i].sizes

            switch (cart[i].sizes) {
                case '1':
                    tamSelected = '40'
                    break;
                case '2':
                    tamSelected = '41'
                    break;
                case '3':
                    tamSelected = '42'
                    break;
                case '4':
                    tamSelected = '43'
                    break;
                case '5':
                    tamSelected = '44'
                    break;
            }

            let tenisNameAndSize = `${tenisItem.name} (${tamSelected})`

            productCart.querySelector('.ImgproductInCart').src = tenisItem.img
            productCart.querySelector('.NameproductInCart').innerHTML = tenisNameAndSize
            productCart.querySelector('.priceProductInCart').innerHTML = `R$ ${tenisItem.price.toFixed(2)}`
            productCart.querySelector('.quantItensInCart').innerHTML = cart[i].qt
            productCart.querySelector('.btnMoreItens').addEventListener('click', () =>{
                cart[i].qt++
                updateCart()
            })
            productCart.querySelector('.btnLessItens').addEventListener('click', () =>{
                if(cart[i].qt > 1){
                    cart[i].qt--
                } else {
                    cart.splice(i, 1)
                    let pr = document.querySelector('.areaProductsInCart')
                    let prs = pr.querySelector('.productInCart')
                    pr.removeChild(prs)
                }
                updateCart()
            })

            selector('.areaProductsInCart').append(productCart)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        selector('.subtotal').innerHTML = `R$ ${subtotal.toFixed(2)}`
        selector('.descount').innerHTML = `R$ ${desconto.toFixed(2)}`
        selector('.total').innerHTML = `R$ ${total.toFixed(2)}`
        
    } else {
        selector('.sectionCart').style.display = 'none'
    }
    
    console.log(cart)
}



selector('.closeCart').addEventListener('click', () =>{
    cart = []
    updateCart()
})

selector('.cart').addEventListener('click', () =>{
    selector('.sectionCart').style.display = 'flex'
})

