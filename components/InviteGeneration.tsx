import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const InviteGeneration = ({ onGenerate }) => {
  const [eventData, setEventData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    description: ''
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={eventData.title}
        onChangeText={(text) => setEventData((prev) => ({ ...prev, title: text }))}
      />
      {/* ... similarly add TextInput for other eventData properties ... */}
      <Button title="Generate Invite" onPress={() => onGenerate(eventData)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  }
});

export default InviteGeneration;
