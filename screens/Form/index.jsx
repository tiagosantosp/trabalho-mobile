import React , {useState }from 'react';
import { ScrollView, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function Form({navigation}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getItem, setItem } = useAsyncStorage("@savepass:passwords");

  //Validar Campos
  function verificaCampos(){
    if (name == '' || email == '' || password == '') {
      Toast.show({
        type: "error",
        text1: "Preencha todos os campos."
      })
      return false
    }
    return true
  }

  async function salvarUsuario() {
    //Validar se os campos estão Preenchidos
    if (!verificaCampos()) return

    try {
      //Gerar Id unico
      const id = uuid.v4();

      //Criar Objeto 
      const newData = {
        id,
        name,
        email,
        password
      }

      //Obter os dados do AsyncStorage
      const response = await getItem();
      const previousData = response ? JSON.parse(response) : [];

      // Merge dados do AsyncStarage com o novo registro
      const data = [...previousData, newData];
      console.log(data);
      //Salvar lista atualizada
      await setItem(JSON.stringify(data));

      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso!"
      })

      //Navegar para tela de Listagem
      navigation.navigate('Lista')
      
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar."
      })
    }
  }

  async function cancelar() {
    navigation.navigate('Lista')
  }


  return (
      <View style={styles.content}>
        <ScrollView>
        <Text
          style={styles.text}
        >Cadastro de Usuário</Text>
        <View style={styles.form}>
            <Input
              label="Nome do Usuário"
              onChangeText={setName}
            />
            <Input
              label="E-mail"
              autoCapitalize="none"
              onChangeText={setEmail}
            />
            <Input
              label="Senha"
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.footer}>
            <Button
              confirmar
              title="Cadastrar"
              onPress={salvarUsuario}
            />
            <Button
              title="Cancelar"
              cancelar
              onPress={cancelar}
            />
          </View>
        </ScrollView>
      </View>
  );
}