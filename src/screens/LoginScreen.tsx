import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://<SEU_IP_LOCAL>:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role: 'user' }),
      });

      if (!response.ok) throw new Error('Erro ao fazer login');

      const { token } = await response.json();
      await AsyncStorage.setItem('token', token);
      setError(null);
      navigation.navigate('TarefasScreen');
    } catch (error) {
      console.error('Erro de autenticação:', error);
      setError('Erro de autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      
      <Button title="Login" onPress={handleLogin} color="#6247AA" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2CFEA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#6247AA',
    marginBottom: 20,
  },
  input: {
    width: '40%',
    height: 50, // Aumenta a altura do campo de entrada
    padding: 10,
    marginVertical: 40,
    borderWidth: 1,
    borderColor: '#A06CD5',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    fontFamily: 'Arial',
  },
  error: {
    color: '#A06CD5',
    marginTop: 10,
    fontFamily: 'Arial',
  },
});

export default LoginScreen;
