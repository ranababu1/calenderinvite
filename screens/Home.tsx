import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InviteGeneration from '../components/InviteGeneration';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Invite Generator</Text>
      <InviteGeneration />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#353d36',  // Using your background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DEF358',  // Using your cyan color
    marginBottom: 20,
    textAlign: 'center',
  }
});

export default Home;
