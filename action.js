
// API Base URL - json-server default port
const API_URL = "http://localhost:3000";

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
        console.error("Error fetching books:", error);
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
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return { success: true, message: "Xóa sách thành công" };
    } catch (error) {
        console.error("Error deleting book:", error);
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
        console.error("Error fetching book:", error);
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
        const data = allBooks.filter(
            (book) =>
                book.title.toLowerCase().includes(keyword) ||
                book.author.toLowerCase().includes(keyword),
        );

        resultDiv.innerHTML = "";

        if (data.length === 0) {
            resultDiv.innerHTML =
                '<div class="alert alert-warning">Không tìm thấy sách nào phù hợp</div>';
            return;
        }

        const row = document.createElement("div");
        row.className = "row g-4";

        data.forEach((book) => {
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
                            ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(book.price)}
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
        resultDiv.innerHTML =
            '<div class="alert alert-danger">Có lỗi xảy ra khi tìm kiếm</div>';
    }
}

//Thêm Sách

async function AddBook(event) {
    event.preventDefault();
    const form = document.getElementById("addBookForm");
    const book = {
        title: form.title.value,
        author: form.author.value,
        description: form.description.value,
        price: Number(form.price.value),
        category: form.category.value,
        image: "",
    };

    if (form.image.files.length > 0) {
        book.image = `../images/${form.image.files[0].name}`;
    }

    try {
        const res = await fetch(`${API_URL}/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });

        if (!res.ok) {
            throw new Error("Thêm sách thất bại");
        }

        const data = await res.json();
        console.log("Book mới:", data);

        alert("Thêm sách thành công!");
        form.reset();

        // Ẩn modal
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("addBookModal"),
        );
        modal.hide();
    } catch (err) {
        alert("Có lỗi xảy ra");
        console.error(err);
    }
}

// ================= UPDATE BOOK (SỬA) =================
/**
 * Cập nhật thông tin sách
 * @param {number|string} id - ID của sách cần cập nhật
 * @param {Object} bookData - Dữ liệu sách cần cập nhật
 * @returns {Promise<Object>} Kết quả cập nhật
 */
async function updateBook(id, bookData) {
    try {
        const res = await fetch(`${API_URL}/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        });

        if (!res.ok) throw new Error("Cập nhật thất bại");
        return await res.json();
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

/**
 * Upload hình ảnh cho sách
 * Lưu tên file vào database với path folder
 * @param {File} imageFile - File hình ảnh
 * @returns {Promise<string>} Tên file đã upload
 */
async function uploadBookImage(imageFile) {
    if (!imageFile) return null;

    try {
        // Tạo path hình ảnh: ../images/filename
        const fileName = imageFile.name;
        const imagePath = `../images/${fileName}`;

        console.log("Hình ảnh được lưu:", imagePath);
        return imagePath;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

/**
 * Cập nhật sách từ form modal
 * Hỗ trợ upload hình ảnh mới
 * @param {Event} event - Form submit event
 * @param {number|string} bookId - ID của sách cần cập nhật
 */
async function UpdateBookWithImage(event, bookId) {
    event.preventDefault();

    const form = event.target;
    const imageInput = form.image || document.getElementById('editImage');

    // Chuẩn bị dữ liệu cập nhật
    const updatedBook = {
        title: form.title?.value || document.getElementById('editTitle')?.value,
        author: form.author?.value || document.getElementById('editAuthor')?.value,
        description: form.description?.value || document.getElementById('editDescription')?.value,
        price: Number(form.price?.value || document.getElementById('editPrice')?.value),
        category: form.category?.value || document.getElementById('editCategory')?.value,
    };

    try {
        // Upload hình ảnh mới nếu có
        if (imageInput && imageInput.files.length > 0) {
            const imageName = await uploadBookImage(imageInput.files[0]);
            if (imageName) {
                updatedBook.image = imageName;
            }
        }

        // Cập nhật thông tin sách
        await updateBook(bookId, updatedBook);
        console.log("Sách đã được cập nhật thành công!");
        return true;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

// Edit functionality is now handled in index.html with modal
