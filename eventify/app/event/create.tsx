import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { router } from "expo-router";
import BackButton from "../../components/backButton";
import { EventRepository } from "../../database/EventRepository";
import { EventSchema } from "../../validations/eventSchema";
import { EventSchemaError } from "../../types/errors/eventSchemaError";

const eventRepository = new EventRepository();

export default function CreateEvent() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [localization, setLocalization] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<EventSchemaError>({});

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleCreateEvent = async () => {
    const eventValidated = EventSchema.safeParse({ title, localization, date, image, description});
    setErrors({});

    if(eventValidated.success) {
      const eventId = await eventRepository.save(eventValidated.data);
      router.push('event');
    } else {
      eventValidated.error.issues.map(error => {
        setErrors(prev => ({ ...prev, [error.path[0]]: error.message}));
      });
    }
  }

  return(
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>Eventify</Text>

      <BackButton />

      <Text style={styles.title}>
        Novo evento
      </Text>

      <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
        <Text style={styles.imageButtonText}>Escolha uma imagem</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Título do evento"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#AAAAAA"
        />
        {errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Localização"
          value={localization}
          onChangeText={setLocalization}
          style={styles.input}
          placeholderTextColor="#AAAAAA"
        />
        {errors.localization && <Text style={{ color: 'red' }}>{errors.localization}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Data"
          value={date}
          onChangeText={setDate}
          style={styles.input}
          placeholderTextColor="#AAAAAA"
          textContentType="dateTime"
        />
        {errors.date && <Text style={{ color: 'red' }}>{errors.date}</Text>}
      </View>

      <View>
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          multiline
          placeholderTextColor="#AAAAAA"
        />
        {errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
    paddingTop: 80,
  },
  imageButton: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 24,
    backgroundColor: '#333333',
  },
  imageButtonText: {
    color: '#AAAAAA'
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
    borderRadius: 8
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
  },
})
