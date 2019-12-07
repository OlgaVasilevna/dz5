//ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard']
let PRICES = [100, 120, 1000, 15, 18]
let IDS = [0, 1, 2, 3, 4]

//let products = [] //массив объектов

let catalog = {
    items: [],
    container: '.products',
    construct () {
        this._init () //_ - это обозначение инкапсулированного метода
    },
    _init () {
        this._handleData ()
        this.render ()
    },
    _handleData () {
        for (let i = 0; i < IDS.length; i++) {
            this.items.push (this._createNewProduct (i))
        }
    },
    _createNewProduct (index) {
        return {
            product_name: PRODUCTS_NAMES [index],
            price: PRICES [index],
            product_id: IDS [index]
        }
    },
    render () {
        let str = ''
        this.items.forEach (item => {
            str += `
                <div class="product">
                    <img class="img_catalog" src="https://placehold.it/300x200">
                    <p class="name_product">${item.product_name}</p>
                    <span class="price_product">${item.price}$</span>
                    <button  class="button_product"onclick="cart.addProduct(${item.product_id})">Купить</button>
                </div>
            `
        })
        document.querySelector(this.container).innerHTML = str
        document.querySelector(".cart_total").innerHTML = `${cart.total}`
    }
}

let cart = {
    items: [],
    total: 0,
    sum: 0,
    addProduct (product) {
        let id = product
        //нарушение инкапсуляции (Вообще так не делаем, но пока делаем)
        let prod = catalog._createNewProduct (product)
        
        let find = this.items.find (product => product.product_id === id)
        if (find) {
            find.quantity++
        } else {
            prod.quantity = 1
            this.items.push (prod)
        }
        
        this._checkTotal ()
        this.calculateSum ()
        sessionStorage.setItem("cart", JSON.stringify(cart))
        catalog.render()
    
    },
    deleteProduct (product) {
        this.items.forEach((el,index)=>{
                if (el.product_id===product){
                    if (el.quantity>1) {
                        el.quantity--
                        this._checkTotal()
                        this.calculateSum ()
                        sessionStorage.setItem("cart", JSON.stringify(cart))
                    } else {
                        delete this.items[index]
                        this._checkTotal()
                        this.calculateSum ()
                        sessionStorage.setItem("cart", JSON.stringify(cart))
                    }
                }
        })
        
        //нарушение инкапсуляции (Вообще так не делаем, но пока делаем)
        
        
    },
    calculateSum () {
        this.sum=0
        this.items.forEach(el => {
            if (el!=undefined){
                this.sum+=el.price*el.quantity
            }
        }) 
    },
    _checkTotal () {
        this.total=0
        this.items.forEach(el => {
            if (el!=undefined){
                this.total+=el.quantity
            }
        })        

    }
}
catalog.construct () 

