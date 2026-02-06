function SearchBook(event) {
    event.preventDefault();

    const keyword = document.getElementById("keyword").value.trim();
    const resultDiv = document.getElementById("searchResult");

    if (keyword === "") {
        alert("Vui lòng nhập từ khóa tìm kiếm");
        return;
    }

    fetch(`http://localhost:3000/books?q=${keyword}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Tìm kiếm thất bại");
            }
            return res.json();
        })
        .then(data => {
            resultDiv.innerHTML = "";

            if (data.length === 0) {
                resultDiv.innerHTML = "<p>Không tìm thấy sách</p>";
                return;
            }

            data.forEach(book => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <h4>${book.title}</h4>
                    <p>Tác giả: ${book.author}</p>
                    <p>Giá: ${book.price}</p>
                    <hr/>
                `;
                resultDiv.appendChild(div);
            });
        })
        .catch(err => {
            console.error(err);
            alert("Có lỗi xảy ra khi tìm kiếm");
        });
}
