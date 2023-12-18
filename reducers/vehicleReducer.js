
export const vehicleState = {
    type: null,
    brand: null,
    model: null,
    minPrice: null,
    maxPrice: null,
    minYear: null,
    maxYear: null,
    fuel_type: null,
    mileage: null
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
        
        default:
            return state;
    }
};
