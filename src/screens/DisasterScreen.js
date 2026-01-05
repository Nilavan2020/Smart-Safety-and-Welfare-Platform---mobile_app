import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const API_URL = 'http://10.0.2.2:8000/api';

export default function DisasterScreen() {
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [locationName, setLocationName] = useState('Fetching location...');

    const getPrediction = async () => {
        setLoading(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationName('Permission denied');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocationName(`Lat: ${location.coords.latitude.toFixed(2)}, Lon: ${location.coords.longitude.toFixed(2)}`);

            // Call Backend
            const response = await axios.post(`${API_URL}/disaster/predict`, {
                location_id: "Colombo_Region_1", // Mock location ID
                date: new Date().toISOString().split('T')[0]
            });

            setPrediction(response.data);

        } catch (error) {
            console.log("Error:", error);
            // Mock Fallback
            setPrediction({
                weather_prediction: { rainfall_mm: 120.5, flood_risk: "High" },
                recommended_resources: { boats: 5, food_packs: 1000, dry_rations_kg: 200 }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Disaster Resource Optimizer</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Current Location</Text>
                <Text style={styles.cardText}>{locationName}</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={getPrediction}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Assess Risk & Resources</Text>}
            </TouchableOpacity>

            {prediction && (
                <View style={styles.resultContainer}>
                    <View style={[styles.alertBox, { backgroundColor: prediction.weather_prediction.flood_risk === 'High' ? '#FFEBEE' : '#E8F5E9' }]}>
                        <Text style={[styles.riskText, { color: prediction.weather_prediction.flood_risk === 'High' ? '#D32F2F' : '#388E3C' }]}>
                            Risk Level: {prediction.weather_prediction.flood_risk.toUpperCase()}
                        </Text>
                        <Text style={styles.rainText}>Predicted Rainfall: {prediction.weather_prediction.rainfall_mm} mm</Text>
                    </View>

                    <Text style={styles.sectionHeader}>Recommended Resources:</Text>
                    <View style={styles.resourceGrid}>
                        <View style={styles.resourceItem}>
                            <Text style={styles.resourceValue}>{prediction.recommended_resources.boats}</Text>
                            <Text style={styles.resourceLabel}>Boats</Text>
                        </View>
                        <View style={styles.resourceItem}>
                            <Text style={styles.resourceValue}>{prediction.recommended_resources.food_packs}</Text>
                            <Text style={styles.resourceLabel}>Food Packs</Text>
                        </View>
                        <View style={styles.resourceItem}>
                            <Text style={styles.resourceValue}>{prediction.recommended_resources.dry_rations_kg}</Text>
                            <Text style={styles.resourceLabel}>Rations (kg)</Text>
                        </View>
                    </View>
                </View>
            )}
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFA07A',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FFA07A',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultContainer: {
        width: '100%',
    },
    alertBox: {
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    riskText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rainText: {
        fontSize: 16,
        color: '#444',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    resourceGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    resourceItem: {
        width: '30%',
        backgroundColor: '#FAFAFA',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    resourceValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    resourceLabel: {
        fontSize: 12,
        color: '#666',
    }
});
