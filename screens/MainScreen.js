import { View, Text, SafeAreaView, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import CustomFormSelector from '../components/CustomFormSelector';
import CustomFormSelectorFromTo from '../components/CustomFormSelectorFromTo';
import CustomButton from '../components/CustomButton';
import { useState, useEffect, useReducer } from 'react';
import CustomSelectCheckboxPicker from '../components/CustomSelectCheckboxPicker';
import { brandList, fuelTypeList, typeList } from '../constants/data';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('screen');

const MainScreen = () => {

    const vehicle = {
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

    const vehicleReducer = (state, action) => {
        
        switch(action.type) {
            case 'UPDATE_TYPE':
                return { ...state, type: action.payload };
            
            case 'UPDATE_BRAND':
                return { ...state, brand: action.payload };

            case 'UPDATE_FUEL':
                return { ...state, fuel_type: action.payload };
            
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(vehicleReducer, vehicle);

    const handleCarTypeChange = (newValue) => {
        dispatch({ type: 'UPDATE_TYPE', payload: newValue });
    }

    const handleCarBrandChange = newValue => {
        dispatch({ type: 'UPDATE_BRAND', payload: newValue });
    }

    const handleCarFuelTypeChange = newValue => {
        dispatch({ type: 'UPDATE_FUEL', payload: newValue });
    }

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

    const updateBrandList = (newValue) => {
        setCarBrandList(newValue);
    }

    const updateFuelTypeList = (newValue) => {
        setCarFuelTypeList(newValue);
    }

    const updateCarTypeList = (newValue) => {
        setCarTypeList(newValue);
    }

    useEffect( () => {
        console.log(state.type);
        console.log(state.brand);
    }, [state]);

    return(
        <SafeAreaView style={{ flex: 1, width, }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Motomania</Text>
                <Text>{state.minValue} , {state.maxValue}</Text>
            </View>
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

            <View style={styles.groupOptions}>
                <CustomFormSelector title="Typ nadwozia" chosen={state.type !== null ? state.type.join(', '): null } selectedItem={selectedCarType} clicked={carTypeClicked} setClicked={setCarTypeClicked} setModalVisible={setModalVisible}/>
                <CustomFormSelector title="Marka pojazdu" chosen={state.brand !== null ? state.brand.join(', ') : null } selectedItem={selectedBrand} clicked={carBrandClicked} setClicked={setCarBrandClicked} setModalVisible={setModalVisible}/>
                { selectedBrand.length === 1 ? <CustomFormSelector title="Model" selectedItem={selectedModel}/> : null }
                <CustomFormSelectorFromTo title="Cena pojazdu" minValue={state.minValue} maxValue={state.maxValue} dispatch={dispatch}/>
                <CustomFormSelectorFromTo title="Rok produkcji" />
                <CustomFormSelector title="Rodzaj paliwa" chosen={state.fuel_type !== null ? state.fuel_type.join(', ') : null } selectedItem={selectedFuelType} clicked={carFuelTypeListClicked} setClicked={setCarFuelTypeListClicked} setModalVisible={setModalVisible}/>
                <CustomFormSelectorFromTo title="Przebieg (km)" />
                
            </View>
            <CustomButton title="Pokaż znalezione 596 494 ogłoszeń"/>
        </SafeAreaView>
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
        justifyContent: 'center'
    },

    groupOptions : {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
})
export default MainScreen;