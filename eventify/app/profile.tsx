import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RegisterSchemaError } from "../types/errors/registerSchemaError";
import BackButton from "../components/backButton";
import { router } from 'expo-router';
import { useAuth } from "../hooks/useAuth";
import { UserRepository } from "../database/UserRepository";
import { RegisterSchema } from "../validations/registerSchema";

const userRepository = new UserRepository();

export default function Profile() {
  const { user, logout } = useAuth()
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [errors, setErrors] = useState<RegisterSchemaError>({});

  const handleUpdate = async () => {
    if(!user?.id) return;

    const registerValidated = RegisterSchema.safeParse({ name, email });
    setErrors({});

    if(registerValidated.success) {
      await userRepository.update(registerValidated.data, +user?.id);
      router.replace('/event');
    } else {
      registerValidated.error.issues.map(error => {
        setErrors(prev => ({ ...prev, [error.path[0]]: error.message}));
      });
    }
  }

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return(
    <View style={styles.container}>
      <Text style={styles.logo}>Eventify</Text>

      <BackButton />

      <Text style={styles.title}>
        Perfil
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={styles.input}
          keyboardType="default"
          autoCapitalize="none"
          placeholderTextColor={'#AAAAAA'}
        />
        {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={'#AAAAAA'}
        />
        {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
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
    logo: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 80,
    textAlign: 'center',
    color: '#e50914',
    marginTop: 0
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 28
  },
  inputContainer: {
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
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
  }
})