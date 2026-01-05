import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Accelerometer } from 'expo-sensors';

export default function SafetyScreen() {
    const [monitoring, setMonitoring] = useState(false);
    const [threatLevel, setThreatLevel] = useState('Safe');
    const [data, setData] = useState({ x: 0, y: 0, z: 0 });

    // MOCK: Motion Detection Logic
    useEffect(() => {
        let subscription;
        if (monitoring) {
            subscription = Accelerometer.addListener(accelerometerData => {
                setData(accelerometerData);
                // Simple threshold for "Abnormal Motion" (e.g., sudden shake)
                const totalForce = Math.abs(accelerometerData.x) + Math.abs(accelerometerData.y) + Math.abs(accelerometerData.z);
                if (totalForce > 2.5) { // Threshold
                    setThreatLevel('Possible Struggle!');
                } else {
                    setThreatLevel('Monitoring...');
                }
            });
            Accelerometer.setUpdateInterval(500);
        } else {
            setThreatLevel('Safe');
        }
        return () => subscription && subscription.remove();
    }, [monitoring]);

    const toggleMonitoring = async () => {
        if (!monitoring) {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Audio permission is required for threat detection.');
                return;
            }
            setMonitoring(true);
        } else {
            setMonitoring(false);
        }
    };

    const sendSOS = () => {
        Alert.alert('SOS SENT', 'Alerting emergency contacts and nearby authorities!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Women's Safety Shield</Text>

            <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Status:</Text>
                <Text style={[styles.statusValue, { color: threatLevel === 'Safe' ? 'green' : 'red' }]}>
                    {threatLevel}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.monitorButton, { backgroundColor: monitoring ? '#555' : '#007AFF' }]}
                onPress={toggleMonitoring}
            >
                <Text style={styles.buttonText}>{monitoring ? 'Stop Monitoring' : 'Start Monitoring'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sosButton} onPress={sendSOS}>
                <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
                * In a real app, this would run the TFLite models for Audio (CNN) and Motion (LSTM) in the background.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    statusContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 18,
        color: '#666',
    },
    statusValue: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 10,
    },
    monitorButton: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    sosButton: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginBottom: 20,
    },
    sosText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    note: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});
