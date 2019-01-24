import React, { Component } from 'react'
import Recipe from './Recipe'
import RecipeSearch from './RecipeSearch';

export default class RecipeList extends Component {
  render() {
    return (
        <React.Fragment>
            <h1>hello from Recipe list</h1>
            <RecipeSearch />
            <Recipe />
            <RecipeSearch />
      </React.Fragment>
    )
  }
}
