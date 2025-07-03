import { router } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Checkbox } from "../components/checkbox";
import { UserRepository } from "../database/UserRepository";

const userRepository = new UserRepository();

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizer, setOrganizer] = useState(false);

    const handleRegister = async () => {
      await userRepository.save({
        name: name,
        email: email,
        password: password,
        organizer: organizer
      });

      router.replace('/event');
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventify</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
        keyboardType="default"
        autoCapitalize="none"
        placeholderTextColor={'#AAAAAA'}
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={'#AAAAAA'}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor={'#AAAAAA'}
      />

      <Checkbox label='Sou Organizador' value={organizer} onChange={setOrganizer} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/')}>
        <Text style={styles.loginLabel}>Fazer Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#1e1e1e',
    paddingTop: 80,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 80,
    textAlign: 'center',
    color: '#e50914'
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#333333',
    color: '#AAAAAA'
  },
  button: {
    backgroundColor: '#e50914',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 64
  },
  loginLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'thin',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
