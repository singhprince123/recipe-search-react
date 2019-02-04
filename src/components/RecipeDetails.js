import React, { Component } from "react";
 import { recipe } from "../tempDetail";
import LimitExceed from "./LimitExceed";
import Loader from "./Loader";

export default class RecipeDetails extends Component {
  // constructor(props){
  //   super(props);

  //   this.state= {
  //     recipe: recipe,
  //     url: "https://www.food2fork.com/api/get?key=773004240dfe4a82c2416cea29ec731e&rId=" + this.props.id,
  //   }
  // }

  state = {
    recipe: [],
    limit: false
  };

  async getDetail() {
    const url =
      "https://www.food2fork.com/api/get?key=02c5db3a1654258d375368fafca54d3e&rId=" +
      this.props.id;
      
    try {
      const data = await fetch(url);
      const jsonData = await data.json();
    
      if(jsonData.error){
        this.setState({
          limit: true
        })
     }else{
      this.setState({
        recipe: jsonData.recipe
      });
     }
     
    } catch(error){
       console.log(error)
    }
  }

  componentDidMount(){
  
    this.getDetail()
  }

  render() {
    if(this.state.recipe.length === 0){
       return (<Loader />)
    }
    if(this.state.limit ){
      console.log("if ", this.state.limit)
      return( <LimitExceed />)
    }else{
      const {
        image_url,
        publisher,
        publisher_url,
        source_url,
        title,
        ingredients
      } = this.state.recipe;
      return (

        <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3">
                <button
                  type="button"
                  className="btn btn-warning mb-5 text-capitalize"
                  onClick={() => this.props.handleIndex(1)}
                >
                  back to recipe list
                </button>
                <img
                  src={image_url}
                  className="d-block w-100"
                  alt="recipeimage"
                  style={{width: "400px" , height: "400px"}}
                />
              </div>
            
              <div className="col-10 mx-auto col-md-6 my-3">
                <h6 className="text-uppercase">{title}</h6>
                <h6 className="text-warning text-capitalize text-slanted">
                  provided by {publisher}
                </h6>
                <a
                  href={publisher_url}
                  target="_blank"
                  className="btn btn-primary mt-2  text-capitalize"
                  rel="noopener noreferrer"
                >
                  publisher webpage
                </a>
                <a
                  href={source_url}
                  target="_blank"
                  className="btn btn-success mt-2  mx-3 text-capitalize"
                  rel="noopener noreferrer"
                >
                  recipe url
                </a>
                <ul className="list-group mt-4">
                  <h2 className="mt-3 mb-4">Ingridients</h2>
                  {ingredients.map((item, index) => {
                    return (
                      <li key={index} className="list-group-item text-slanted">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    
    
  }
}
}
