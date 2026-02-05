# 📚 Book Detail Feature - API Documentation

## 👋 Giới thiệu

Feature này bao gồm:
- ✅ **Trang Book Detail** - Hiển thị chi tiết sách với thiết kế đẹp mắt
- ✅ **API Functions** - Các hàm xử lý API cho Book Detail
- ✅ **API Testing Page** - Trang test API interactive
- ✅ **Full Documentation** - Tài liệu đầy đủ

---

## 🚀 Cách chạy dự án

### Bước 1: Cài đặt Dependencies

```bash
npm install
```

### Bước 2: Khởi động JSON Server

```bash
npx json-server db.json --port 3000
```

Hoặc có thể thêm vào `package.json`:

```json
{
  "scripts": {
    "start": "json-server db.json --port 3000"
  }
}
```

Sau đó chạy:
```bash
npm start
```

### Bước 3: Mở trang web

Server sẽ chạy tại: `http://localhost:3000`

Các trang có sẵn:
- **Danh sách sách**: `pages/index.html`
- **Chi tiết sách**: `pages/book_detail.html?id=2`
- **Tìm kiếm**: `pages/search_book.html`
- **Test API**: `pages/api_test.html`

---

## 📁 Cấu trúc dự án

```
thanhnam_bookdetail/
├── action.js                 # File chứa tất cả API functions
├── db.json                   # Database JSON Server
├── package.json              # Dependencies
├── API_DOCUMENTATION.md      # Tài liệu API đầy đủ
├── README_API.md            # File này
└── pages/
    ├── index.html           # Trang danh sách sách
    ├── book_detail.html     # Trang chi tiết sách ⭐ NEW
    ├── search_book.html     # Trang tìm kiếm
    └── api_test.html        # Trang test API ⭐ NEW
```

---

## 🎯 Các API Functions đã thêm

### API Chi Tiết Sách

#### 1. `getBookWithRelated(id, limit)`
Lấy thông tin sách kèm danh sách sách liên quan cùng thể loại.

```javascript
const data = await getBookWithRelated(2, 4);
console.log(data.book);          // Sách chính
console.log(data.relatedBooks);  // 4 sách liên quan
console.log(data.totalRelated);  // Số lượng sách liên quan
```

#### 2. `getBooksByCategory(category, limit)`
Lấy danh sách sách theo thể loại.

```javascript
const books = await getBooksByCategory("Kỹ năng sống", 5);
console.log(books); // Tối đa 5 sách "Kỹ năng sống"
```

#### 3. `getBooksByAuthor(author, limit)`
Lấy danh sách sách theo tác giả.

```javascript
const books = await getBooksByAuthor("Nguyễn Nhật Ánh");
console.log(books); // Tất cả sách của Nguyễn Nhật Ánh
```

#### 4. `getBookStats(id)`
Lấy thống kê của sách (số sách cùng thể loại, cùng tác giả, giá trung bình, xếp hạng giá).

```javascript
const stats = await getBookStats(2);
console.log(stats);
// {
//   bookId: "2",
//   totalBooksInCategory: 5,
//   totalBooksByAuthor: 1,
//   averagePriceInCategory: 82200,
//   priceRank: "average" // "cheap", "average", "expensive"
// }
```

### API Tiện ích

#### 5. `validateBookData(bookData)`
Kiểm tra tính hợp lệ của dữ liệu sách.

```javascript
const validation = validateBookData({
    title: "Test",
    author: "Author",
    price: 100000,
    category: "Test",
    description: "Description"
});

if (!validation.isValid) {
    console.log(validation.errors);
}
```

#### 6. `calculateAveragePrice(books)`
Tính giá trung bình của danh sách sách.

```javascript
const books = await getAllBooks();
const avg = calculateAveragePrice(books);
console.log(`Average: ${avg} đ`);
```

#### 7. `calculatePriceRank(book, categoryBooks)`
Xác định thứ hạng giá của sách trong thể loại.

```javascript
const rank = calculatePriceRank(book, categoryBooks);
// Returns: "cheap" | "average" | "expensive"
```

#### 8. `patchBook(id, partialData)`
Cập nhật một phần thông tin sách (không cần gửi toàn bộ object).

```javascript
// Chỉ cập nhật giá
await patchBook(2, { price: 95000 });

// Cập nhật nhiều trường
await patchBook(2, { 
    price: 95000,
    description: "Mô tả mới"
});
```

---

## 📖 Trang Book Detail

### Tính năng

- ✅ Hiển thị đầy đủ thông tin sách
- ✅ Hình ảnh với hover effect zoom
- ✅ Gradient background đẹp mắt
- ✅ Responsive design
- ✅ Loading state
- ✅ Error handling
- ✅ Animation fade-in
- ✅ Nút action (Thêm giỏ hàng, Chỉnh sửa, Chia sẻ)

### Cách sử dụng

```html
<!-- Link từ trang khác -->
<a href="book_detail.html?id=2">Xem chi tiết</a>

<!-- Hoặc mở trực tiếp -->
http://localhost/pages/book_detail.html?id=2
```

### Code Example

```javascript
// Trong book_detail.html
async function loadBookDetail() {
    const bookId = getBookIdFromURL();
    
    try {
        const book = await getBookById(bookId);
        
        // Hiển thị thông tin
        document.getElementById('bookTitle').textContent = book.title;
        document.getElementById('bookAuthor').textContent = book.author;
        // ... etc
        
    } catch (error) {
        showErrorPage();
    }
}
```

---

## 🧪 Test API

### Sử dụng API Test Page

1. Mở `pages/api_test.html`
2. Click vào các nút để test API
3. Xem kết quả trong console box
4. Kết quả màu xanh = success, màu đỏ = error

### Test Categories

1. **API Cơ bản**
   - Get All Books
   - Get Book By ID
   - Add New Book
   - Search Books

2. **API Chi Tiết Sách**
   - Get Book With Related
   - Get Books By Category
   - Get Books By Author
   - Get Book Stats

3. **API Tiện ích**
   - Validate Book Data
   - Calculate Average Price
   - Calculate Price Rank

4. **Sử dụng nâng cao**
   - PATCH Book
   - Error Handling
   - Complete Workflow

---

## 💡 Ví dụ sử dụng thực tế

### Ví dụ 1: Load trang Book Detail với sách liên quan

```javascript
async function loadBookDetailPage() {
    const bookId = 2;
    
    // Lấy sách + sách liên quan
    const data = await getBookWithRelated(bookId, 4);
    
    // Hiển thị sách chính
    displayMainBook(data.book);
    
    // Hiển thị sách liên quan
    displayRelatedBooks(data.relatedBooks);
    
    // Lấy thống kê
    const stats = await getBookStats(bookId);
    displayStats(stats);
}
```

### Ví dụ 2: Thêm sách mới với validation

```javascript
async function addNewBook(formData) {
    // Validate trước
    const validation = validateBookData(formData);
    
    if (!validation.isValid) {
        alert('Lỗi: ' + validation.errors.join(', '));
        return;
    }
    
    // Thêm sách
    try {
        const newBook = await addBook(formData);
        alert('Thêm sách thành công! ID: ' + newBook.id);
        window.location.href = `book_detail.html?id=${newBook.id}`;
    } catch (error) {
        alert('Lỗi: ' + error.message);
    }
}
```

### Ví dụ 3: Hiển thị giá với xếp hạng

```javascript
async function displayBookPrice(bookId) {
    const book = await getBookById(bookId);
    const categoryBooks = await getBooksByCategory(book.category);
    const rank = calculatePriceRank(book, categoryBooks);
    const avg = calculateAveragePrice(categoryBooks);
    
    let priceHTML = `
        <div class="price">
            <h3>${book.price.toLocaleString('vi-VN')} đ</h3>
            <p>Giá trung bình thể loại: ${avg.toLocaleString('vi-VN')} đ</p>
    `;
    
    if (rank === 'cheap') {
        priceHTML += `<span class="badge bg-success">Giá tốt!</span>`;
    } else if (rank === 'expensive') {
        priceHTML += `<span class="badge bg-warning">Giá cao</span>`;
    }
    
    priceHTML += `</div>`;
    
    return priceHTML;
}
```

---

## 🔧 API Endpoints (JSON Server)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/books` | Lấy tất cả sách |
| GET    | `/books/:id` | Lấy chi tiết 1 sách |
| POST   | `/books` | Thêm sách mới |
| PUT    | `/books/:id` | Cập nhật toàn bộ sách |
| PATCH  | `/books/:id` | Cập nhật 1 phần sách |
| DELETE | `/books/:id` | Xóa sách |
| GET    | `/books?q=keyword` | Tìm kiếm sách |
| GET    | `/books?category=X` | Lọc theo thể loại |
| GET    | `/books?author=X` | Lọc theo tác giả |

---

## 📊 Database Schema

```json
{
  "id": "string",
  "title": "string",
  "author": "string", 
  "description": "string",
  "price": number,
  "image": "string (URL)",
  "category": "string"
}
```

### Ví dụ Book Object

```json
{
  "id": "2",
  "title": "Đắc Nhân Tâm",
  "author": "Dale Carnegie",
  "description": "Nghệ thuật thu phục lòng người.",
  "price": 86000,
  "image": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
  "category": "Kỹ năng sống"
}
```

---

## ⚠️ Error Handling

Tất cả API functions đều throw error khi có lỗi. Luôn sử dụng try-catch:

```javascript
try {
    const book = await getBookById(999);
} catch (error) {
    console.error('Error:', error);
    // Hiển thị thông báo lỗi cho user
    showErrorMessage('Không thể tải sách. Vui lòng thử lại!');
}
```

---

## 📝 Checklist hoàn thành

- [x] Trang Book Detail với thiết kế đẹp
- [x] API `getBookById()` đã có sẵn
- [x] API `getBookWithRelated()` - Lấy sách + sách liên quan
- [x] API `getBooksByCategory()` - Lọc theo thể loại
- [x] API `getBooksByAuthor()` - Lọc theo tác giả
- [x] API `getBookStats()` - Thống kê sách
- [x] API `validateBookData()` - Validate dữ liệu
- [x] API `patchBook()` - Cập nhật partial
- [x] Utility functions (calculateAverage, priceRank, etc)
- [x] Trang API Test interactive
- [x] Documentation đầy đủ
- [x] README hướng dẫn

---

## 🎨 Design Features

Trang Book Detail có:
- ✨ Gradient background (#667eea → #764ba2)
- 💫 Fade-in animation
- 🖼️ Image zoom on hover
- 📱 Responsive design
- 🎯 Glass-morphism effects
- 🌈 Colorful gradient buttons
- 📊 Info cards với hover effects
- 🔙 Back button với animation

---

## 🚩 Lưu ý

1. **Port mặc định**: JSON Server chạy ở port 3000
2. **CORS**: JSON Server tự động enable CORS
3. **Data persistence**: Tất cả thay đổi lưu vào `db.json`
4. **IDs**: JSON Server tự động tạo ID khi POST
5. **Validation**: Chỉ validate client-side, server không validate

---

## 📞 Support

Nếu gặp vấn đề:

1. Kiểm tra JSON Server đang chạy
2. Mở Console để xem error
3. Kiểm tra Network tab trong DevTools
4. Xem API Documentation chi tiết

---

## 📚 Tài liệu tham khảo

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Tài liệu API đầy đủ
- [JSON Server Docs](https://github.com/typicode/json-server) - Tài liệu JSON Server

---

**Feature Developer:** Thành Nam  
**Branch:** `feature/nam/book-detail`  
**Date:** 2026-02-06  
**Version:** 1.0.0
