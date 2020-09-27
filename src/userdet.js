import React from 'react';
import './userdet.css'

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userdet :[],
            newuserID:'',
            newusername:'',
            newuseremail:'',
            newusercity:''

        };
    }
   componentDidMount = () =>{
       fetch('https://user-details-server.herokuapp.com/users')
       .then((res )=> res.json())
       .then((data) =>{
           console.log(data)
           this.setState({
               userdet:data
           })
       })
       .catch((error) =>  console.log(error))
      
   }   

    setname = (user) => {
        this.setState({
            newusername: user
        });
    };

    setemail = (email) => {
        this.setState({
            newuseremail: email
        });
    };

    setcity = (city) => {
        this.setState({
            newusercity: city
        });
    };

    additem =(name,email,city) =>{
        fetch("https://user-details-server.herokuapp.com/user", { 
            method: "POST", 
            body: JSON.stringify({ 
                name: name, 
                email: email, 
                city: city
            }),            
          
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })    
        
        .then(response => response.json())       
     
        .then(json => {
            console.log(json);
        alert('student Added')}); 
        }

    edititem = (id,name,email,city)=>{
        fetch( `https://user-details-server.herokuapp.com/user/${id}`, { 
            method: "PUT", 
            body: JSON.stringify({ 
                name: name, 
                email: email, 
                city: city
            }),            
          
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })    
        
        .then(response => response.json())       
     
        .then(json => {console.log(json)
        alert('Student details updated')}); 
        }

    delete =(id)=>{
        fetch( `https://user-details-server.herokuapp.com/${id}`, { 
            method: "DELETE",                   
          
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })    
        
        .then(response => response.json())       
     
        .then(json => {console.log(json)
        alert('Deleted')}); 
    }       
    
    clickHandler =(id,name,email,city) =>{
        this.setState({
            newuserID:id,
            newusername:name,
            newuseremail:email,
            newusercity:city
        })



    }

    render() {        
        return (
            <div>
                <h1>Student Details</h1>  
                <input placeholder="Name" onChange={event =>this.setname(event.target.value)} />
                <input placeholder="Email" onChange={event =>this.setemail(event.target.value)} />
                <input placeholder="City" onChange={event =>this.setcity(event.target.value)} />
                <button onClick={() =>this.additem(this.state.newusername,this.state.newuseremail,this.state.newusercity)}>Add Student</button>
                <br></br>
                <table>
                    <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    </tr>
                    <tr>
                        <td><input type="text" value={this.state.newusername} onChange={event =>this.setname(event.target.value)}></input></td>
                        <td><input type="text" value={this.state.newuseremail} onChange={event =>this.setemail(event.target.value)}></input></td>
                        <td><input type="text" value={this.state.newusercity} onChange={event =>this.setcity(event.target.value)}></input></td>
                        <td><button onClick={() =>this.edititem(this.state.newuserID,this.state.newusername,this.state.newuseremail,this.state.newusercity)}>Save</button>  </td>
                    </tr>
                    </thead>
                    <tbody>
                      
                      {this.state.userdet.map(user => (  
                        <tr key={user._id}>  
                         <td>{user.name}</td> 
                          <td>{user.email}</td>                        
                          <td>{user.city}</td>  
                          <td><button onClick={() =>this.clickHandler(user._id,user.name,user.email,user.city)}>Edit</button></td>
                          <td><button onClick={() =>this.delete(user._id)}>Delete</button></td>
        
                        </tr>  
                      ))}  
                    
                    </tbody>
                    
                    </table>      
              
            </div>
        );
    }
}

export default User;