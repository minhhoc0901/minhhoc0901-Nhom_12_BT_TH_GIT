// API Base URL - json-server default port
const API_URL = 'http://localhost:3000';

/**
 * Lấy danh sách tất cả sách
 * @returns {Promise<Array>} Mảng chứa danh sách sách
 */
async function getAllBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

/**
 * Lấy thông tin chi tiết một cuốn sách theo ID
 * @param {number|string} id - ID của sách cần lấy
 * @returns {Promise<Object>} Thông tin chi tiết sách
 */
async function getBookById(id) {
    try {
        const response = await fetch(`${API_URL}/books/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const book = await response.json();
        return book;
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
}

/**
 * Xóa một cuốn sách theo ID
 * @param {number|string} id - ID của sách cần xóa
 * @returns {Promise<Object>} Kết quả xóa
 */
async function deleteBook(id) {
    try {
        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { success: true, message: 'Xóa sách thành công' };
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

/**
 * Thêm sách mới
 * @param {Object} bookData - Dữ liệu sách mới
 * @returns {Promise<Object>} Sách vừa được thêm
 */
async function addBook(bookData) {
    try {
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newBook = await response.json();
        return newBook;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}

/**
 * Cập nhật thông tin sách
 * @param {number|string} id - ID của sách cần cập nhật
 * @param {Object} bookData - Dữ liệu sách cần cập nhật
 * @returns {Promise<Object>} Sách sau khi cập nhật
 */
async function updateBook(id, bookData) {
    try {
        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedBook = await response.json();
        return updatedBook;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
}

/**
 * Tìm kiếm sách theo từ khóa
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {Promise<Array>} Danh sách sách tìm được
 */
async function searchBooks(keyword) {
    try {
        const response = await fetch(`${API_URL}/books?q=${encodeURIComponent(keyword)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
}
