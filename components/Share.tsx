import React from 'react';
import { View, Button } from 'react-native';

const ShareInvite = ({ onShare }) => {
  return (
    <View style={{ padding: 20 }}>
      <Button title="Share via Email" onPress={() => onShare('email')} />
      <Button title="Share via WhatsApp" onPress={() => onShare('whatsapp')} />
      <Button title="Share via Flock" onPress={() => onShare('flock')} />
    </View>
  );
};

export default ShareInvite;
