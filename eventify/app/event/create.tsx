import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { router } from "expo-router";
import BackButton from "../../components/backButton";
import { EventRepository } from "../../database/EventRepository";

const eventRepository = new EventRepository();

export default function CreateEvent() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [localization, setLocalization] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

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
    const eventId = await eventRepository.save({
      title: title,
      localization: localization,
      date: date,
      image: image,
      description: description
    });

    router.push('event');
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

      <TextInput
        placeholder="Título do evento"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
      />

      <TextInput
        placeholder="Localização"
        value={localization}
        onChangeText={setLocalization}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
      />

      <TextInput
        placeholder="Data"
        value={date}
        onChangeText={setDate}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
        textContentType="dateTime"
      />

      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        multiline
        placeholderTextColor="#AAAAAA"
      />

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
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 24,
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
