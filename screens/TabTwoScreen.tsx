import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, SectionList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import storage from '../service/PlaylistsService';

type Music = {name: string, artist: string, genre: string}



export default function TabTwoScreen() {
  const getMusics = async () => {
    
    try {
      const value = await AsyncStorage.getItem('musics')
      if(value !== null) {

        return JSON.parse(value).rawData;

      }
    } catch(e) {

    }
  }

  const [musics, setMusics] = useState<Music[]>();
  
  useEffect(() => {
    handleMusic(getMusics());
  }, [])

  const handleMusic  = async (data: any) => {
    const musics = await data;
    setMusics(musics);
  }

  const deleteMusic = async (name: String) => {
    let oldMusics = await getMusics();
  
    const indexOfObject = oldMusics.findIndex(item => {
      return item.name === name
    })
    
    oldMusics.splice(indexOfObject, 1);

    storage.save(
      {
        key: "musics",
        data: oldMusics
      }
    )
    
    location.reload();
    
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Toplaylist </Text>
        <FlatList 
          data={musics}
          renderItem={
            (item) => 
              
              (
                <View style={styles.item}>
                  <Text style={styles.title}>Nome: {item.item.name}</Text>
                  <Text style={styles.title}>Artista: {item.item.artist}</Text>
                  <Text style={styles.title}>Genero: {item.item.genre}</Text>
                  <Button
                      title="apagar"
                      color="red"
                      onPress={() => deleteMusic(item.item.name)}
                  />
                </View>
               
              )
            
          }
          keyExtractor={(item, index) => `basicListEntry-${item.name}`}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    backgroundColor: "#2f9c30",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
});
