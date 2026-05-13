import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from './supabase';
import Inscription from './inscription';

export default function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [chargement, setChargement] = useState(false);
  const [voirInscription, setVoirInscription] = useState(false);

  if (voirInscription) {
    return <Inscription onRetour={() => setVoirInscription(false)} />;
  }

  const handleConnexion = async () => {
    setChargement(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: motDePasse,
    });

    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      Alert.alert('Succès', 'Connecté !');
    }
    setChargement(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={motDePasse}
        onChangeText={setMotDePasse}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.bouton}
        onPress={handleConnexion}
        disabled={chargement}
      >
        <Text style={styles.boutonTexte}>
          {chargement ? 'Chargement...' : 'Se connecter'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setVoirInscription(true)}>
        <Text style={styles.lien}>Pas de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titre: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  bouton: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  boutonTexte: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  lien: { textAlign: 'center', color: '#6200ee', marginTop: 10 },
});