import { View, Text, SafeAreaView, StyleSheet, Dimensions, Modal } from 'react-native';
import CustomFormSelector from '../components/CustomFormSelector';
import CustomFormSelectorFromTo from '../components/CustomFormSelectorFromTo';
import CustomButton from '../components/CustomButton';
import { useState } from 'react';
import CustomSelectCheckboxPicker from '../components/CustomSelectCheckboxPicker';
import { brandList, fuelTypeList } from '../constants/data';

const { width } = Dimensions.get('screen');

const MainScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedCarType, setSelectedCarType] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(['Audi', 'Mercedes-Benz']);
    const [selectedModel, setSelectedModel] = useState([]);
    const [selectedFuelType, setSelectedFuelType] = useState([]);

    const [carBrandList, setCarBrandList] = useState(brandList);
    const [carFuelTypeList, setCarFuelTypeList] = useState(fuelTypeList);

    const [carTypeClicked, setCarTypeClicked] = useState(false);
    const [carBrandClicked, setCarBrandClicked] = useState(false);
    const [carFuelTypeListClicked, setCarFuelTypeListClicked] = useState(false);
    
    const updateBrandList = (newValue) => {
        setCarBrandList(newValue);
    }

    const updateFuelTypeList = (newValue) => {
        setCarFuelTypeList(newValue);
    }

    return(
        <SafeAreaView style={{ flex: 1, width, }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Motomania</Text>
            </View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                {carBrandClicked ? <CustomSelectCheckboxPicker checkboxList={carBrandList} updateCheckboxList={updateBrandList} setModalVisible={setModalVisible} setClicked={setCarBrandClicked} setSelected={setSelectedBrand}/> : null }
                {carFuelTypeListClicked ? <CustomSelectCheckboxPicker checkboxList={carFuelTypeList} updateCheckboxList={updateFuelTypeList} setModalVisible={setModalVisible} setClicked={setCarFuelTypeListClicked}/> : null }
            </Modal>

            <View style={styles.groupOptions}>
                <CustomFormSelector title="Typ nadwozia" selectedItem={selectedCarType} clicked={carTypeClicked} setClicked={setCarTypeClicked} setModalVisible={setModalVisible}/>
                <CustomFormSelector title="Marka pojazdu" selectedItem={selectedBrand} clicked={carBrandClicked} setClicked={setCarBrandClicked} setModalVisible={setModalVisible}/>
                { selectedBrand.length === 1 ? <CustomFormSelector title="Model" selectedItem={selectedModel}/> : null }
                <CustomFormSelectorFromTo title="Cena pojazdu" />
                <CustomFormSelectorFromTo title="Rok produkcji" />
                <CustomFormSelector title="Rodzaj paliwa" selectedItem={selectedFuelType} clicked={carFuelTypeListClicked} setClicked={setCarFuelTypeListClicked} setModalVisible={setModalVisible}/>
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