import { View, Text, Dimensions, ScrollView } from 'react-native';
import { useState } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get('screen');

const NotFoundScreen = () => {
    return(
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Ionicons name='sad-outline' size={100} color={'tomato'} />
            <Text style={{ fontSize: 26, fontWeight: 'bold'}}>Brak pojazdów!</Text>
        </View>
    )
}

const CarView = ({list}) => {

    return(
        <ScrollView>
            {list.map(item => (
                <CarElement brand={item.brand} fueltype={item.fuel_type} year={item.year} mileage={item.mileage} type={item.type}/>
            ))}
        </ScrollView>
    )
}

const CarElement = (props) => {
    return(
        <View style={{ width, backgroundColor: '#fff', alignItems: 'center', flex: 1}}>
            <View style={{ width, backgroundColor: 'tomato', height: 250}}>
                <Text>Image</Text>
            </View>
            <View style={{ width, backgroundColor: '#fff', flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 15}}>
                <Text style={{ fontSize: 18, fontWeight: '600'}}>{props.brand}</Text>
                <Text>{props.year} • {props.mileage} km • {props.fueltype} • {props.type}</Text>
            </View>
        </View>
    )
}

export default function CarsScreen( {route} ) {

    const { foundVehiclesCount, vehicleList } = route.params;

    console.log(vehicleList);

    return(
        <View style={{ flex: 1 }}>
            {foundVehiclesCount === 0 ? <NotFoundScreen /> : null}
            {foundVehiclesCount > 0 ? <CarView list={vehicleList} /> : null }
        </View>
    )
};

