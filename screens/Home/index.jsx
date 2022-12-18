import { useState, useEffect } from 'react'
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getItem, setItem } = useAsyncStorage("@savepass:passwords");

  useEffect(() => {
    setUsuarioPadrao()
  }, [])

  async function setUsuarioPadrao() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    if (data.length == 0) {
      cadastrarUsuarioPadrao()
      return
    } else {
      let user = null
      user = data.filter(user => user.name == 'admin')
      if (user.length == 0) cadastrarUsuarioPadrao()
    }
  }

  async function cadastrarUsuarioPadrao() {
    const newData = {
      id: uuid.v4(),
      name: 'admin',
      email: 'admin',
      password: 'admin'
    }


    //Obter os dados do AsyncStorage
    const response = await getItem();
    const previousData = response ? JSON.parse(response) : [];

    // Merge dados do AsyncStarage com o novo registro
    const data = [...previousData, newData];
    //Salvar lista atualizada
    await setItem(JSON.stringify(data));

  }

  async function login() {
    //Obter os dados do AsyncStorage
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];

    let usuario = data.filter(user => user.email == email && user.password == password)
    console.log('data')
    console.log(data)
    if (usuario.length > 0) {
      Toast.show({
        type: "success",
        text1: "Login realizado com sucesso!",
      })
      navigation.navigate('Lista')
    } else {
      Toast.show({
        type: "error",
        text1: "Dados de acesso inválidos.",
      })
    }
  }

  function ExibirLoginPadrao() {
    Toast.show({
      type: "info",
      text1: "utilize login e senha: admin",
    })
  }


  return (

    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
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
      <View style={styles.footer}>
        <Button
          title="Login"
          onPress={login}
          confirmar
        />
      </View>
      <View style={styles.information}>
        <Ionicons onPress={ExibirLoginPadrao} name="information-circle-outline" size={34} color="black" />
      </View>
    </View>
  );
}
