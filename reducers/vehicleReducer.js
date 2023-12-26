export const vehicle = {
    type: null,
    brand: null,
    model: null,
    minPrice: null,
    maxPrice: null,
    minYear: null,
    maxYear: null,
    fuel_type: null,
    minMileage: null,
    maxMileage: null,
}

export const vehicleReducer = (state, action) => {
    
    switch(action.type) {
        case 'UPDATE_TYPE':
            return { ...state, type: action.payload };
        
        case 'UPDATE_BRAND':
            return { ...state, brand: action.payload };

        case 'UPDATE_FUEL':
            return { ...state, fuel_type: action.payload };
        
        case 'UPDATE_MIN_PRICE':
            return { ...state, minPrice: action.payload };
            
        case 'UPDATE_MAX_PRICE':
            return { ...state, maxPrice: action.payload };

        case 'UPDATE_MIN_PROD_YEAR':
            return { ...state, minYear: action.payload };
            
        case 'UPDATE_MAX_PROD_YEAR':
            return { ...state, maxYear: action.payload };

        case 'UPDATE_MIN_MILEAGE':
            return { ...state, minMileage: action.payload };

        case 'UPDATE_MAX_MILEAGE':
            return { ...state, maxMileage: action.payload };

        default:
            return state;
    }
};

export const handleCarTypeChange = (newValue) => {
    dispatch({ type: 'UPDATE_TYPE', payload: newValue });
}

export const handleCarBrandChange = newValue => {
    dispatch({ type: 'UPDATE_BRAND', payload: newValue });
}

export const handleCarFuelTypeChange = newValue => {
    dispatch({ type: 'UPDATE_FUEL', payload: newValue });
}

export const handleUpdateMinPrice = newValue => {
    dispatch({ type: 'UPDATE_MIN_PRICE', payload: newValue });
}

export const handleUpdateMaxPrice = newValue => {
    dispatch({ type: 'UPDATE_MAX_PRICE', payload: newValue });
}

export const handleUpdateMinProductionYear = v => {
    dispatch({ type: 'UPDATE_MIN_PROD_YEAR', payload: v });
}

export const handleUpdateMaxProductionYear = v => {
    dispatch({ type: 'UPDATE_MAX_PROD_YEAR', payload: v });
}

export const handleUpdateMinMileage = v => {
    dispatch({ type: 'UPDATE_MIN_MILEAGE', payload: v });
}

export const handleUpdateMaxMileage = v => {
    dispatch({ type: 'UPDATE_MAX_MILEAGE', payload: v });
}