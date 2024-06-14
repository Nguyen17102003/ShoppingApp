import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigator/AppNavigator';

export default function App() {
  return (
    <AppNavigator>
    </AppNavigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
