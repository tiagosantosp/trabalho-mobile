import { useState } from 'react'
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { styles } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
  }

  function ExibirLoginPadrao () {
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
        />
      </View>
      <View style={styles.information}>
        <Ionicons onPress={ExibirLoginPadrao} name="information-circle-outline" size={34} color="black" />
      </View>
    </View>
  );
}
