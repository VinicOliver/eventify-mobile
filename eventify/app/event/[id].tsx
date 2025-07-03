import { Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Event } from '../../types/event.type';
import { EventRepository } from '../../database/EventRepository';
import BackButton from "../../components/backButton";
import EventDetails from '../../components/eventDetails';

const eventRepository = new EventRepository();

export default function EventDetail() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      if(id) {
        const result = await eventRepository.getById(+id);
        setEvent(result);
      }
    }

    getEvent();
  }, [id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>Eventify</Text>

      <BackButton />

      { event !== null && <EventDetails event={event} />}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e1e',
    paddingTop: 80,
  }
});
