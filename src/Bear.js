import React, {Component} from 'react';
import {getBears} from './App'
import { connect } from 'react-redux'

class Bear extends Component {

  state = { name: ' ',}

   handleSubmit = () => {this.props.getBears(this.state.name);}

   render() {
       return (
           <div style={{margin: '20px'}}>
              <p>{this.props.bears.name}</p>
              <img src={this.props.bears.avatar_url}/><br/>
               <input type="text" name="name" onChange={(e)=>{
                  this.setState({
                    [e.target.name]: e.target.value
                  })
               }}/>
               <button onClick={this.handleSubmit}>Submit</button>
           </div>
       );
   }
}

const mapStateToProps =  ({bears}) => {
   return {bears}
}

const mapDispatchToProps = (dispatch) => {

   return {
       getBears: (name) => dispatch(getBears(name))
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bear);
