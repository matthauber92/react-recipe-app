import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const APP_ID = '79235c2a';
  const APP_KEY = 'e83c51527bb28a81c864417d1c0d4792';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [counter, setCounter] = useState(0);
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch('https://api.edamam.com/search?q=' + query + '&app_id=' + APP_ID + '&app_key=' + APP_KEY);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
         className="search-bar"
         type="text"
         value={search}
         onChange={updateSearch}/>

        <button className="search-button" type="submit">
        Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}
            ingredients={recipe.recipe.ingredients} image={recipe.recipe.image}
           />
        ))}
      </div>
       <h1 onClick={() => setCounter(counter + 1)}>{counter}</h1>
    </div>
  );
}


export default App;
