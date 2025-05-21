import { Stack } from "expo-router";

export default function Layout() {
  return(
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Entrar' }} />
      <Stack.Screen name='register' options={{ title: 'Criar conta' }} />
    </Stack>
  )
}