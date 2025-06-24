import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BackButton() {
  const router = useRouter();
  return(
    <TouchableOpacity onPress={() => router.back()} style={styles.arrow}>
      <AntDesign name='left' size={24} color='#AAAAAA' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginBottom: 24
  }
})