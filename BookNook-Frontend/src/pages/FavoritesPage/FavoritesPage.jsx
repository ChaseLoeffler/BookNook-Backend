import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoritesList from "../../components/FavoritesList/FavoritesList"
import useAuth from '../../hooks/useAuth';

const FavoritesPage = (props) => {

    const [favorited,setFav] = useState();
    const [user,token] = useAuth();

    useEffect(() => {
        getFavorites();
    },[])

    async function getFavorites(){
        try{
            let respon = await axios.get(`https://localhost:5001/api/Favorites`,{ headers: {
                Authorization: "Bearer " + token || null,
                },
              });
              console.log(respon.data);
              setFav(respon.data);
        } catch(err){
            console.log(err.message);
        }
    }
    


    return (
        <div className="margin-left">
            <ul>
                <FavoritesList favorited={favorited}/>
            </ul>
        </div>
    );
}
 
export default FavoritesPage;