Vue.component('cart', {
    props: ['cartItems', 'visibility'],
    template: ` <div class="cart__menu" v-show="visibility">
                    <p v-if="!cartItems.length">Cart is empty</p>
                    <cart-item v-for="item of cartItems" 
                    :key="item.id_product" 
     
                    :cart-item="item"></cart-item>
                </div>`
});


Vue.component('cart-item', {
    props: ['cartItem'],
    template: ` 
                <div class="cart-item">
                    <div class="product-bio">
                        <img v-bind:src="'img/' + cartItem.id_product + '_c.png'" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                            <div class="product-price">$ {{cartItem.quantity*cartItem.price}} Total</div>
                            <button class="del-btn" @click="$root.remove(cartItem)">&times;</button>
                        </div>
                    </div>
                </div>`
});
