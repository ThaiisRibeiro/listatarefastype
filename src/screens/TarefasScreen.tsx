import React from 'react';
import { Box, Text } from 'native-base'; // Importando Box e Text do NativeBase
import AdicionarTarefa from '../components/AdicionarTarefa'; // Importa o componente para adicionar tarefas
import ListaTarefas from '../components/ListaTarefas'; // Importa o componente que exibe a lista de tarefas

const TarefasScreen: React.FC = () => {
  // Função para atualizar a lista de tarefas quando uma nova tarefa for adicionada
  const atualizarListaDeTarefas = () => {
    console.log("Lista de tarefas atualizada!");
    // Aqui você pode adicionar a lógica para atualizar a lista de tarefas, se necessário
  };

  return (
    <Box style={{ flex: 1, backgroundColor: '#402291', padding: 20 }}>
      {/* Formulário de Adicionar Tarefa */}
      <AdicionarTarefa onAdicionarTarefa={atualizarListaDeTarefas} /> {/* Passa a função como prop */}
      {/* Lista de Tarefas */}
      <ListaTarefas /> {/* Renderiza o componente que exibe a lista de tarefas existentes */}
    </Box>
  );
};

export default TarefasScreen;
