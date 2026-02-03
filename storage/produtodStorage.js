import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@produtos';
//eduarda
export async function salvarProduto(produto) {
  const dados = await AsyncStorage.getItem(KEY);
  const lista = dados ? JSON.parse(dados) : [];

  lista.push(produto);
  await AsyncStorage.setItem(KEY, JSON.stringify(lista));
}
//amanda
export async function buscarProdutos() {
  const dados = await AsyncStorage.getItem(KEY);
  return dados ? JSON.parse(dados) : [];
}

export async function atualizarProduto(index, produtoAtualizado) {
  const lista = await buscarProdutos();
  lista[index] = produtoAtualizado;
  await AsyncStorage.setItem(KEY, JSON.stringify(lista));
}

export async function deletarProduto(index) {
  const lista = await buscarProdutos();
  lista.splice(index, 1);
  await AsyncStorage.setItem(KEY, JSON.stringify(lista));
}
