import { View, Text, StyleSheet } from 'react-native';

export default function Logo() {
    return(
        <View style={styles.container}>
            <Text style={styles.logo}>MOTOMANIA</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        fontSize: 30
    }
})