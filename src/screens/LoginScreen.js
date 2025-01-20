import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([-\w]+\.)*([\w]{2,})+$/;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = () => !EMAIL_REGEX.test(email);
  const validatePassword = () => password === '';

  const handleLogin = async () => {
    if (validateEmail() || validatePassword()) {
      setError('Por favor verifique sus datos.');
      return;
    }

    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      setError(error.message);
    }
  
    setLoading(false);
  };

  const showError = () => (
    <Text style={styles.error}>
      {validateEmail()
        ? 'El formato del email es invalido.'
        : validatePassword() 
          ? 'La contrasenia no puede estar vacia.'
          : null}
    </Text>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text h3 style={styles.title}>Mi Comida Favorita</Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setError(null);
          }}
          autoCapitalize="none"
        />
        {showError()}
        <Input
          placeholder="Contrasenia"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setError(null);
          }}
          secureTextEntry
        />
        <Button 
          title="Iniciar Sesion" 
          onPress={handleLogin} 
          disabled={validateEmail() || validatePassword()}
          containerStyle={styles.button} 
          loadingProps={{ color: 'white' }} // Esto cambia el color del indicador de carga
          loading={loading} // Se activa cuando setLoading(true) en handleLogin
        />
        <Button 
          title="Registrarse" 
          type="outline"
          onPress={() => navigation.navigate('Register')}
          containerStyle={styles.button}
        />  
        {loading && (
          <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 20 }}/>
        )}
      </View>
    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
