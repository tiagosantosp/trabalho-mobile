import { useCallback, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

import { styles } from './styles';

export default function Lista() {
  const [data, setData] = useState([]);

  const { getItem, setItem } = useAsyncStorage("@savepass:passwords");

  //Obter dados do AsyncStorage
  async function obterDados() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
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

  //Navegar para a Tela de Cadastro
  async function goPaginaCadastro() {
  }


  return (
    <View style={styles.container}>
      <View style={styles.float}>
        <View style={styles.icone}>
          <Ionicons onPress={goPaginaCadastro} name="person-add-outline" size={33} color="white" />
        </View>
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
