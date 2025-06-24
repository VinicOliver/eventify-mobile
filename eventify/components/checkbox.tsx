import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

interface CheckboxProps {
  value: boolean,
  label: string,
  onChange: (value: boolean) => any;
}

export const Checkbox = ({ value, label, onChange }: CheckboxProps) => {
  return(
    <Pressable onPress={() => onChange(!value)} style={styles.checkboxContainer} >
      <MaterialIcons
        name={value ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color="#e50914"
      />
      <Text style={styles.checkboxLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#AAAAAA',
    fontSize: 16,
  },
})
