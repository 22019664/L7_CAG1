import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function Home({ navigation }) {
    const [tasks, setTasks] = useState([
        { id: '1', description: 'Buy groceries', completed: false, deadline: 'None', priority: 'medium' },
        { id: '2', description: 'Clean the house', completed: true, deadline: '2024-11-30T00:00:00.000Z', priority: 'low' },
    ]);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('priority');

    const isDarkMode = useColorScheme() === 'dark';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'uncompleted') return !task.completed;
    });

    const toggleCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const priorityOrder = { high: 3, medium: 2, low: 1 };

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortBy === 'priority') {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        } else if (sortBy === 'deadline') {
            const deadlineA = a.deadline === 'None' ? null : new Date(a.deadline);
            const deadlineB = b.deadline === 'None' ? null : new Date(b.deadline);

            if (!deadlineA && !deadlineB) return 0;

            if (!deadlineA) return 1;
            if (!deadlineB) return -1;

            return deadlineA - deadlineB;
        }
    });

    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: isDarkMode ? '#121212' : '#f0f0f0',
        },
        label: {
            fontSize: 18,
            marginBottom: 10,
            color: isDarkMode ? '#fff' : '#333',
        },
        pickerContainer: {
            borderWidth: 1,
            borderColor: isDarkMode ? '#444' : '#ccc',
            borderRadius: 8,
            marginBottom: 20,
            height: 50,
            justifyContent: 'center',
            backgroundColor: isDarkMode ? '#222' : '#fff',
        },
        taskCard: {
            flexDirection: 'row',
            backgroundColor: isDarkMode ? '#1c1c1c' : '#fff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        },
        taskDetails: { flex: 1 },
        circle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        completedCircle: { backgroundColor: '#4caf50' },
        checkmark: { fontSize: 14, color: '#fff' },
        taskText: {
            fontSize: 18,
            color: isDarkMode ? '#fff' : '#333',
        },
        strikethrough: { textDecorationLine: 'line-through', color: '#aaa' },
        deadlineText: { fontSize: 14, color: isDarkMode ? '#aaa' : '#333' },
        priorityText: { fontSize: 14 },
        priorityhigh: { color: '#e74c3c' },
        prioritymedium: { color: '#f1c40f' },
        prioritylow: { color: '#2ecc71' },
        priorityBadge: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            alignSelf: 'flex-start',
        },
        badgehigh: { backgroundColor: '#e74c3c' },
        badgemedium: { backgroundColor: '#f1c40f' },
        badgelow: { backgroundColor: '#2ecc71' },
        badgeText: { color: '#fff', fontWeight: 'bold' },
        addButton: {
            backgroundColor: '#4caf50',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 10,
        },
        viewSummaryButton: {
            backgroundColor: '#007bff',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 10,
        },
        buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
    });

    const pickerStyles = {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: isDarkMode ? '#444' : '#ccc',
            borderRadius: 8,
            backgroundColor: isDarkMode ? '#222' : '#f8f8f8',
            color: isDarkMode ? '#fff' : '#333',
            paddingRight: 30,
        },
        inputAndroid: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: isDarkMode ? '#444' : '#ccc',
            borderRadius: 8,
            backgroundColor: isDarkMode ? '#222' : '#f8f8f8',
            color: isDarkMode ? '#fff' : '#333',
            paddingRight: 30,
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Filter Tasks:</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={(value) => setFilter(value)}
                    value={filter}
                    style={pickerStyles}
                    items={[
                        { label: 'All Tasks', value: 'all' },
                        { label: 'Completed Tasks', value: 'completed' },
                        { label: 'Uncompleted Tasks', value: 'uncompleted' },
                    ]}
                />
            </View>

            <Text style={styles.label}>Sort Tasks By:</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={(value) => setSortBy(value)}
                    value={sortBy}
                    style={pickerStyles}
                    items={[
                        { label: 'Priority', value: 'priority' },
                        { label: 'Deadline', value: 'deadline' },
                    ]}
                />
            </View>

            <FlatList
                data={sortedTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.taskCard}
                        onPress={() => navigation.navigate('Edit', { tasks, setTasks, taskId: item.id })}
                    >
                        <TouchableOpacity
                            style={[styles.circle, item.completed && styles.completedCircle]}
                            onPress={() => toggleCompletion(item.id)}
                        >
                            {item.completed && <Text style={styles.checkmark}>✓</Text>}
                        </TouchableOpacity>
                        <View style={styles.taskDetails}>
                            <Text style={[styles.taskText, item.completed && styles.strikethrough]}>
                                {item.description}
                            </Text>
                            <Text style={styles.deadlineText}>
                                Deadline: {item.deadline !== 'None' ? formatDate(item.deadline) : 'None'}
                            </Text>
                            <Text style={[styles.priorityText, styles[`priority${item.priority}`]]}>
                                Priority: {item.priority}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add', { tasks, setTasks })}>
                <Text style={styles.buttonText}>+ Add Task</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewSummaryButton} onPress={() => navigation.navigate('Summary', { tasks })}>
                <Text style={styles.buttonText}>View Summary</Text>
            </TouchableOpacity>
        </View>
    );
}
