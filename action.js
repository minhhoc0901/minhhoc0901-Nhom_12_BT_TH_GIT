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
