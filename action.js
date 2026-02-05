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

// ==================== BOOK DETAIL APIs ====================

/**
 * Lấy chi tiết sách kèm theo sách liên quan cùng thể loại
 * @param {number|string} id - ID của sách
 * @param {number} limit - Số lượng sách liên quan tối đa (mặc định: 4)
 * @returns {Promise<Object>} Object chứa thông tin sách và danh sách sách liên quan
 */
async function getBookWithRelated(id, limit = 4) {
    try {
        // Lấy thông tin sách chính
        const book = await getBookById(id);
        
        // Lấy các sách cùng thể loại
        const relatedBooks = await getBooksByCategory(book.category, limit + 1);
        
        // Lọc bỏ sách hiện tại khỏi danh sách liên quan
        const filteredRelated = relatedBooks
            .filter(b => b.id !== book.id)
            .slice(0, limit);
        
        return {
            book: book,
            relatedBooks: filteredRelated,
            totalRelated: filteredRelated.length
        };
    } catch (error) {
        console.error('Error fetching book with related:', error);
        throw error;
    }
}

/**
 * Lấy danh sách sách theo thể loại
 * @param {string} category - Tên thể loại
 * @param {number} limit - Số lượng sách tối đa (không bắt buộc)
 * @returns {Promise<Array>} Danh sách sách thuộc thể loại
 */
async function getBooksByCategory(category, limit) {
    try {
        const response = await fetch(`${API_URL}/books?category=${encodeURIComponent(category)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let books = await response.json();
        
        // Giới hạn số lượng nếu có
        if (limit && limit > 0) {
            books = books.slice(0, limit);
        }
        
        return books;
    } catch (error) {
        console.error('Error fetching books by category:', error);
        throw error;
    }
}

/**
 * Lấy danh sách sách theo tác giả
 * @param {string} author - Tên tác giả
 * @param {number} limit - Số lượng sách tối đa (không bắt buộc)
 * @returns {Promise<Array>} Danh sách sách của tác giả
 */
async function getBooksByAuthor(author, limit) {
    try {
        const response = await fetch(`${API_URL}/books?author=${encodeURIComponent(author)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let books = await response.json();
        
        // Giới hạn số lượng nếu có
        if (limit && limit > 0) {
            books = books.slice(0, limit);
        }
        
        return books;
    } catch (error) {
        console.error('Error fetching books by author:', error);
        throw error;
    }
}

/**
 * Lấy thống kê của một cuốn sách
 * @param {number|string} id - ID của sách
 * @returns {Promise<Object>} Thống kê sách
 */
async function getBookStats(id) {
    try {
        const book = await getBookById(id);
        const categoryBooks = await getBooksByCategory(book.category);
        const authorBooks = await getBooksByAuthor(book.author);
        
        return {
            bookId: book.id,
            totalBooksInCategory: categoryBooks.length,
            totalBooksByAuthor: authorBooks.length,
            averagePriceInCategory: calculateAveragePrice(categoryBooks),
            priceRank: calculatePriceRank(book, categoryBooks)
        };
    } catch (error) {
        console.error('Error fetching book stats:', error);
        throw error;
    }
}

/**
 * Tính giá trung bình của danh sách sách
 * @param {Array} books - Danh sách sách
 * @returns {number} Giá trung bình
 */
function calculateAveragePrice(books) {
    if (!books || books.length === 0) return 0;
    const total = books.reduce((sum, book) => sum + (book.price || 0), 0);
    return Math.round(total / books.length);
}

/**
 * Xác định thứ hạng giá của sách trong thể loại
 * @param {Object} book - Sách cần xếp hạng
 * @param {Array} categoryBooks - Danh sách sách cùng thể loại
 * @returns {string} Thứ hạng: 'cheap', 'average', 'expensive'
 */
function calculatePriceRank(book, categoryBooks) {
    const avgPrice = calculateAveragePrice(categoryBooks);
    if (book.price < avgPrice * 0.8) return 'cheap';
    if (book.price > avgPrice * 1.2) return 'expensive';
    return 'average';
}

/**
 * Kiểm tra tính hợp lệ của dữ liệu sách
 * @param {Object} bookData - Dữ liệu sách cần kiểm tra
 * @returns {Object} Kết quả kiểm tra {isValid: boolean, errors: Array}
 */
function validateBookData(bookData) {
    const errors = [];
    
    // Kiểm tra các trường bắt buộc
    if (!bookData.title || bookData.title.trim() === '') {
        errors.push('Tên sách không được để trống');
    }
    
    if (!bookData.author || bookData.author.trim() === '') {
        errors.push('Tên tác giả không được để trống');
    }
    
    if (!bookData.price || bookData.price <= 0) {
        errors.push('Giá sách phải lớn hơn 0');
    }
    
    if (!bookData.category || bookData.category.trim() === '') {
        errors.push('Thể loại không được để trống');
    }
    
    if (!bookData.description || bookData.description.trim() === '') {
        errors.push('Mô tả không được để trống');
    }
    
    // Kiểm tra định dạng URL hình ảnh (nếu có)
    if (bookData.image && !isValidURL(bookData.image)) {
        errors.push('URL hình ảnh không hợp lệ');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Kiểm tra URL có hợp lệ không
 * @param {string} url - URL cần kiểm tra
 * @returns {boolean} True nếu URL hợp lệ
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Cập nhật một phần thông tin sách (PATCH)
 * @param {number|string} id - ID của sách cần cập nhật
 * @param {Object} partialData - Dữ liệu cần cập nhật (một phần)
 * @returns {Promise<Object>} Sách sau khi cập nhật
 */
async function patchBook(id, partialData) {
    try {
        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partialData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedBook = await response.json();
        return updatedBook;
    } catch (error) {
        console.error('Error patching book:', error);
        throw error;
    }
}
