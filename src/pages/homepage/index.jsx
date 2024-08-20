
import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import Search from "../../components/search/search";
import './styles.css';
import RecipeItem from "../../components/search/recipe-item";
import FavoriteItem from "../../components/search/favorite-item";
import { ThemeContext } from "../../App";


const reducer = (state,action)=> {

    switch (action.type) {
        case "filteredFavorites":
            console.log(action);
            
            
            return {
                ...state,
                filteredValue : action.value,
            };
    
        default:
           return state;
    }
};


const initialState = {
        filteredValue : "",
    };




const Homepage   = ()=>{


    // loading state

        const [loadingState,setLoadingState] = useState(false);


    //save results that we recieve from api

         const [recipes,setRecipes] = useState([]);

//favorite data state

        const [favorites,setFavorites] = useState([]);

 //state for api is sucessfull or not
 
        const [apiCalledSuccess, setapiCalledSuccess] = useState(false);

// use reducer functionality

        const [filteredState,dispatch] = useReducer(reducer, initialState);
    
        const { theme } = useContext(ThemeContext);

    const getDataFromSearchComponent = (getData)=>{
  

        //keep the loading state as true before we are calling api
        setLoadingState(true);

     
    console.log(getData,'getData');
    

    //calling the api
    async function getReceipes() {
        const apiResponse = await fetch(` https://api.spoonacular.com/recipes/complexSearch?apiKey=64a5f9dc35bf489787b1c3e9db6c85f2&query=${getData}`)
        const result = await apiResponse.json();
        const {results} = result;
       

        if(results && results.length > 0){
            //set the loading state as false again
            //set the recipe state

            setLoadingState(false);
            setRecipes(results);
            setapiCalledSuccess(true);
}

        console.log(result);

    }
    getReceipes();
};

console.log(loadingState,recipes,'loadingState,recipes');


const addToFavorites = useCallback((getCurrentRecipeItem)=>{

    
    let copyFavorites = [...favorites];

    const index = copyFavorites.findIndex(item => item.id === getCurrentRecipeItem.id)
   
    if(index === -1){
copyFavorites.push(getCurrentRecipeItem)
setFavorites(copyFavorites)
//save the favorites in the loacal storage
localStorage.setItem('favorites', JSON.stringify(copyFavorites));
window.scrollTo({top : '0', behavior : 'smooth'})
    }
    else{
        alert("Item is already present in favorites")
    }

},[favorites]);


 

const removeFromFavoriteItems = (getCurrentId)=>{

   let copyFavorites = [...favorites];
   copyFavorites = copyFavorites.filter(item=> item.id !== getCurrentId);

   setFavorites(copyFavorites);
   localStorage.setItem('favorites', JSON.stringify(copyFavorites))
} 




useEffect(()=>{
console.log("run only once on page load");
const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(localStorage.getItem('favorites'))
setFavorites(extractFavoritesFromLocalStorageOnPageLoad)


},[])

console.log(filteredState, 'filtered state');

//filter the favorites
 
const filteredFavoritesItems = favorites.filter(item=>
    item.title.toLowerCase().includes(filteredState.filteredValue)
);



// const renderRecipes = useCallback(()=>{

//     if(recipes && recipes.length > 0 ){
//         return recipes.map((item)=> (
//                 <RecipeItem 
//                 addToFavorites={ () => addToFavorites(item)} 
//                 id={item.id} 
//                 image={item.image} 
//                 title={item.title} 
//                 />
//             ));
    
//         }

// },[recipes,addToFavorites]);

    return (
        <div className="homepage">
            <Search 
            getDataFromSearchComponent={getDataFromSearchComponent}
            apiCalledSuccess = {apiCalledSuccess}
            setapiCalledSuccess = {setapiCalledSuccess}
            />


{/* show favorite items */}

        <div className="favorites-wrapper">
        <h1     style={theme ? {color: "#12343b"} : {}}  className="favourite-title">Favorites</h1>
        
        <div className="search-favorites">

            <input 
            onChange={(event)=>
            dispatch({type: 'filteredFavorites', value: event.target.value })
        }
            value={filteredState.filteredValue}
            name="searchfavorites" 
            placeholder="Search Favorites"/>

        </div>


        <div className="favorites">
 {
    !filteredFavoritesItems.length && <div style={{display: 'flex', width :'100%' ,justifyContent: 'center'} }className="no-items">No favorites are found</div>
}


{filteredFavoritesItems && filteredFavoritesItems.length > 0 
    ?  filteredFavoritesItems.map(item=>(
        <FavoriteItem
        removeFromFavoriteItems = {()=> removeFromFavoriteItems(item.id)}
        id={item.id} 
        image={item.image} 
        title={item.title} 
        
        />
    ))
    :null}
</div>

        </div>
        
        
        {/* show favorite items */}

{/*show loading state */}

{loadingState && <div className=".loading">Loading recipes ! Please wait.</div>}

{/*show loading state */}




{/* map through all the recipes*/}

{

    !loadingState && !recipes.length && <div className="no-items">No Recipes are found </div>

}

<div className="items">
  

    {
        useMemo(()=> (
            !loadingState && recipes && recipes.length > 0 
            ? recipes.map((item)=> (
                <RecipeItem 
                addToFavorites={ () => addToFavorites(item)} 
                id={item.id} 
                image={item.image} 
                title={item.title} 
                />
            ))
            : null

        ),[loadingState, recipes, addToFavorites ])
    }

</div>
    </div>
    )
}

export default Homepage;