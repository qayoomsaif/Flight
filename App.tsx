import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ThemeProvider, useTheme} from './src/theme/ThemeContext'; // Import your ThemeProvider
import store from './src/redux/store'; // Import Redux store
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

const queryClient = new QueryClient();

const AppContent = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.floatingButton, {backgroundColor: theme.primary}]}
      onPress={toggleTheme}>
      <Text style={[styles.buttonText, {color: theme.white}]}>
        Change theme
      </Text>
    </TouchableOpacity>
  );
};

const App: React.FC = () => {
  return (
    // <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <NavigationContainer>
              <StackNavigator />
              <AppContent />
            </NavigationContainer>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    // </SafeAreaView>
  );
};

export default App;

// Styles
const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 50,
    right: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
