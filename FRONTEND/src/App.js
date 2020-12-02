import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from "./login"
import Users from './users/pages/Users';


// function App() {
//   return <Router>
//     <Route path="/">
//       <Users />
//     </Route>
//     <Redirect to="/" />
//   </Router>
// }

function App(){
  return(
    <div className ="App">
      <Login/>
    </div>
  )
}

export default App;
