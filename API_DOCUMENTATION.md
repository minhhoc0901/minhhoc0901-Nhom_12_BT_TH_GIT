# 📚 API Documentation - Hệ Thống Quản Lý Sách

## 🌐 Base URL
```
http://localhost:3000
```

## 📖 Mục lục
1. [API Cơ bản](#api-cơ-bản)
2. [API Chi Tiết Sách](#api-chi-tiết-sách)
3. [API Tiện ích](#api-tiện-ích)
4. [Cách sử dụng](#cách-sử-dụng)

---

## API Cơ bản

### 1. Lấy danh sách tất cả sách
**Function:** `getAllBooks()`

**Endpoint:** `GET /books`

**Response:**
```json
[
  {
    "id": "2",
    "title": "Đắc Nhân Tâm",
    "author": "Dale Carnegie",
    "description": "Nghệ thuật thu phục lòng người.",
    "price": 86000,
    "image": "https://images.unsplash.com/...",
    "category": "Kỹ năng sống"
  },
  ...
]
```

**Ví dụ sử dụng:**
```javascript
const books = await getAllBooks();
console.log(books);
```

---

### 2. Lấy chi tiết sách theo ID
**Function:** `getBookById(id)`

**Endpoint:** `GET /books/:id`

**Parameters:**
- `id` (string|number) - ID của sách cần lấy

**Response:**
```json
{
  "id": "2",
  "title": "Đắc Nhân Tâm",
  "author": "Dale Carnegie",
  "description": "Nghệ thuật thu phục lòng người.",
  "price": 86000,
  "image": "https://images.unsplash.com/...",
  "category": "Kỹ năng sống"
}
```

**Ví dụ sử dụng:**
```javascript
const book = await getBookById(2);
console.log(book.title); // "Đắc Nhân Tâm"
```

---

### 3. Thêm sách mới
**Function:** `addBook(bookData)`

**Endpoint:** `POST /books`

**Parameters:**
- `bookData` (Object) - Dữ liệu sách mới

**Request Body:**
```json
{
  "title": "Tên sách",
  "author": "Tên tác giả",
  "description": "Mô tả sách",
  "price": 100000,
  "image": "https://example.com/image.jpg",
  "category": "Thể loại"
}
```

**Response:**
```json
{
  "id": "21",
  "title": "Tên sách",
  ...
}
```

**Ví dụ sử dụng:**
```javascript
const newBook = {
  title: "Sách Mới",
  author: "Tác Giả",
  description: "Mô tả chi tiết",
  price: 120000,
  image: "https://example.com/book.jpg",
  category: "Văn học"
};

const createdBook = await addBook(newBook);
console.log('Book created with ID:', createdBook.id);
```

---

### 4. Cập nhật thông tin sách (PUT)
**Function:** `updateBook(id, bookData)`

**Endpoint:** `PUT /books/:id`

**Parameters:**
- `id` (string|number) - ID của sách cần cập nhật
- `bookData` (Object) - Dữ liệu sách đầy đủ

**Ví dụ sử dụng:**
```javascript
const updatedData = {
  title: "Đắc Nhân Tâm - Phiên bản mới",
  author: "Dale Carnegie",
  description: "Mô tả mới",
  price: 95000,
  image: "https://example.com/new-image.jpg",
  category: "Kỹ năng sống"
};

const updatedBook = await updateBook(2, updatedData);
```

---

### 5. Cập nhật một phần thông tin sách (PATCH)
**Function:** `patchBook(id, partialData)`

**Endpoint:** `PATCH /books/:id`

**Parameters:**
- `id` (string|number) - ID của sách
- `partialData` (Object) - Chỉ các trường cần cập nhật

**Ví dụ sử dụng:**
```javascript
// Chỉ cập nhật giá
const updatedBook = await patchBook(2, { price: 90000 });

// Cập nhật giá và mô tả
const updatedBook2 = await patchBook(2, { 
  price: 90000,
  description: "Mô tả mới"
});
```

---

### 6. Xóa sách
**Function:** `deleteBook(id)`

**Endpoint:** `DELETE /books/:id`

**Parameters:**
- `id` (string|number) - ID của sách cần xóa

**Response:**
```json
{
  "success": true,
  "message": "Xóa sách thành công"
}
```

**Ví dụ sử dụng:**
```javascript
await deleteBook(2);
console.log('Book deleted successfully');
```

---

### 7. Tìm kiếm sách
**Function:** `searchBooks(keyword)`

**Endpoint:** `GET /books?q=keyword`

**Parameters:**
- `keyword` (string) - Từ khóa tìm kiếm

**Ví dụ sử dụng:**
```javascript
const results = await searchBooks("Đắc Nhân Tâm");
console.log(`Found ${results.length} books`);
```

---

## API Chi Tiết Sách

### 8. Lấy sách kèm sách liên quan
**Function:** `getBookWithRelated(id, limit)`

**Parameters:**
- `id` (string|number) - ID của sách
- `limit` (number) - Số lượng sách liên quan tối đa (mặc định: 4)

**Response:**
```json
{
  "book": {
    "id": "2",
    "title": "Đắc Nhân Tâm",
    ...
  },
  "relatedBooks": [
    {
      "id": "3",
      "title": "Tuổi Trẻ Đáng Giá Bao Nhiêu",
      ...
    },
    ...
  ],
  "totalRelated": 4
}
```

**Ví dụ sử dụng:**
```javascript
const data = await getBookWithRelated(2, 4);
console.log('Main book:', data.book.title);
console.log('Related books:', data.relatedBooks.length);
```

---

### 9. Lấy sách theo thể loại
**Function:** `getBooksByCategory(category, limit)`

**Parameters:**
- `category` (string) - Tên thể loại
- `limit` (number, optional) - Số lượng sách tối đa

**Endpoint:** `GET /books?category=CategoryName`

**Ví dụ sử dụng:**
```javascript
// Lấy tất cả sách "Kỹ năng sống"
const books = await getBooksByCategory("Kỹ năng sống");

// Lấy 5 sách "Văn học Việt Nam"
const limitedBooks = await getBooksByCategory("Văn học Việt Nam", 5);
```

---

### 10. Lấy sách theo tác giả
**Function:** `getBooksByAuthor(author, limit)`

**Parameters:**
- `author` (string) - Tên tác giả
- `limit` (number, optional) - Số lượng sách tối đa

**Endpoint:** `GET /books?author=AuthorName`

**Ví dụ sử dụng:**
```javascript
// Lấy tất cả sách của Nguyễn Nhật Ánh
const books = await getBooksByAuthor("Nguyễn Nhật Ánh");

// Lấy 3 sách của Dale Carnegie
const limitedBooks = await getBooksByAuthor("Dale Carnegie", 3);
```

---

### 11. Lấy thống kê sách
**Function:** `getBookStats(id)`

**Parameters:**
- `id` (string|number) - ID của sách

**Response:**
```json
{
  "bookId": "2",
  "totalBooksInCategory": 5,
  "totalBooksByAuthor": 1,
  "averagePriceInCategory": 82200,
  "priceRank": "average"
}
```

**Price Rank Values:**
- `cheap` - Giá thấp hơn 80% giá trung bình
- `average` - Giá trong khoảng 80%-120% giá trung bình
- `expensive` - Giá cao hơn 120% giá trung bình

**Ví dụ sử dụng:**
```javascript
const stats = await getBookStats(2);
console.log(`Total books in category: ${stats.totalBooksInCategory}`);
console.log(`Price rank: ${stats.priceRank}`);
```

---

## API Tiện ích

### 12. Validate dữ liệu sách
**Function:** `validateBookData(bookData)`

**Parameters:**
- `bookData` (Object) - Dữ liệu sách cần kiểm tra

**Response:**
```json
{
  "isValid": false,
  "errors": [
    "Tên sách không được để trống",
    "Giá sách phải lớn hơn 0"
  ]
}
```

**Ví dụ sử dụng:**
```javascript
const bookData = {
  title: "",
  author: "Test Author",
  price: -1000,
  category: "Test",
  description: "Test description"
};

const validation = validateBookData(bookData);
if (!validation.isValid) {
  console.log('Errors:', validation.errors);
  // Errors: ["Tên sách không được để trống", "Giá sách phải lớn hơn 0"]
}
```

**Các trường được kiểm tra:**
- ✅ `title` - Không được rỗng
- ✅ `author` - Không được rỗng
- ✅ `price` - Phải lớn hơn 0
- ✅ `category` - Không được rỗng
- ✅ `description` - Không được rỗng
- ✅ `image` - URL hợp lệ (nếu có)

---

### 13. Tính giá trung bình
**Function:** `calculateAveragePrice(books)`

**Parameters:**
- `books` (Array) - Danh sách sách

**Returns:** `number` - Giá trung bình (làm tròn)

**Ví dụ sử dụng:**
```javascript
const books = await getAllBooks();
const avgPrice = calculateAveragePrice(books);
console.log(`Average price: ${avgPrice} đ`);
```

---

### 14. Xác định thứ hạng giá
**Function:** `calculatePriceRank(book, categoryBooks)`

**Parameters:**
- `book` (Object) - Sách cần xếp hạng
- `categoryBooks` (Array) - Danh sách sách cùng thể loại

**Returns:** `string` - 'cheap' | 'average' | 'expensive'

**Ví dụ sử dụng:**
```javascript
const book = await getBookById(2);
const categoryBooks = await getBooksByCategory(book.category);
const rank = calculatePriceRank(book, categoryBooks);
console.log(`Price rank: ${rank}`);
```

---

### 15. Kiểm tra URL hợp lệ
**Function:** `isValidURL(url)`

**Parameters:**
- `url` (string) - URL cần kiểm tra

**Returns:** `boolean`

**Ví dụ sử dụng:**
```javascript
const valid = isValidURL("https://example.com/image.jpg");
console.log(valid); // true

const invalid = isValidURL("not-a-url");
console.log(invalid); // false
```

---

## Cách sử dụng

### 1. Khởi động JSON Server

```bash
# Cài đặt dependencies (chỉ lần đầu)
npm install

# Chạy JSON Server
npx json-server db.json --port 3000
```

Server sẽ chạy tại: `http://localhost:3000`

---

### 2. Sử dụng trong HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Book App</title>
</head>
<body>
    <!-- Include action.js -->
    <script src="action.js"></script>
    
    <script>
        // Sử dụng các API functions
        async function init() {
            // Lấy tất cả sách
            const books = await getAllBooks();
            console.log(books);
            
            // Lấy chi tiết sách
            const book = await getBookById(2);
            console.log(book);
            
            // Tìm kiếm
            const results = await searchBooks("Harry Potter");
            console.log(results);
        }
        
        init();
    </script>
</body>
</html>
```

---

### 3. Error Handling

Tất cả các API functions đều throw error khi có lỗi. Nên sử dụng try-catch:

```javascript
async function loadBook() {
    try {
        const book = await getBookById(999);
        console.log(book);
    } catch (error) {
        console.error('Error:', error.message);
        // Hiển thị thông báo lỗi cho user
        alert('Không thể tải thông tin sách. Vui lòng thử lại!');
    }
}
```

---

### 4. Ví dụ thực tế: Trang Book Detail

```javascript
async function loadBookDetail() {
    const bookId = getBookIdFromURL(); // Lấy ID từ URL
    
    try {
        // Lấy sách kèm sách liên quan
        const data = await getBookWithRelated(bookId, 4);
        
        // Hiển thị thông tin sách chính
        displayBookInfo(data.book);
        
        // Hiển thị sách liên quan
        displayRelatedBooks(data.relatedBooks);
        
        // Lấy thống kê
        const stats = await getBookStats(bookId);
        displayStats(stats);
        
    } catch (error) {
        console.error('Error loading book:', error);
        showErrorPage();
    }
}
```

---

## 🔍 JSON Server Query Parameters

JSON Server hỗ trợ nhiều query parameters:

### Filter
```javascript
// Lọc theo category
GET /books?category=Kỹ năng sống

// Lọc theo author
GET /books?author=Nguyễn Nhật Ánh

// Lọc nhiều điều kiện
GET /books?category=Văn học Việt Nam&author=Nguyễn Nhật Ánh
```

### Full-text Search
```javascript
// Tìm kiếm toàn văn
GET /books?q=harry potter
```

### Pagination
```javascript
// Lấy 10 items, bỏ qua 20 items đầu
GET /books?_page=3&_limit=10
```

### Sort
```javascript
// Sắp xếp theo giá tăng dần
GET /books?_sort=price&_order=asc

// Sắp xếp theo giá giảm dần
GET /books?_sort=price&_order=desc
```

### Operators
```javascript
// Giá từ 50000 đến 100000
GET /books?price_gte=50000&price_lte=100000

// Tìm sách có title chứa "Harry"
GET /books?title_like=Harry
```

---

## 📊 Response Status Codes

- **200 OK** - Request thành công
- **201 Created** - Tạo resource mới thành công (POST)
- **404 Not Found** - Không tìm thấy resource
- **500 Internal Server Error** - Lỗi server

---

## 🛠️ Tips & Best Practices

1. **Luôn sử dụng try-catch** khi gọi API
2. **Validate dữ liệu** trước khi POST/PUT/PATCH
3. **Sử dụng loading state** khi đang fetch data
4. **Cache data** nếu có thể để giảm số lần gọi API
5. **Handle errors gracefully** với thông báo thân thiện cho user

---

## 📝 Notes

- API này sử dụng **JSON Server** - một REST API giả lập
- Tất cả thay đổi được lưu vào file `db.json`
- Server restart sẽ **không mất data** (data được persist trong db.json)
- Hỗ trợ đầy đủ CRUD operations

---

**Version:** 1.0.0  
**Last Updated:** 2026-02-06  
**Author:** Thành Nam - Book Detail Feature
