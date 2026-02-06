const API_URL = "http://localhost:3000/books";

// ================= LOAD ALL BOOKS (CHO INDEX) =================
async function getAllBooks() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Không tải được danh sách sách");
    return await res.json();
}

// ================= GET BOOK BY ID (CHO EDIT) =================
async function getBookById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Không tìm thấy sách");
    return await res.json();
}

// ================= UPDATE BOOK (SỬA) =================
async function updateBook(id, bookData) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
    });

    if (!res.ok) throw new Error("Cập nhật thất bại");
    return await res.json();
}

// ================= EDIT PAGE LOGIC =================
const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

// chỉ chạy khi ở trang edit.html
if (document.getElementById("editBookForm")) {
    loadBook();

    document.getElementById("editBookForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const updatedBook = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            price: Number(document.getElementById("price").value)
        };

        try {
            await updateBook(bookId, updatedBook);
            alert("✅ Cập nhật sách thành công!");
            window.location.href = "index.html";
        } catch (error) {
            alert("❌ Lỗi khi cập nhật sách!");
        }
    });
}

async function loadBook() {
    try {
        const book = await getBookById(bookId);

        document.getElementById("bookId").value = book.id;
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("price").value = book.price;
    } catch (error) {
        alert("❌ Lỗi khi tải dữ liệu sách!");
    }
}
