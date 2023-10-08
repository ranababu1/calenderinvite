import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingSlider from './components/OnboardingSlider';
import Home from './screens/Home';

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

  if (showOnboarding === null) return null;

  if (showOnboarding) {
    return <OnboardingSlider onDone={handleOnboardingFinish} />;
  }

  return <Home />;
}

export default App;
