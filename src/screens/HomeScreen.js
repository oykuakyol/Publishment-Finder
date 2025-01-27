
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { fetchBooks } from '../service/bookService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]); //books durumu için
  const [loading, setLoading] = useState(true); //verilerin yüklenip yüklenmediği
  const [searchText, setSearchText] = useState(''); //arama çubuğu
  const [currentPage, setCurrentPage] = useState(1); 
  const booksPerPage = 15; 

   useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks(); //books verilerini apıden alır 
        setBooks(booksData);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = books
    .filter((book) => 
      book.display_name.toLowerCase().includes(searchText.toLowerCase())
    );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage); 

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading books...</Text>
      </View>
    );
  }
   return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Search for books" 
        value={searchText} 
        onChangeText={setSearchText} 
      />
      <FlatList
        data={paginatedBooks} 
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate('Book', { book: item })}
          >
            <Text style={styles.bookTitle}><Icon name="book" size={20} color="#4CAF50" /> {item.display_name}</Text>
            <Text style={styles.bookAuthor}><Icon name="list" size={16} color="#FF5722" /> List Name: {item.list_name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id} 
      />
      <View style={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <TouchableOpacity 
            key={pageNumber} 
            style={[styles.paginationButton, currentPage === pageNumber && styles.activePaginationButton]} 
            onPress={() => setCurrentPage(pageNumber)}
          >
            <Text>{pageNumber}</Text>
          </TouchableOpacity>
        ))}
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  bookItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  activePaginationButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
});

export default HomeScreen;