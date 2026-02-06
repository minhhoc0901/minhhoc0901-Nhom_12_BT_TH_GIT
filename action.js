function AddBook(event) {
    event.preventDefault();
    const form = document.getElementById("addBookForm");
    const book = {
        title: form.title.value,
        author: form.author.value,
        description: form.description.value,
        price: Number(form.price.value),
        category: form.category.value,
        image: "" 
    };
    if (form.image.files.length > 0) {
        book.image = form.image.files[0].name;
    }

    fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Thêm sách thất bại");
        }
        return res.json();
    })
    .then(data => {
        console.log("dahsjdhasjkdhkjasd", data);
        alert("Thêm sách thành công!");
        form.reset();
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("addBookModal")
        );
        modal.hide();
        console.log("Book mới:", data);
    })
    .catch(err => {
        alert("Có lỗi xảy ra");
        console.error(err);
    });
}