
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
 * Lay danh sach sach theo category bang API
 * @param {string} category - Category can loc
 * @returns {Promise<Array>} Mang chua danh sach sach
 */
async function getBooksByCategory(category) {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    try {
        const response = await fetch(`${API_URL}/books${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Error fetching books by category:', error);
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

async function SearchBook(event) {
    event.preventDefault();

    const keyword = document.getElementById("keyword").value.trim().toLowerCase();
    const resultDiv = document.getElementById("searchResult");

    if (keyword === "") {
        alert("Vui lòng nhập từ khóa tìm kiếm");
        return;
    }

    try {
        const allBooks = await getAllBooks();
        const data = allBooks.filter(book =>
            book.title.toLowerCase().includes(keyword) ||
            book.author.toLowerCase().includes(keyword)
        );

        resultDiv.innerHTML = "";

        if (data.length === 0) {
            resultDiv.innerHTML = '<div class="alert alert-warning">Không tìm thấy sách nào phù hợp</div>';
            return;
        }

        const row = document.createElement("div");
        row.className = "row g-4";

        data.forEach(book => {
            const col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
            col.innerHTML = `
                <div class="card book-card h-100">
                    <img src="${book.image}" class="card-img-top" alt="${book.title}" 
                         style="height: 300px; object-fit: cover;"
                         onerror="this.src='https://via.placeholder.com/300x400/667eea/ffffff?text=No+Image'">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text text-muted mb-2">Tác giả: ${book.author}</p>
                        <p class="card-text text-primary fw-bold mb-3">
                            ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price)}
                        </p>
                        <a href="book_detail.html?id=${book.id}" class="btn btn-primary mt-auto">Xem chi tiết</a>
                    </div>
                </div>
            `;
            row.appendChild(col);
        });

        resultDiv.appendChild(row);

    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = '<div class="alert alert-danger">Có lỗi xảy ra khi tìm kiếm</div>';
    }
}

