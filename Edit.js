import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, useColorScheme } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Edit({ navigation, route }) {
    const { tasks, setTasks, taskId } = route.params;
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const taskToEdit = tasks[taskIndex];

    const [taskDescription, setTaskDescription] = useState(taskToEdit.description);
    const [deadline, setDeadline] = useState(taskToEdit.deadline !== 'None' ? new Date(taskToEdit.deadline) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [priority, setPriority] = useState(taskToEdit.priority);
    const [hasDeadline, setHasDeadline] = useState(taskToEdit.deadline !== 'None'); // Check if task had a deadline

    const isDarkMode = useColorScheme() === 'dark';

    const handleSaveChanges = () => {
        if (!taskDescription.trim()) {
            Alert.alert('Error', 'Task description cannot be empty.');
            return;
        }

        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = {
            ...taskToEdit,
            description: taskDescription,
            deadline: hasDeadline ? deadline.toISOString() : 'None',
            priority,
        };

        setTasks(updatedTasks);
        navigation.goBack();
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || deadline;
        setShowDatePicker(false);
        setDeadline(currentDate);
    };

    const handleDeleteTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(taskIndex, 1);
        setTasks(updatedTasks);
        navigation.goBack();
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: isDarkMode ? '#121212' : '#f9f9f9',
        },
        label: {
            fontSize: 18,
            marginBottom: 10,
            color: isDarkMode ? '#ffffff' : '#333333',
        },
        input: {
            borderWidth: 1,
            borderColor: isDarkMode ? '#444444' : '#cccccc',
            backgroundColor: isDarkMode ? '#222222' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#333333',
            padding: 15,
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 16,
        },
        checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        selectedDateText: {
            fontSize: 16,
            color: isDarkMode ? '#bbbbbb' : '#333333',
            marginBottom: 10,
        },
        pickerContainer: {
            borderWidth: 1,
            borderColor: isDarkMode ? '#444444' : '#cccccc',
            borderRadius: 8,
            padding: 10,
            backgroundColor: isDarkMode ? '#222222' : '#ffffff',
            marginBottom: 20,
        },
        pickerText: {
            color: isDarkMode ? '#ffffff' : '#333333',
            fontSize: 16,
        },
        button: {
            backgroundColor: '#007bff',
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 20,
        },
        buttonText: {
            fontSize: 18,
            color: '#ffffff',
            fontWeight: 'bold',
        },
        deleteButton: {
            backgroundColor: '#ff4d4d',
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 20,
        },
        deleteButtonText: {
            fontSize: 18,
            color: '#ffffff',
            fontWeight: 'bold',
        },
        deadlineButton: {
            backgroundColor: '#4caf50',
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 15,
        },
        deadlineButtonText: {
            fontSize: 16,
            color: '#ffffff',
        },
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
            <Text style={styles.label}>Edit Task:</Text>
            <TextInput
                style={styles.input}
                value={taskDescription}
                onChangeText={setTaskDescription}
                placeholder="Enter task description"
                placeholderTextColor={isDarkMode ? '#aaaaaa' : '#999999'}
            />

            <View style={styles.checkboxContainer}>
                <Text style={styles.label}>Set Deadline:</Text>
                <Switch
                    value={hasDeadline}
                    onValueChange={setHasDeadline}
                    thumbColor={hasDeadline ? '#4caf50' : isDarkMode ? '#666666' : '#bbbbbb'}
                />
            </View>

            {hasDeadline && (
                <>
                    <Text style={styles.selectedDateText}>
                        {deadline ? `Selected Deadline: ${formatDate(deadline)}` : 'No date selected'}
                    </Text>
                    <TouchableOpacity style={styles.deadlineButton} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.deadlineButtonText}>Pick Deadline</Text>
                    </TouchableOpacity>
                </>
            )}

            {showDatePicker && (
                <DateTimePicker
                    value={deadline || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <Text style={styles.label}>Priority:</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    onValueChange={(value) => setPriority(value)}
                    value={priority}
                    style={pickerStyles}
                    items={[
                        { label: 'Low', value: 'low' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'High', value: 'high' },
                    ]}
                    placeholder={{ label: 'Select Priority', value: null }}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    Alert.alert(
                        'Confirm Delete',
                        'Are you sure you want to delete this task?',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Delete', onPress: handleDeleteTask },
                        ],
                        { cancelable: true }
                    );
                }}
            >
                <Text style={styles.deleteButtonText}>Delete Task</Text>
            </TouchableOpacity>
        </View>
    );
}
