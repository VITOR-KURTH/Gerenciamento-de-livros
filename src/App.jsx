
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [Livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    id: '',
    isbn: '',
    titulo: '',
    editora: '',
    autor: '',
    genero: '',
  });

  useEffect(() => {
    fetchLivros();
  }, []);
  
  //GET
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8090/Livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };
  
  //ATUALIZAÇÃO DOS INPUTS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };
  
  //POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/Livros', novoLivro);
      fetchLivros();
      setNovoLivro({
        id: '',
        isbn: '',
        titulo: '',
        editora: '',
        autor: '',
        genero: '',
      });
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };
  

  //DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/Livros/${id}`);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  
  const handleUpdate = async (id, LivroAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/Livros/${id}`, LivroAtualizado);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };
  
  //RENDERIZAÇÂO
  return (
    <div>
      {/* Cabeçalho */}
      <h1>Gerenciamento de livros</h1>
  
      {/* Formulário de adição de veículo */}
      <form onSubmit={handleSubmit}>
        {/* Campo para a id */}
        <input
          type="text"
          name="id"
          placeholder="id"
          value={novoLivro.id}
          onChange={handleInputChange}
        />
        {/* Campo para a isbn */}
        <input
          type="text"
          name="isbn"
          placeholder="isbn"
          value={novoLivro.isbn}
          onChange={handleInputChange}
        />
        {/* Campo para o titulo */}
        <input
          type="text"
          name="titulo"
          placeholder="titulo"
          value={novoLivro.titulo}
          onChange={handleInputChange}
        />
        {/* Campo para o editora */}
        <input
          type="text"
          name="editora"
          placeholder="editora"
          value={novoLivro.editora}
          onChange={handleInputChange}
        />
          <input
          type="text"
          name="autor"
          placeholder="autor"
          value={novoLivro.autor}
          onChange={handleInputChange}
        />
          <input
          type="text"
          name="genero"
          placeholder="genero"
          value={novoLivro.genero}
          onChange={handleInputChange}
        />
        {/* Botão de envio do formulário */}
        <button type="submit">Adicionar Livro</button>
      </form>
  
      {/* Lista de livros */}
      <ul>
        {/* Mapeamento dos livros */}
        {Livros.map((Livro) => (
          <li key={Livro.id}>
            {/* Exibição dos detalhes do veículo */}
            {Livro.id} - {Livro.isbn} {Livro.titulo} {Livro.editora} {Livro.autor} {Livro.genero}
            
            {/* Botão de exclusão */}
            <button onClick={() => handleDelete(Livro.id)}>Excluir</button>
            
            {/* Botão de atualização */}
            <button
              onClick={() =>
                handleUpdate(Livro.id, {
                  ...Livro,
                  titulo: 'Novo titulo Atualizado', // Exemplo de atualização
                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
  
  }

  export default App;
  
