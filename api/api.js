import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCarModels = async () => {
    const response = await axios.get('https://carapi.app/api/makes');
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}


export { fetchCarModels } ;