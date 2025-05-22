import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

interface EventCardProps {
  event: {
    id: number;
    image: ImageSourcePropType | undefined;
    title: string;
    date: string;
    localization: string;
    description: string;
  }
}

export default function EventCard({ event }: EventCardProps) {
  return(
    <View style={styles.card}>
      <Image source={event.image} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{new Date(event.date).toLocaleDateString()}</Text>
      <Text style={styles.localization}>{event.localization}</Text>
      <Text style={styles.description}>{event.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
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
});
