import React from 'react';
import axios from 'axios';
import UserCart from './cart/userCart'
import './login.css'
axios.defaults.withCredentials = true;

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            login:'',
            password:'',
            jwt:'',
            userId:'',
            user:{}
        }

        this.loginEventHandler = this.loginEventHandler.bind(this);
        this.loginEmailHandler = this.loginEmailHandler.bind(this);
        this.loginPasswordHandler = this.loginPasswordHandler.bind(this);
    }

    async loginEventHandler(){
        const loginBody = {
            email: this.state.email,
            password: this.state.password
        }
        const response = await axios.post('http://localhost:8080/user/login', loginBody);
        if( !response.data.user)
            alert("Please try different credentials");
        else
            this.setState({jwt: response.data.jwt, userId: response.data.userId, user: response.data.user});
    }

    loginEmailHandler(event){
        this.setState({ email:event.target.value});
    }

    loginPasswordHandler(event){
        this.setState({ password:event.target.value});
    }

    welcomeUser(){
        if( Object.keys(this.state.user).length > 0 ){
            return(
                <UserCart user={this.state.user} accessToken={this.state.jwt}/>
            )
        }
    }

    getLoginForm(){
        if( Object.keys(this.state.user).length === 0 ){
            return(
            <div class="container">
            <h1 class="header row">NAMAZON</h1>
            <div class="row" >
                <input  placeholder="email" onChange={this.loginEmailHandler}></input>
                <input  type="password" onChange={this.loginPasswordHandler} placeholder="Password"></input>
                <br/>
                <div >
                    <button id="loginButton" onClick={this.loginEventHandler}>Log in!</button>
                </div>
            </div> 
            </div>
            )
        }
    }
    render(){
        return(
        
            <div className = "Login">
                {this.getLoginForm()}
                {this.welcomeUser()}
            </div>
        )
    }
}   


export default Login;