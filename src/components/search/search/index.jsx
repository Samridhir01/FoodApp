import { useContext, useEffect, useState } from 'react';
import './styles.css'
import { ThemeContext } from '../../../App';

const Search   = (props)=>{
    console.log(props);
    const {getDataFromSearchComponent, apiCalledSuccess, setapiCalledSuccess} = props;
    

const [inputValue, setInputValue] = useState('')

const {theme} =useContext(ThemeContext);

const handleInputValue= (event) =>{
const {value} = event.target;
setInputValue(value);
}

console.log(inputValue);

const handleSubmit =(event)=>{
    event.preventDefault()
    getDataFromSearchComponent(inputValue)
}

useEffect(()=>{
    
if(apiCalledSuccess){
    setInputValue('')
    setapiCalledSuccess(false)
}

},[apiCalledSuccess,setapiCalledSuccess]);

    return (
        <form onSubmit={handleSubmit} className="Search">
                <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Search Recipes " id="search"/>
                <button     style={theme ? {backgroundColor: "#12343b"} : {}} type="submit">Search</button>

        </form>
    )
}

export default Search;