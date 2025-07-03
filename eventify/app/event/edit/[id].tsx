import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Event } from "../../../types/event.type";
import { EventRepository } from "../../../database/EventRepository";
import BackButton from "../../../components/backButton";

const eventRepository = new EventRepository();

export default function EditEvent() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>({
    id: 0,
    title: '',
    localization: '',
    date: '',
    image: '',
    description: ''
  });
  const [image, setImage] = useState('');

  const handlePickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setEvent({ ...event, image: result.assets[0].uri})
      }
    }

  useEffect(() => {
    const getEvent = async () => {
      if(id) {
        const result = await eventRepository.getById(+id);
        setEvent(result);
      }
    }

    getEvent();
  }, [id]);

  const handleUpdateEvent = async () => {
    console.log(event);
    if(event) {
      await eventRepository.update(+id, event);
    }

    router.push(`/event`);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>Eventify</Text>

      <BackButton />

      <Text style={styles.title}>
        Editar evento
      </Text>

      <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
        <Text style={styles.imageButtonText}>Escolha uma imagem</Text>
      </TouchableOpacity>
      { event!.image && <Image source={{ uri: event!.image }} style={styles.image} />}

      <TextInput
        placeholder="Título do evento"
        value={event!.title}
        onChangeText={(text) => setEvent({ ...event, title: text })}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
      />

      <TextInput
        placeholder="Localização"
        value={event!.localization}
        onChangeText={(text) => setEvent({ ...event, localization: text })}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
      />

      <TextInput
        placeholder="Data"
        value={event!.date}
        onChangeText={(text) => setEvent({ ...event, date: text })}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
        textContentType="dateTime"
      />

      <TextInput
        placeholder="Descrição"
        value={event!.description}
        onChangeText={(text) => setEvent({ ...event, description: text })}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        multiline
        placeholderTextColor="#AAAAAA"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateEvent}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
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
    width: '100%',
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

