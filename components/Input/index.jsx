import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from './styles';



export function Input({ label, ...rest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput style={styles.input} {...rest} />
    </View>
  );
}