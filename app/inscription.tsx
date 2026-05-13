import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from './supabase';

interface Props {
  onRetour: () => void;
}

export default function Inscription({ onRetour }: Props) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [chargement, setChargement] = useState(false);

  const handleInscription = async () => {
    setChargement(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: motDePasse,
    });

    if (error) {
      Alert.alert('Erreur', error.message);
    } else {
      Alert.alert('Succès', 'Compte créé ! Vérifie ton email.');
      onRetour();
    }
    setChargement(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Inscription</Text>

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
        placeholder="Mot de passe (min. 6 caractères)"
        value={motDePasse}
        onChangeText={setMotDePasse}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.bouton}
        onPress={handleInscription}
        disabled={chargement}
      >
        <Text style={styles.boutonTexte}>
          {chargement ? 'Chargement...' : "S'inscrire"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRetour}>
        <Text style={styles.lien}>Déjà un compte ? Se connecter</Text>
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