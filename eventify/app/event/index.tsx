import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import EventCard from "../../components/eventCard";
import { router } from "expo-router";
import { EventRepository } from "../../database/EventRepository";
import { Event } from "../../types/event.type";
import { useAuth } from "../../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

const eventRepository = new EventRepository();

export default function EventFeed() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const isOrganizer = useAuth((state) => state.isOrganizer());

  useEffect(() => {
    const getEvents = async () => {
      const result = await eventRepository.getAll();
      setEvents(result);
    }

    getEvents();
  }, []);

  return(
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/profile') }>
        <Ionicons name="person-outline" size={24} color="#555" />
      </TouchableOpacity>
      <Text style={styles.logo}>Eventify</Text>

      {isOrganizer &&
        <TouchableOpacity style={styles.button} onPress={() => router.push('/event/create')}>
          <Text style={styles.buttonText}>Criar evento</Text>
        </TouchableOpacity>
      }

      <Text style={styles.title}>Descubra</Text>
      <TextInput
        placeholder="Buscar evento"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
        placeholderTextColor="#AAAAAA"
      />
      <Text style={styles.title}>Próximos eventos</Text>
      <ScrollView>
        {events.map(event => (
          <EventCard event={event} key={event.id} />
        ))}
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  profileButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16
  },
  button: {
    width: '45%',
    backgroundColor: '#e50914',
    paddingVertical: 14,
    borderRadius: 8,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 24,
    backgroundColor: '#333333',
    color: '#AAAAAA'
  }
});