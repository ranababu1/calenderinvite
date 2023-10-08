import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingSlider from './components/OnboardingSlider';
import InviteGeneration from './components/InviteGeneration';
import ShareInvite from './components/Share';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    (async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      setShowOnboarding(!hasSeenOnboarding);
    })();
  }, []);

  const handleOnboardingFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding === null) {
    // Showing a simple loading spinner. You can replace with a splash screen or custom loader.
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    ); 
  }

  if (showOnboarding) {
    return <OnboardingSlider onDone={handleOnboardingFinish} />;
  }

  const handleGenerate = (data) => {
    // Your logic to generate invite
    console.log("Invite ll be generated here");
  };

  const handleShare = (method) => {
    // Your logic to share based on the chosen method
    console.log("Invite ll be generated here");
  };

  return (
    <View style={styles.container}>
      <InviteGeneration onGenerate={handleGenerate} />
      <ShareInvite onShare={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#353d36', // your background color
  },
  container: {
    flex: 1,
    backgroundColor: '#353d36', // your background color
  },
});

export default App;
