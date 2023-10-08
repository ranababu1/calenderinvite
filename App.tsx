import React, { useState, useEffect } from 'react';
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
    return null;  
  }

  if (showOnboarding) {
    return <OnboardingSlider onDone={handleOnboardingFinish} />;
  }

  const handleGenerate = (data) => {
    // Your logic to generate invite
  };

  const handleShare = (method) => {
    // Your logic to share based on the chosen method
  };


  return (
    <>
      <InviteGeneration onGenerate={handleGenerate} />
      <ShareInvite onShare={handleShare} />
    </>
  );
}

export default App;

