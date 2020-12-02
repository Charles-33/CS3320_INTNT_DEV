import React from 'react';
import axios from 'axios';
import './store.css'
axios.defaults.withCredentials = true;
class Store extends React.Component{
    constructor(props){
        super(props);
        this.state={
            storeItems:[],
            cart : [], 
        }
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount(){
        const headers = {
            'Authorization': 'Bearer: ' + this.props.accessToken,
        }

         axios.get('http://localhost:8080/storeItem/').then( res => {
            const storeItems = res.data;
            this.setState({ storeItems: storeItems});
        })
    }

    async addItem(storeItemId){
        const headers = {
            'Authorization': 'Bearer: ' + this.props.accessToken,
        }
        const itemInfo = {
            storeItemId : storeItemId,
            quantity: 1
        } 
        const response = await axios.post('http://localhost:8080/cart/' + this.props.cartId + '/cartItem' , itemInfo, headers)
        
        this.props.onEdit(this.state.cart);
    }
    
    async getStoreItem(storeItemId){
        const headers = {
            'Authorization': 'Bearer: ' + this.props.accessToken,
        }

        const response = await axios.get('http://localhost:8080/storeItem/' + storeItemId, {headers});
        this.props.updateLastTen();
    }

    render(){
        return(
            <ul id="store">
                {this.state.storeItems.map( storeItem => <li>{storeItem.name} 
                  <button className="addItem" type="button" onClick={() => this.addItem(storeItem._id)}>Add Item</button> 
                  <button className="viewButton" type="button" onClick={() => this.getStoreItem(storeItem._id)}>View</button> </li>)}
            </ul>
        )
    }




}

export default Store