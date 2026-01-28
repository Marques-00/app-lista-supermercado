import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProductItem({ item, onDelete, onEdit }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {item.nome} - {item.quantidade}
      </Text>

      <View style={styles.buttons}>
        <Button title="Editar" onPress={onEdit} color="#20B2AA" />
        <Button title="Excluir" onPress={onDelete} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#20B2AA'
  },
  text: {
    color: 'black',
    fontSize: 16
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  }
});
