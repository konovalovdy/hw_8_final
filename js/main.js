const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        cartItems: [],
        filtered: [],
        products: [],
        error:false,
        userCart: 'userCart'
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {console.log(error);
                this.error = true;
            })
        },
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                find.quantity++;
                this.setStorage();
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.cartItems.push(prod);
                this.setStorage();
            }
        },
        remove(item){
           
                if(item.quantity>1){
                    item.quantity--;
                    this.setStorage();
                } else {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        this.setStorage();
                }
        },
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered =  this.products.filter(el => regexp.test(el.product_name));
        },
        setStorage() {
            localStorage.setItem(this.userCart, JSON.stringify(this.cartItems));
        },
        getFromStorage() {
            if (localStorage.getItem(this.userCart)) {
                this.cartItems = JSON.parse(localStorage.getItem(this.userCart));
            }
        }
    },
    mounted(){

        this.getJson(`getProducts.json`)
            .then(data => {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
            });
        this.getFromStorage();
        //localStorage.clear();
    }
});