import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Genres } from '../assets/Genres';

import FormInput from '../components/FormInput';
import SelectInput from '../components/SelectInput';
import { Text, View } from '../components/Themed';
import storage from '../service/PlaylistsService';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  

  const saveMusicInLocalStorage = async () => {      
    let musics :{name: string, artist: string, genre: string}[] = [];

    await storage
      .load({
        key: 'musics',
      })
      .then(musicsFetched => {
        musics = musicsFetched;
      })
      .catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      })

      musics?.push({
        name: name,
        artist: artist,
        genre: genre
      })

      storage.save({
        key: "musics",
        data: musics
      });
  
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToPlaylist</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <FormInput 
          label="Digite o nome da música" 
          placeholder="nome da música"
          onChange={(e) => setName(e?.target?.value)}
        />
        <FormInput 
          label="Digite o nome do artista" 
          placeholder="nome do artista"
          onChange={(e) => setArtist(e?.target?.value)}
        />
        <SelectInput 
          label="Digite o nome do Genero" 
          options={Genres}
          onValueChange={(value) => setGenre(value)}        
        />
        <View style={styles.box}>
          <Button
              title="Cadastrar"
              onPress={saveMusicInLocalStorage}
              color="green"
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  box: {
    padding: "5px"
  }
});
