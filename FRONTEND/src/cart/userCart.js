import React from 'react';
import axios from 'axios';
import Store from '../store/store'
import './userCart.css'
axios.defaults.withCredentials = true;

class UserCart extends React.Component{
    constructor(){
        super();
        this.state = {
            cart: [],
            cartId:'',
            lastTen:[]
        }

        this.getCart = this.getCart.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.getLastTen = this.getLastTen.bind(this);
    }

    async getCart(){
         const headers = {
                'Authorization': 'Bearer: ' + this.props.accessToken,
            }
        axios.get('http://localhost:8080/user/' + this.props.user._id + '/cart', {headers})
        .then(res => {
          const cartItems = res.data.items;
          const cartId = res.data._id;
          this.setState({ cartId: cartId });
          this.setState({ cart:cartItems });
        })
    }

    async getLastTen(){
        const headers = {
            'Authorization': 'Bearer: ' + this.props.accessToken,
            
        }
        const response = await axios.get('http://localhost:8080/storeItem/Recent', {headers}, {withCredentials: true})

        const allItems = response.data;
        let itemsArray = [];
        for( let i = allItems.length - 1; i >= 0 && i >= allItems.length - 10; i-- ){
            itemsArray.push( allItems[i] );
        }
        this.setState({ lastTen: itemsArray });
    }

    componentDidMount() {
       this.getCart(); 
    }
   
    handleEdit(cart){
        this.getCart(); 
        this.getLastTen();
    }

    async deleteItem(cartItemId){
        const headers = {
            'Authorization': 'Bearer: ' + this.props.accessToken,
        }
        const response = await axios.delete('http://localhost:8080/cart/' + this.state.cartId + '/cartItem/' +cartItemId, headers );
        this.getCart();
    }

    render(){
        const CartItems = this.state.cart.map( cartItem => <li key={cartItem.name}>{cartItem.storeItemRef.name} <button className="cartButton" type = "button" onClick={() => this.deleteItem(cartItem._id)}>x</button></li>)
        const lastTenItems = this.state.lastTen.map( item => <li>{item.name}</li>)

        return(
            <div>
                <h2 className="welcome">Welcome {this.props.user.firstName} {this.props.user.lastName}!</h2>
                <div className="row">
                    <div className="column left" >
                        <h2>Recently Viewed</h2>
                        <ul className="lastTen">
                            {lastTenItems}
                        </ul>
                    </div>
                    <div className="column right" >
                        <h2>Cart</h2>
                            <ul id="cart">
                                {CartItems}
                            </ul>
                    </div>
                </div>
                <div className="row">
                        <div className="column left">
                            <h2>Store</h2>
                            <Store updateLastTen ={() => this.getLastTen()} user={this.props.user} onEdit={(cart) => this.handleEdit(cart)} cart = {this.state.cart} cartId = {this.state.cartId} accessToken={this.props.accessToken}/>
                        </div>
                </div>
            </div>
        )
    }
}


export default UserCart