import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Select a Module</Text>

            <View style={styles.grid}>
                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#FF6B6B' }]}
                    onPress={() => navigation.navigate('Safety')}
                >
                    <Text style={styles.cardText}>Women's Safety</Text>
                    <Text style={styles.subText}>Threat Detection</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#4ECDC4' }]}
                    onPress={() => navigation.navigate('MissingPerson')}
                >
                    <Text style={styles.cardText}>Missing Persons</Text>
                    <Text style={styles.subText}>Face Recognition</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#45B7D1' }]}
                    onPress={() => navigation.navigate('Complaint')}
                >
                    <Text style={styles.cardText}>Complaints</Text>
                    <Text style={styles.subText}>NLP Categorizer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, { backgroundColor: '#FFA07A' }]}
                    onPress={() => navigation.navigate('Disaster')}
                >
                    <Text style={styles.cardText}>Disaster Relief</Text>
                    <Text style={styles.subText}>Resource Optimizer</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    card: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    subText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default HomeScreen;
