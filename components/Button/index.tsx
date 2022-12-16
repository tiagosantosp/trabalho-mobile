import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
}

export function Button({ title, confirmar, cancelar, add ,...rest }) {
  const styleField = [styles.container]

  if (cancelar) styleField.push(styles.cancel)
  if (confirmar) styleField.push(styles.confirm)
  if (add) styleField.push(styles.float)

  return (
    <TouchableOpacity
      style={styleField}
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}