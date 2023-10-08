import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const InviteGeneration = () => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [mode, setMode] = useState<'date' | 'time'>('date');


    const onChangeStartDate = (event, selectedValue) => {
        if (Platform.OS === 'android' && mode === 'date') {
            setShowStartDatePicker(true);
            setMode('time');
        } else {
            setShowStartDatePicker(false);
            setMode('date');
            const currentDate = selectedValue || new Date();
            setStartDate(currentDate.toISOString());
        }
    };

    const onChangeEndDate = (event, selectedValue) => {
        if (Platform.OS === 'android' && mode === 'date') {
            setShowEndDatePicker(true);
            setMode('time');
        } else {
            setShowEndDatePicker(false);
            setMode('date');
            const currentDate = selectedValue || new Date();
            setEndDate(currentDate.toISOString());
        }
    };

    const constructICSString = icsData => {
        return `BEGIN:VCALENDAR
                VERSION:2.0
                BEGIN:VEVENT
                SUMMARY:${icsData.summary}
                DESCRIPTION:${icsData.description}
                LOCATION:${icsData.location}
                DTSTART:${icsData.startDate}
                DTEND:${icsData.endDate}
                END:VEVENT
                END:VCALENDAR`;
    };

    {showStartDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode={'datetime'}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || new Date();
            setShowStartDatePicker(false);
            setStartDate(currentDate.toISOString());
          }}
        />
      )}
      
      {showEndDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode={'datetime'}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || new Date();
            setShowEndDatePicker(false);
            setEndDate(currentDate.toISOString());
          }}
        />
      )}


    const handleGenerateAndSave = async () => {
        const icsString = constructICSString({ summary });
        const path = `${RNFS.DocumentDirectoryPath}/invite.ics`;

        try {
            await RNFS.writeFile(path, icsString, 'utf8');
            Alert.alert('Success', 'File saved successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to save the file.');
        }
    };

    const handleGenerateAndShare = async () => {
        const icsString = constructICSString({ summary });
        const path = `${RNFS.DocumentDirectoryPath}/invite.ics`;

        try {
            await RNFS.writeFile(path, icsString, 'utf8');

            Share.open({
                url: 'file://' + path,
                type: 'text/calendar',
                subject: 'Event Invite',
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to share the file.');
        }
    };

    return (
        <View style={styles.container}>
            
          <TextInput
            value={summary}
            onChangeText={setSummary}
            placeholder="Summary"
            style={styles.input}
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            style={styles.input}
          />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            style={styles.input}
          />
<Button title="Pick Start Date & Time" onPress={() => setShowStartDatePicker(true)} />
            <Text>{startDate}</Text>
            
            {showStartDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStartDate}
                />
            )}

            <Button title="Pick End Date & Time" onPress={() => setShowEndDatePicker(true)} />
            <Text>{endDate}</Text>
            
            {showEndDatePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEndDate}
                />
            )}
          
          <Button title="Generate and Save" onPress={handleGenerateAndSave} />
          <Button title="Generate and Share" onPress={handleGenerateAndShare} />
        </View>
      );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
        },
        input: {
            marginBottom: 12,
            padding: 10,
            borderWidth: 1,
            borderRadius: 8,
        },
    });
    
    export default InviteGeneration;
