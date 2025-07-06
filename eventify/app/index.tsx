import { router } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { LoginSchema } from "../validations/loginSchema";
import { LoginSchemaError } from "../types/errors/loginSchemaError";
import { UserRepository } from "../database/UserRepository";
import { useAuth } from "../hooks/useAuth";

const userRepository = new UserRepository();

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginSchemaError>({});

    const login = useAuth((state) => state.login);

    const handleLogin = async () => {
      const loginValidated = LoginSchema.safeParse({ email, password });
      setErrors({});

      if (loginValidated.success) {
        const user = await userRepository.findByEmailAndPassword(loginValidated.data.email, loginValidated.data.password);

        if(!user) {
          setErrors({ email: 'Credenciais inválidas'});
          return;
        }

        login(user);
        router.replace('/event');
      } else {
        loginValidated.error.issues.map(error => {
          setErrors(prev => ({ ...prev, [error.path[0]]: error.message}));
        })
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventify</Text>

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

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor={'#AAAAAA'}
        />
        {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/register')}>
        <Text style={styles.loginLabel}>Criar conta</Text>
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
    inputContainer: {
    marginBottom: 16,
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
