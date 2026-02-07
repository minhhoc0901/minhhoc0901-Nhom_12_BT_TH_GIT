# 📚 QUẢN LÝ SÁCH (BOOK MANAGEMENT PROJECT)

## 👥 THÀNH VIÊN & PHÂN CÔNG NHIỆM VỤ (TASK ASSIGNMENT)

Dưới đây là danh sách chức năng (Feature) được phân công. Các bạn vui lòng làm đúng yêu cầu của mình vào bảng dưới đây.

## 👥 DANH SÁCH THÀNH VIÊN & PHÂN CÔNG (TASK ASSIGNMENT)

| STT | Thành viên & GitHub | Chức năng (Feature) | Nhánh (Branch Name) | Mô tả chi tiết |
| :-- | :--- | :--- | :--- | :--- |
| **1** | **Minh Học** <br> (`@minhhoc0901`) | **TEAM LEADER** | `main` / `develop` | Khởi tạo dự án, Review Code, Merge PR, quản lý tiến độ. |
| **2** | **Toàn Bân** <br> (`@ToanBan`) | **Add Book** | `feature/ban/add-book` | Xây dựng Form thêm sách + Viết API thêm sách (Add Book). |
| **3** | **Mạnh Cường** <br> (`@ManhCuong304`) | **Edit Book** | `feature/cuong/edit-book` | Xây dựng Form sửa sách + Viết API sửa sách (Edit Book). |
| **4** | **Thành Nam** <br> (`@NamDanney`) | **Book Detail** | `feature/nam/book-detail` | Xây dựng trang chi tiết + Viết API hiển thị chi tiết sách. |
| **5** | **Nhữ Huy** <br> (`@Vanivietquat`) | **Search Book** | `feature/nhu-huy/search-book` | Xây dựng giao diện tìm kiếm + Viết API tìm kiếm sách. |
| **6** | **Minh Huy** <br> (`@caominhhuy204`) | **List & Delete** | `feature/minh-huy/list-delete` | Xây dựng hiển thị danh sách sách + Chức năng xóa sách (Delete). |
| **7** | **Anh Kiệt** <br> (`@KietAnh160704`) | **Sort Book** | `feature/kiet/sort-book` | Chức năng sắp xếp sách theo thứ tự Tăng dần & Giảm dần. |
---

## 📝 QUY ƯỚC COMMIT MESSAGE (CONVENTIONAL)

Để lịch sử code dễ đọc và dễ review, bắt buộc viết commit message theo cấu trúc:  
` <type>: <mô tả ngắn> `

| Type | Dùng khi nào | Ví dụ |
| :--- | :--- | :--- |
| **feat** | Thêm chức năng mới | `feat: add login feature` |
| **fix** | Sửa lỗi (bug) | `fix: fix login validation bug` |
| **refactor** | Tái cấu trúc code (không đổi chức năng) | `refactor: restructure auth module` |
| **docs** | Thêm / sửa tài liệu | `docs: update README` |
| **style** | Thay đổi giao diện / format code | `style: update UI layout` |
| **chore** | Công việc phụ trợ (config, tool...) | `chore: update gitignore` |
| **perf** | Cải thiện hiệu năng | `perf: optimize query performance` |
| **vendor** | Cập nhật thư viện / dependencies | `vendor: upgrade axios` |

---

## 🚀 QUY TRÌNH LÀM VIỆC (GIT WORKFLOW)

Để đảm bảo quy trình Git đúng yêu cầu bài tập, đề nghị các bạn làm đúng **từng bước** sau:

### 🟢 BƯỚC 1: Chuẩn bị code mới nhất
Trước khi bắt đầu code, luôn luôn lấy code mới nhất từ nhánh `develop` về máy:

```bash
# 1. Chuyển về nhánh develop
git checkout develop

# 2. Cập nhật code mới nhất từ server về
# Lệnh này tương đương với git fetch + git merge, giúp code về máy và gộp luôn vào branch hiện tại
git pull origin develop
```

### 🟠 BƯỚC 2: Tạo nhánh chức năng (Feature Branch)
Tuyệt đối **KHÔNG** code trực tiếp trên `main` hay `develop`. Hãy tạo nhánh riêng:

```bash
# Tạo nhánh mới và chuyển sang nhánh đó ngay lập tức
# Cấu trúc: feature/<tên-thành-viên>/<tên-chức-năng>
git checkout -b feature/ban/add-book
```
> *Ví dụ: Bạn Bân sẽ gõ: `git checkout -b feature/ban/add-book`*

### 🔵 BƯỚC 3: Code và Commit
Thực hiện code chức năng của bạn. Sau khi code xong 1 phần nhỏ, hãy commit ngay tuân thủ **Quy ước Commit** ở trên:

```bash
# 1. Kiểm tra các file đã thay đổi
git status

# 2. Thêm file vào danh sách chuẩn bị commit
git add . 

# 3. Lưu thay đổi với ghi chú rõ ràng (Dùng đúng Type: feat, fix, style...)
git commit -m "feat: Add Book - Tạo giao diện form thêm sách"
```

### 🟣 BƯỚC 4: Đẩy code lên Server (Push)
Khi đã hoàn thành task hoặc muốn lưu code lên Git:

```bash
# Đẩy nhánh của bạn lên kho chứa (origin)
git push origin feature/ban/add-book
```

### 🔴 BƯỚC 5: Tạo Pull Request (PR) -> Dành cho THÀNH VIÊN
Bước quan trọng để nộp bài:
1. Truy cập vào Repository trên GitHub/GitLab.
2. Bạn sẽ thấy thông báo *"Compare & pull request"* cho nhánh vừa push.
3. Bấm vào nút đó.
4. **QUAN TRỌNG:** Ở mục **"Base"**, hãy chọn là `develop` (KHÔNG CHỌN `main`).
   - Hướng đúng: `feature/ban/add-book` ➡️ `develop`.
5. Bấm **Create Pull Request**.
6. **XONG NHIỆM VỤ**. Hãy báo cho Nhóm trưởng để kiểm tra.

### ⚫ BƯỚC 6: Review và Merge (Gộp code) -> Dành cho NHÓM TRƯỞNG / REVIEWER
Sau khi thành viên báo đã tạo PR:
1. Vào tab **Pull Requests** trên Github.
2. Chọn PR cần check.
3. Vào tab **Files changed** để xem code thành viên viết có ổn không.
4. Nếu ổn: Bấm **Merg pull request** -> **Confirm merge**.
5. Nếu chưa ổn: Comment yêu cầu sửa lại.

---

## ⚠️ CÁC QUY TẮC BẤT DI BẤT DỊCH
1. **Không commit trực tiếp lên `main`**.
2. **Không merge thẳng từ `feature` vào `main`**.
3. **Mỗi thành viên chịu trách nhiệm code trên các file riêng biệt (được phân công)**, tránh sửa trùng file của người khác để hạn chế Conflict.
4. Nếu có conflict, hãy báo ngay cho nhóm trưởng để cùng giải quyết.