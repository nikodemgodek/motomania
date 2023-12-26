import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Platform,
    SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useState } from 'react';
const { width } = Dimensions.get('screen');


const settingsSections = [
    {
        title: 'Your advertisements',
        data: ['Buying', 'Selling', 'Reports and returns', 'Bank account details']
    },
    {
        title: "Account details",
        data: ['Username', 'Password change', 'Location', 'Phone number']
    },
]

const UserSettings = () => {

    const [user, setUser] = useState(false);

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1'}}>
            <View style={[{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}, 
                            Platform.OS === 'ios' ? styles.marginIOS : styles.marginAndroid
            ]}>
                <View style={styles.avatar}>
                    { /* avatar */ }
                    <TouchableOpacity style={styles.avatarCircleButton} onPress={() => {}}>
                        <View style={{backgroundColor: 'tomato', width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center',}}>
                            <Icon style={styles.avatarImg} name="camera" size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                    <Text style={{ fontSize: 26, fontWeight: 600}}>Nikodem Godek</Text>
                    <Text>Software Developer</Text>
                </View>
            </View>
            <View style={{ width, flex: 1 }}>
                <SectionList
                    contentContainerStyle={{ marginHorizontal: 20}}
                    sections={settingsSections}
                    keyExtractor={ (item, index) => item + index}
                    renderItem={ ({item}) => (
                        <TouchableOpacity>
                            <View style={{ backgroundColor: '#fff', borderRadius: 5, marginVertical: 2, padding: 15}}>
                                <Text>{item}</Text>
                            </View>
                        </TouchableOpacity>
                        
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 30, marginBottom: 10}}>{title}</Text>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    avatar: {
        position: 'relative',
        borderRadius: 100,
        width: 150, height: 150,
        backgroundColor: '#ccc',

    },

    avatarCircleButton : {
        position: 'absolute',
        borderRadius: 100,
        width: 50, height: 50,
        backgroundColor: '#f1f1f1',
        bottom: 0, right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarImg: {
        color: '#000'
    },
    
    marginIOS: {
        marginTop: 10
    },
    
    marginAndroid: {
        marginTop: 60
    }
})
export default UserSettings;