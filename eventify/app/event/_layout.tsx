import { Stack } from "expo-router";

export default function EventLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name='index' options={{ title: 'Eventos' }} />
      <Stack.Screen name='create' options={{ title: 'Criar Evento' }} />
    </Stack>
  )
}
