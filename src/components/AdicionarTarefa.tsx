import React, { useState } from "react";
import { View, Input, IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from "../hooks/EstadoGlobal";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrigido para o novo pacote

interface AdicionarTarefaProps {
  onAdicionarTarefa: () => void; // Função de callback para atualizar a lista de tarefas
}

const AdicionarTarefa: React.FC<AdicionarTarefaProps> = ({ onAdicionarTarefa }) => {
  const [novaTarefa, setNovaTarefa] = useState("");
  const { adicionarTarefa } = useEstadoGlobal();

  const handleAdicionarTarefa = async () => {
    if (novaTarefa.trim() === "") return;

    try {
      const token = await AsyncStorage.getItem('token'); // Recuperar o token de autenticação
      if (!token) {
        console.error('Token não encontrado!');
        return;
      }

      const response = await fetch('http://localhost:3000/api/tarefas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token JWT ao cabeçalho
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tarefa: novaTarefa }), // Envia a nova tarefa
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar tarefa');
      }

      // Se tudo deu certo, adicionar a tarefa no estado global
      adicionarTarefa(novaTarefa);
      setNovaTarefa(""); // Limpa o campo de input

      onAdicionarTarefa(); // Chama a função passada por prop para atualizar a lista
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  return (
    <View 
      style={{ 
        backgroundColor: '#A06CD5', 
        paddingVertical: 20, 
        paddingHorizontal: 20, 
        paddingTop: 50,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        height: '100%' // Ocupa a altura total da tela para que o conteúdo fique centralizado
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Input
            placeholder="Digite uma tarefa"
            placeholderTextColor="pink"
            value={novaTarefa}
            onChangeText={setNovaTarefa}
            fontSize={18}
            color="white"
          />
        </View>
        <IconButton
          icon={<Ionicons name="add" size={24} color="#A06CD5" />}
          colorScheme="light"
          onPress={handleAdicionarTarefa}
          style={{ borderRadius: 50, backgroundColor: 'pink' }}
        />
      </View>
    </View>
  );
  
};

export default AdicionarTarefa;
