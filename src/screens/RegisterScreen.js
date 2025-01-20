import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = () => !EMAIL_REGEX.test(email);
  const validatePassword = () => !PASSWORD_REGEX.test(password);

  const handleRegister = async () => {
    if (validateEmail() || validatePassword()) {
      setError("Por favor verifique sus datos.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      setError(error.message);
    }
  };

  const showError = () => (
    <Text style={styles.error}>
      {validateEmail()
        ? "El formato del email es invalido."
        : validatePassword()
        ? "La contrasenia debe contener al menos 8 caracteres, una letra mayuscula, minuscula, un numero y un caracter especial (!@#$%^&*)."
        : null}
    </Text>
  );

  const showConfirmError = () => (
    <Text style={styles.error}>
      {password !== confirmPassword ? "Las contrasenias no coinciden." : null}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>
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
      <Input
        placeholder="Confirmar Contrasenia"
        value={confirmPassword}
        onChangeText={(value) => {
          setConfirmPassword(value);
          setError(null);
        }}
        secureTextEntry
      />
      {showConfirmError()}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      <Button
        title="Registrarse"
        onPress={handleRegister}
        containerStyle={styles.button}
      />
      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.navigate("Login")}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
