import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; // Importe o tipo
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação correta

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState(''); // Altera email para username
  const [password, setPassword] = useState(''); // Altera senha para password
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Utilize o tipo

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.'); // Validação simples
      return;
    }

    try {
      const response = await fetch('http://<SEU_IP_LOCAL>:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // Envie o username
          password, // Envie a password
          role: 'user' // Adicione role como user por padrão
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const { token } = await response.json();
      await AsyncStorage.setItem('token', token); // Armazena o token no AsyncStorage
      setError(null); // Limpa qualquer erro
      navigation.navigate('TarefasScreen'); // Navega para a tela de tarefas
    } catch (error) {
      console.error('Erro de autenticação:', error); // Log do erro
      setError('Erro de autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username" // Altere o placeholder para Username
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password} // Altere para password
        onChangeText={setPassword} // Altere para setPassword
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
