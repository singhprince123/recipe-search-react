import React, { Component } from 'react';
import './App.css';
import { recipes } from './tempList';
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails';
import LimitExceed from './components/LimitExceed';

class App extends Component {

  state={
    recipes: [],
    url: "https://www.food2fork.com/api/search?key=02c5db3a1654258d375368fafca54d3e",
    base_url:"https://www.food2fork.com/api/search?key=02c5db3a1654258d375368fafca54d3e",
    details_id: 35382,
    pageIndex: 0,
    search: '',
    query: '&q=',
    error: '',
    limit: false
  }

 async getRecipes(){
  try{
    const  data = await fetch(this.state.url);
    const jsonData = await data.json();
    console.log(jsonData)
    if(jsonData.error ==="limit"){
       this.setState({
         limit: true
       })
    }
    if(jsonData.recipes.length === 0){
      this.setState(()=> {
        return{error: 'sorry, but your search did not return any result'}
      })
    }else{
      this.setState({
        recipes: jsonData.recipes
      })
    }
    
  } catch(error){
    console.log(error)
  }
 
} 

componentDidMount() {
  console.log('componetn didididii')
  this.getRecipes()
}

displayPage = (index) => {
  switch(index){
    default :
    case 1: 
    return(<RecipeList recipes={this.state.recipes}
      handleDetails = {this.handleDetails}
      value = { this.state.search}
      handleChange ={this.handleChange}
      handleSubmit = {this.handleSubmit}
      error={this.state.error}
      limit={this.state.limit}/>);

    case 0: 
    return( <RecipeDetails id={this.state.details_id}
      handleIndex = {this.handleIndex}
      
      />)
  }
}

handleIndex = (index)=> {
  this.setState({
    pageIndex : index
  })
}

handleDetails = (index, id) => {
  this.setState({
    pageIndex: index,
    details_id: id
  })
}

handleChange = (e)=> {
  this.setState({
    search: e.target.value
  })
}

handleSubmit = (e) => {
  console.log("handle submit")
  e.preventDefault();
  const { base_url, query , search} = this.state;
  this.setState( ()=> {
    return{ url: `${base_url}${query}${search}`,
      search: ""
  }
  }, ()=> {this.getRecipes()} )
}
render() {
    if(this.state.recipes.length === 0){
      return <Loader />
    }
    if(this.state.limit){
      console.log("app.js limit")
      return <LimitExceed />
    }
    else{
      return( 
        <React.Fragment>
          {this.displayPage(this.state.pageIndex)}
        </React.Fragment>
      )
    }
  }
}

export default App;
