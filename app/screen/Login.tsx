import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithCustomToken, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error: any){
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!')
        } catch (error: any){
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.titleLogin}>Welcome
            <Text>
                👋
            </Text>
        </Text>
        <View>
        <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>

        { loading ? (
            <ActivityIndicator size='large' color='#ffffff'/>
        ) : (
            <>
            <Pressable style={styles.button} onPress={signIn}>
                <Text style={styles.text}>Login</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={signUp}>
                <Text style={styles.text}>Sign Up</Text>
            </Pressable>
            </>
        )}
        </View>
        </KeyboardAvoidingView>
    </View>
    );
};

export default Login; 

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 0,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#14213d',
    },
    input: {
        marginBottom: 15,
        marginHorizontal: 60,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    button: {
        marginVertical: 4,
        marginHorizontal: 120,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      titleLogin: {
        marginHorizontal: 100,
        marginBottom: 50,
        justifyContent: 'center',
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
      }
})

function withRepeat(arg0: any, arg1: number) {
    throw new Error('Function not implemented.');
}


function withSequence(arg0: any, arg1: any): any {
    throw new Error('Function not implemented.');
}


function withTiming(arg0: number, arg1: { duration: number; }): any {
    throw new Error('Function not implemented.');
}
