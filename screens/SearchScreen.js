import { View, Text, SafeAreaView, StyleSheet, Dimensions, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import CustomFormSelector from '../components/CustomFormSelector';
import CustomFormSelectorFromTo from '../components/CustomFormSelectorFromTo';
import CustomButton from '../components/CustomButton';
import { useState, useEffect, useReducer } from 'react';
import CustomSelectCheckboxPicker from '../components/CustomSelectCheckboxPicker';
import { brandList, fuelTypeList, typeList } from '../constants/data';
import request from '../helpers/request';
import { 
    vehicle, 
    vehicleReducer, 
    handleCarTypeChange,
    handleCarBrandChange,
    handleCarFuelTypeChange,
    handleUpdateMaxMileage,
    handleUpdateMaxPrice,
    handleUpdateMaxProductionYear,
    handleUpdateMinMileage,
    handleUpdateMinPrice,
    handleUpdateMinProductionYear,

} from '../reducers/vehicleReducer';

import axios from 'axios';
const { width } = Dimensions.get('screen');

const SearchScreen = ({navigation}) => {

    const [vehicleCount, setVehicleCount] = useState(0);
    const [foundVehicles, setFoundVehicles] = useState([]);

    const fetchVehiclesData = async () => {

        try {
            const { data } = await request.get('/cars');
            setFoundVehicles(data.cars);

            if(!connectivity) { 
                setConnectivity(true);
            }

        } catch (error) {
            console.error('Erro fetching data', error);
            setConnectivity(false);
        }

    }
    
    const [state, dispatch] = useReducer(vehicleReducer, vehicle);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCarType, setSelectedCarType] = useState([]);
    const [carTypeList, setCarTypeList] = useState(typeList);
    const [carBrandList, setCarBrandList] = useState(brandList);
    const [carFuelTypeList, setCarFuelTypeList] = useState(fuelTypeList);

    const [carTypeClicked, setCarTypeClicked] = useState(false);
    const [carBrandClicked, setCarBrandClicked] = useState(false);
    const [carFuelTypeListClicked, setCarFuelTypeListClicked] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedModel, setSelectedModel] = useState([]);
    const [selectedFuelType, setSelectedFuelType] = useState([]);

    const [connectivity, setConnectivity] = useState(false);

    const handleCarTypeChange = (newValue) => {
        dispatch({ type: 'UPDATE_TYPE', payload: newValue });
    }

    const handleCarBrandChange = newValue => {
        dispatch({ type: 'UPDATE_BRAND', payload: newValue });
    }

    const handleCarFuelTypeChange = newValue => {
        dispatch({ type: 'UPDATE_FUEL', payload: newValue });
    }

    const handleUpdateMinPrice = newValue => {
        dispatch({ type: 'UPDATE_MIN_PRICE', payload: newValue });
    }

    const handleUpdateMaxPrice = newValue => {
        dispatch({ type: 'UPDATE_MAX_PRICE', payload: newValue });
    }

    const handleUpdateMinProductionYear = v => {
        dispatch({ type: 'UPDATE_MIN_PROD_YEAR', payload: v });
    }

    const handleUpdateMaxProductionYear = v => {
        dispatch({ type: 'UPDATE_MAX_PROD_YEAR', payload: v });
    }

    const handleUpdateMinMileage = v => {
        dispatch({ type: 'UPDATE_MIN_MILEAGE', payload: v });
    }

    const handleUpdateMaxMileage = v => {
        dispatch({ type: 'UPDATE_MAX_MILEAGE', payload: v });
    }


    const updateBrandList = (newValue) => {
        setCarBrandList(newValue);
    }

    const updateFuelTypeList = (newValue) => {
        setCarFuelTypeList(newValue);
    }

    const updateCarTypeList = (newValue) => {
        setCarTypeList(newValue);
    }


    const generateSearchURL = (type, brand) => {
        let url = '/cars/search?';

        if(type !== null) {
            url += `type=${type}&`;
        }

        if(brand !== null) {
            url += `brand=${brand}`;
        }

        if(url.endsWith('&')) {
            url = url.slice(0, -1);
        }

        return url;
    }

    const fetchSpecifiedData = async () => {

        try {
            const url = await generateSearchURL(state.type, state.brand);
            const { data } = await request.get(url);
            setFoundVehicles(data.cars);

            if(!connectivity) { 
                setConnectivity(true);
            }
        } catch (error ) {
            console.log("Jakis blad", error);
            setConnectivity(false);
        }
    }

    useEffect( () => {
        fetchVehiclesData();
    }, []);

    useEffect( () => {
        setVehicleCount(foundVehicles.length)
    }, [foundVehicles])

    useEffect( () => {
        console.log(state);

        fetchSpecifiedData();

    }, [state])
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10}}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                {carTypeClicked ? <CustomSelectCheckboxPicker onChange={handleCarTypeChange} checkboxList={carTypeList} updateCheckboxList={updateCarTypeList} setModalVisible={setModalVisible} setClicked={setCarTypeClicked} setSelected={setSelectedCarType}/> : null }
                {carBrandClicked ? <CustomSelectCheckboxPicker onChange={handleCarBrandChange} checkboxList={carBrandList} updateCheckboxList={updateBrandList} setModalVisible={setModalVisible} setClicked={setCarBrandClicked} setSelected={setSelectedBrand}/> : null }
                {carFuelTypeListClicked ? <CustomSelectCheckboxPicker onChange={handleCarFuelTypeChange} checkboxList={carFuelTypeList} updateCheckboxList={updateFuelTypeList} setModalVisible={setModalVisible} setClicked={setCarFuelTypeListClicked} setSelected={setSelectedFuelType}/> : null }
            </Modal>
            {!connectivity ? <NoConnectionView setConnectivity={setConnectivity}/> : null}
            {connectivity ? 
                (<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <CustomFormSelector title="Typ nadwozia" chosen={state.type !== null ? state.type.join(', '): null } selectedItem={selectedCarType} clicked={carTypeClicked} setClicked={setCarTypeClicked} setModalVisible={setModalVisible}/>
                    <CustomFormSelector title="Marka pojazdu" chosen={state.brand !== null ? state.brand.join(', ') : null } selectedItem={selectedBrand} clicked={carBrandClicked} setClicked={setCarBrandClicked} setModalVisible={setModalVisible}/>
                    { selectedBrand.length === 1 ? <CustomFormSelector title="Model" selectedItem={selectedModel}/> : null }
                    <CustomFormSelectorFromTo title="Cena pojazdu" minValue={state.minPrice} onUpdateMinValue={handleUpdateMinPrice} maxValue={state.maxPrice} onUpdateMaxValue={handleUpdateMaxPrice}/>
                    <CustomFormSelectorFromTo title="Rok produkcji" minValue={state.minYear} onUpdateMinValue={handleUpdateMinProductionYear} maxValue={state.maxYear} onUpdateMaxValue={handleUpdateMaxProductionYear}/>
                    <CustomFormSelector title="Rodzaj paliwa" chosen={state.fuel_type !== null ? state.fuel_type.join(', ') : null } selectedItem={selectedFuelType} clicked={carFuelTypeListClicked} setClicked={setCarFuelTypeListClicked} setModalVisible={setModalVisible}/>
                    <CustomFormSelectorFromTo title="Przebieg (km)" minValue={state.minMileage} onUpdateMinValue={handleUpdateMinMileage} maxValue={state.maxMileage} onUpdateMaxValue={handleUpdateMaxMileage}/>  
                    <CustomButton title={`Pokaż znalezione ${vehicleCount} ogłoszeń`} onClick={() => navigation.navigate('Cars', { foundVehiclesCount: vehicleCount, vehicleList: foundVehicles })}/>
                </ScrollView>
                ) : null}
        </SafeAreaView>
    )
}

const NoConnectionView = ({ setConnectivity }) => {

    const [retrying, setRetrying] = useState(false);

    const checkApiConnection = async () => {
        try {
            setRetrying(true);
            const response = await axios.get('http://192.168.1.40:8000/connection', {
                timeout: 1000,
            });
            if(response.status === 200) {
                setConnectivity(true);
            }
            
        } catch (error) {
            setRetrying(false);
            console.error('Blad podczas sprawdzania polaczenia do API:', error);
        }
    }

    return(
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text style={{fontWeight: 'bold'}}>Utracono połączenie z bazą danych</Text>
            {retrying ?
                (<View style={{flexDirection: 'row', marginTop: 10}}>
                    <ActivityIndicator />
                    <Text style={{marginLeft: 10}}>Ponawiam..</Text>
                </View>)
                :
                (
                    <TouchableOpacity onPress={checkApiConnection}>
                        <View style={{marginTop: 10, backgroundColor: 'tomato', padding: 10, borderRadius: 5,}}>
                            <Text>Spróbuj ponownie</Text>
                        </View>
                    </TouchableOpacity>
                
                )
}
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle : {
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    header : {
        alignItems: 'center',
        justifyContent: 'center',
    },

    groupOptions : {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
})
export default SearchScreen;