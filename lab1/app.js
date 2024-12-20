function openModal(shirt) {
    const modal = document.getElementById("quickViewModal");
    const defaultColor = shirt.colors && Object.keys(shirt.colors).length > 0;

    document.getElementById("modalImageFront").src = defaultColor
        ? shirt.colors[Object.keys(shirt.colors)[0]].front
        : shirt.default.front;

    document.getElementById("modalImageBack").src = defaultColor
        ? shirt.colors[Object.keys(shirt.colors)[0]].back
        : shirt.default.back;

    document.getElementById("modalName").innerText = shirt.name;
    document.getElementById("modalDescription").innerText = shirt.description;
    document.getElementById("modalPrice").innerText = shirt.price;

    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("quickViewModal");
    modal.style.display = "none";
}

function renderShirts() {
    // Находим контейнер для размещения списка футболок
    const container = document.getElementById('products');

    // Проверяем, является ли массив shirts массивом и содержит ли он элементы
    if (!Array.isArray(shirts) || shirts.length === 0) {
        // Если массив пуст или недопустим, выводим сообщение "No shirts available"
        container.innerHTML = '<p>No shirts available</p>';
        return;
    }

    // Итерируемся по массиву shirts и создаем карточки для каждой футболки
    shirts.forEach(shirt => {
        // Создаем элемент div для одной футболки
        const product = document.createElement('div');
        product.className = 'product'; // Устанавливаем класс для стилей

        // Определяем изображение по умолчанию: если есть цвета, берем первый доступный цвет, иначе - изображение по умолчанию
        const defaultColor = shirt.colors && Object.keys(shirt.colors)[0];
        const defaultImage = (shirt.colors && shirt.colors[defaultColor])
            ? shirt.colors[defaultColor].front // Изображение передней стороны первого доступного цвета
            : shirt.default.front;            // Изображение по умолчанию

        // Формируем HTML-содержимое карточки футболки
        const htmlContent = `
            <img src="${defaultImage}" alt="${shirt.name}"> <!-- Изображение футболки -->
            <h2>${shirt.name}</h2> <!-- Название футболки -->
            <p>${shirt.price}</p> <!-- Цена футболки -->
            <button onclick="openModal(${JSON.stringify(shirt).replace(/"/g, '&quot;')})">Quick View</button> <!-- Кнопка "Quick View" -->
        `;

        // Устанавливаем HTML-контент для элемента product
        product.innerHTML = htmlContent;

        // Добавляем созданный элемент product в контейнер
        container.appendChild(product);
    });
}


window.onload = renderShirts;