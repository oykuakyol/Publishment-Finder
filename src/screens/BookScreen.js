import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BookScreen = ({ route }) => {
  const { book } = route.params;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.titleBackground]}>
        <Icon name="book" size={28} color="#fff" /> {book.title}
      </Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          <Icon name="list" size={20} color="#4CAF50" /> List Name: <Text style={styles.italic}>{book.list_name}</Text>
        </Text>
        <Text style={styles.text}>
          <Icon name="calendar-today" size={20} color="#FF5722" /> Newest published date: <Text style={styles.italic}>{book.newest_published_date}</Text>
        </Text>
        <Text style={styles.text}>
          <Icon name="calendar-today" size={20} color="#FF9800" /> Oldest published date: <Text style={styles.italic}>{book.oldest_published_date}</Text>
        </Text>
        <Text style={styles.text}>
          <Icon name="update" size={20} color="#2196F3" /> Updated: <Text style={styles.italic}>{book.updated}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  titleBackground: {
    backgroundColor: '#4CAF50', // Green background
    padding: 15,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Android shadow
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    lineHeight: 24,
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default BookScreen;
