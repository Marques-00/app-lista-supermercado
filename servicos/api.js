export async function buscarProdutosApi() {
  const response = await fetch('https://fakestoreapi.com/products'); // Exemplo de API pública
  const data = await response.json();
  return data;
}
//eduarda