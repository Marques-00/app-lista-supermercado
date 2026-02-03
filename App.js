import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

import ProductItem from './componentes/ProdutoItem';
import { salvarProduto, buscarProdutos, deletarProduto, atualizarProduto } from './storage/produtodStorage';
import { buscarProdutosApi } from './servicos/api';
//eduarda
export default function App() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarProdutos();
    buscarProdutosApi(); // só para cumprir conectividade
  }, []);

  async function carregarProdutos() {
    const lista = await buscarProdutos();
    setProdutos(lista);
  }
//amanda
  async function salvar() {
    if (!nome || !quantidade) return;

    const produto = { nome, quantidade };

    if (editando !== null) {
      await atualizarProduto(editando, produto);
      setEditando(null);
    } else {
      await salvarProduto(produto);
    }

    setNome('');
    setQuantidade('');
    carregarProdutos();
  }

  function editarProduto(item, index) {
    setNome(item.nome);
    setQuantidade(item.quantidade);
    setEditando(index);
  }

  async function excluirProduto(index) {
    await deletarProduto(index);
    carregarProdutos();
  }
//eduarda
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LISTA DE SUPERMERCADO</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Button title={editando !== null ? "Atualizar" : "Salvar"} onPress={salvar} color="#20B2AA" />

      <FlatList
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ProductItem
            item={item}
            onDelete={() => excluirProduto(index)}
            onEdit={() => editarProduto(item, index)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#E0FFFF',
  justifyContent: 'center',   // centraliza na vertical
  padding: 20,
   marginTop: 60,}
,
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 15,
    color: 'black'
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#20B2AA',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5
  }
});
