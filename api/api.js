import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCarModels = async () => {
    
    const response = axios.get('https://carapi.app/api/makes')
        .then( response => {
            console.log(response.data);
        })
        .catch( error => {
            console.error("Error while downloading data.", error);
        });
    return response
}


export { fetchCarModels } ;