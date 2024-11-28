import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';

export default function Summary({ route, navigation }) {
    const { tasks } = route.params;

    const completedTasks = tasks.filter(task => task.completed);
    const uncompletedTasks = tasks.filter(task => !task.completed);
    const completedPercentage = (tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0).toFixed(2);

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === 'None') return 'None';
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const isDarkMode = useColorScheme() === 'dark';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: isDarkMode ? '#121212' : '#f9f9f9',
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: isDarkMode ? '#ffffff' : '#333333',
            marginBottom: 20,
        },
        summary: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
        },
        summaryText: {
            fontSize: 18,
            color: isDarkMode ? '#dddddd' : '#333333',
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: isDarkMode ? '#ffffff' : '#333333',
            marginTop: 20,
            marginBottom: 10,
        },
        taskRow: {
            backgroundColor: isDarkMode ? '#222222' : '#ffffff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
        },
        taskText: {
            fontSize: 18,
            color: isDarkMode ? '#ffffff' : '#333333',
            fontWeight: '600',
        },
        deadlineText: {
            fontSize: 16,
            color: isDarkMode ? '#bbbbbb' : '#555555',
            marginTop: 5,
        },
        priorityText: {
            fontSize: 16,
            color: isDarkMode ? '#f39c12' : '#e67e22',
            marginTop: 5,
            fontWeight: '500',
        },
        button: {
            backgroundColor: '#007bff',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
        },
        buttonText: {
            fontSize: 18,
            color: '#ffffff',
            fontWeight: 'bold',
        },
        emptyText: {
            fontSize: 18,
            color: isDarkMode ? '#aaaaaa' : '#999999',
            textAlign: 'center',
            marginTop: 20,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Summary</Text>

            {/* Total tasks summary */}
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total Tasks: {tasks.length}</Text>
                <Text style={styles.summaryText}>Completed Tasks: {completedTasks.length}</Text>
                <Text style={styles.summaryText}>Uncompleted Tasks: {uncompletedTasks.length}</Text>
                <Text style={styles.summaryText}>Completion Percentage: {completedPercentage}%</Text>
            </View>

            {/* Uncompleted tasks with deadlines and priority */}
            <Text style={styles.subtitle}>Uncompleted Tasks:</Text>
            {uncompletedTasks.length > 0 ? (
                <FlatList
                    data={uncompletedTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskRow}>
                            <Text style={styles.taskText}>{item.description}</Text>
                            <Text style={styles.deadlineText}>Deadline: {formatDate(item.deadline)}</Text>
                            <Text style={styles.priorityText}>Priority: {item.priority}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.emptyText}>No uncompleted tasks</Text>
            )}

            {/* Navigation Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}
