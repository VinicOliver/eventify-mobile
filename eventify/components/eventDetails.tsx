import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "../types/event.type";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface EventDetailsProps {
  event: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const handleDeleteEvent = (id: number | undefined) => {
    console.log(id)
  }

  return(
    <View>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{new Date(event.date).toLocaleDateString()}</Text>
      <Text style={styles.localization}>{event.localization}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => router.push(`/event/edit/${event.id}`)} >
          <Ionicons name="create-outline" size={24} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDeleteEvent(event.id) }>
          <Ionicons name="trash-outline" size={24} color="#d00" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#AAAAAA',
    marginBottom: 4,
  },
  localization: {
    color: '#AAAAAA',
    marginBottom: 8,
  },
  description: {
    color: '#AAAAAA',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginBottom: 12,
    paddingTop: 32,
  },
});
