


import { useContext } from 'react';
import './styles.css'
import { ThemeContext } from '../../../App';








const FavoriteItem = (props)=>{

    const {id,image,  removeFromFavoriteItems, title } = props;
    const {theme} = useContext(ThemeContext);



    return(
        <div key={id} className="favorite-item">
            <div>
                <img src={image} alt="image of recipe"/>
            </div>

            <p style={theme ? {color: "#12343b"} : {}}>{title}</p>

            <button type="button" style={theme ? {backgroundColor: "#12343b"} : {}} onClick={removeFromFavoriteItems} >Remove from favorites</button>

        </div>
    );
};

export default FavoriteItem;