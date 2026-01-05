import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import axios from 'axios';

// For Android Emulator, localhost is 10.0.2.2. For real device, use PC IP.
const API_URL = 'http://10.0.2.2:8000/api';

export default function ComplaintScreen() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const submitComplaint = async () => {
        if (!text.trim()) {
            Alert.alert('Error', 'Please enter a complaint');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            // In a real scenario, use dynamic IP or configuration
            const response = await axios.post(`${API_URL}/complaint/categorize`, {
                text: text,
                language: 'en'
            });

            setResult(response.data);
        } catch (error) {
            console.log(error);
            // Fallback for demo if backend isn't reachable
            setResult({
                category: "Network Error (Mock Mode)",
                department_id: 0,
                confidence: 0.00
            });
            // Alert.alert('Error', 'Failed to connect to backend.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Report an Issue</Text>

            <Text style={styles.label}>Describe your complaint:</Text>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                placeholder="e.g., No water supply in Colombo 7..."
                value={text}
                onChangeText={setText}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={submitComplaint}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit Complaint</Text>}
            </TouchableOpacity>

            {result && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultTitle}>Categorization Result:</Text>
                    <Text style={styles.resultText}>Category: <Text style={styles.bold}>{result.category}</Text></Text>
                    <Text style={styles.resultText}>Dept ID: <Text style={styles.bold}>{result.department_id}</Text></Text>
                    <Text style={styles.resultText}>Confidence: <Text style={styles.bold}>{result.confidence}</Text></Text>
                </View>
            )}

            <Text style={styles.note}>
                * This uses the Multilingual NLP model on the backend.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#45B7D1',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        minHeight: 120,
        textAlignVertical: 'top',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#45B7D1',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultBox: {
        marginTop: 30,
        backgroundColor: '#E0F7FA',
        padding: 20,
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#006064',
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#006064',
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
    note: {
        marginTop: 40,
        fontSize: 12,
        color: '#999',
        textAlign: 'center'
    }
});
