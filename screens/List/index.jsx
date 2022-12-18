import { useCallback, useState } from 'react';
import { Text, View, FlatList,TouchableOpacity } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '../../components/Card';

import { styles } from './styles';

export default function Lista({navigation}) {
  const [data, setData] = useState([]);

  const { getItem, setItem, removeItem } = useAsyncStorage("@savepass:passwords");

  //Obter dados do AsyncStorage
  async function obterDados() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    console.log(data)
    setData(data);
  }

  useFocusEffect(useCallback(() => {
    obterDados();
  }, []));

  //Remover registro do AsyncStorage
  async function Remove(id) {
    const response = await getItem();
    const previousData = response ? JSON.parse(response) : [];

    const data = previousData.filter((item) => item.id !== id);
    setItem(JSON.stringify(data));
    setData(data);
  }

  //Navegar entre telas
  async function goPagina(tela) {
    navigation.navigate(tela)
  }



  return (
    <View style={styles.container}>
      <View style={styles.float}>
        <TouchableOpacity style={styles.icone}>
          <Ionicons onPress={() => goPagina('Home')} name="arrow-back-circle-outline" size={33} color="white" />
          <Text style={styles.textIcon}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icone}>
          <Ionicons onPress={() => goPagina('Form')} name="person-add-outline" size={33} color="white" />
          <Text style={styles.textIcon}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Listagem de Usuários</Text>


      <Text style={styles.text}>Você possui {data.length} usuários cadastrados </Text>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Card
            data={item}
            onPress={() => Remove(item.id)}
          />
        }
      />
    </View>
  )
}
