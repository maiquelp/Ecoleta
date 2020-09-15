import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import api from '../../services/api';
import * as Location from 'expo-location';

import { Feather as Icon } from '@expo/vector-icons';
import { SvgUri} from 'react-native-svg';

interface Item {
  id: number,
  title: string,
  image_url: string
}

interface Points {
  id: number,
  name: string,
  image: string,
  image_url: string,
  latitude: number,
  longitude: number
}

interface Params {
  uf: string,
  city: string
}

const Points = () => {

  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Points[]>([]);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    const loadPosition = async () => {
      const {status} = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('sorry...', 'Precisamos da sua permissão para obter a sua localização');
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude,longitude]);
    }
    loadPosition();  
  }, []);

  useEffect(() => {
    api.get('items').then( res => {setItems(res.data)});  
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItem
      }
    }).then(res => {  
      setPoints(res.data);
    })
  }, [selectedItem]);

  const handleItemClick = (id: number) => {
    const alreadyExists = selectedItem.findIndex(e => e === id);
    if ( alreadyExists >= 0) {
        const filteredItems = selectedItem.filter(e => e !== id);
        setSelectedItem(filteredItems)
    } else {
    setSelectedItem([...selectedItem, id])
    }
}

  const handleNavigateBack = () => {
    navigation.goBack();
  }

  const handleNavigateToDetail = (id: number) => {
    navigation.navigate('Detail', {point_id: id});
  }

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" size={20} color="#34cb79" />
      </TouchableOpacity>
      <Text style={styles.title}>Bem vindo.</Text>
      <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>
      <View style={styles.mapContainer}>
        { initialPosition[0] !== 0 && (
          <MapView style={styles.map} loadingEnabled={initialPosition[0] === 0} initialRegion={{
            latitude: initialPosition[0], 
            longitude: initialPosition[1], 
            latitudeDelta: 0.014, 
            longitudeDelta: 0.014}} 
          >
            {points.map(e => (
              <Marker key={String(e.id)} style={styles.mapMarker} coordinate={{latitude: e.latitude, 
                longitude: e.longitude }} onPress={() => handleNavigateToDetail(e.id)}>
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: e.image_url}} />
                    <Text style={styles.mapMarkerTitle}>{e.name}</Text>
                  </View>
                </Marker>             
            ))}
          </MapView>
        )}
      </View>
    </View>
    <View style={styles.itemsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20}}>
        {items.map(e => (
          <TouchableOpacity style={[styles.item, selectedItem.includes(e.id) ? styles.selectedItem : {}]} 
            onPress={() => handleItemClick(e.id)} key={String(e.id)} activeOpacity={0.6}> 
            <SvgUri width={42} height={42} uri={e.image_url} />
            <Text style={styles.itemTitle}>{e.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </>
  )
}

export default Points;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});