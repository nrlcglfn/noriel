import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GoalApp = () => {
  const [goal, setGoal] = useState('');
  const [goalsList, setGoalsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#ff0000', '#ffa500', '#ffff00', '#008000']; // Red, Orange, Yellow, Green

  const addGoalHandler = () => {
    if (editingIndex !== null) {
      // Editing existing goal
      const updatedGoals = [...goalsList];
      updatedGoals[editingIndex].value = goal;
      setGoalsList(updatedGoals);
      setEditingIndex(null);
    } else {
      // Adding new goal
      const color = colors[colorIndex];
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // Cycle through colors
      setGoalsList([
        ...goalsList,
        { key: Math.random().toString(), value: goal, color: color, isVisible: true },
      ]);
    }
    setGoal('');
  };

  const startEditing = (index) => {
    setGoal(goalsList[index].value);
    setEditingIndex(index);
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...goalsList];
    updatedGoals.splice(index, 1);
    setGoalsList(updatedGoals);
  };

  const renderItem = ({ item, index }) => {
    const toggleVisibility = () => {
      const updatedGoals = [...goalsList];
      updatedGoals[index].isVisible = !updatedGoals[index].isVisible;
      setGoalsList(updatedGoals);
    };

    const goalText = item.isVisible ? item.value : '*'.repeat(item.value.length);

    return (
      <View style={{ ...styles.goalItem, backgroundColor: item.color }}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.goalText}>{goalText}</Text>
        <TouchableOpacity onPress={() => deleteGoal(index)}>
          <Text style={styles.deleteButton}>X     </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleVisibility}>
          <Text style={styles.hideButton}>{item.isVisible ?  'HIDE' : 'SHOW' }</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => startEditing(index)}>
          <Text style={styles.editButton}>     EDIT</Text>
        </TouchableOpacity>
        
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Goal"
          style={styles.input}
          onChangeText={(text) => setGoal(text)}
          value={goal}
        />
        <Button
          title={editingIndex !== null ? 'Edit Goal' : 'Add Goal'}
          onPress={addGoalHandler}
        />
      </View>
      <ScrollView>
        <FlatList
          data={goalsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 30 },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
  },
  goalItem: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border:'none',
  },
  bullet: { fontSize: 20, marginRight: 10 },
  goalText: { flex: 1, fontSize: 16 },
  hideButton: { color: 'black', fontSize: 16 },
  editButton: { color: 'black', fontSize: 16 },
  deleteButton: { color: 'black', fontSize: 16 },
});

export default GoalApp;
