import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync }  from 'expo-location'

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync(); 
            
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                
                const { latitude, longitude } = coords;
                
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
            }

        }

        loadInitialPosition()
    }, [])

    if(!currentRegion) {
        return null;
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -6.4122329, longitude: -35.1811169 }}>
                <Image
                    style={styles.avatar} 
                    source={{ uri: 'https://avatars2.githubusercontent.com/u/33496399?s=460&u=13845319fdcd3a86bb7089cd3d533604e7203efa&v=4' }}
                />

                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: 'jordelucas' })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Jordeva Lucas</Text>
                        <Text style={styles.devBio}>Graduando de TI pela Universidade Federal do Rio Grande do Norte e bolsista Desenvolvedor WEB Front-End da Diretoria de TI do IMD</Text>
                        <Text style={styles.devTechs}>ReactJS, React Native, NodeJS</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },


    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5
    }
})

export default Main;