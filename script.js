const orderForm = document.querySelector('.order-form');

if (orderForm) {
    orderForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const inputs = orderForm.querySelectorAll('input');

        const name = inputs[0]?.value.trim() || '';
        const phone = inputs[1]?.value.trim() || '';
        const city = inputs[2]?.value.trim() || '';
        const settlement = inputs[3]?.value.trim() || '';
        const department = inputs[4]?.value.trim() || '';

        const select = orderForm.querySelector('select');
        const payment = select ? select.value : '';

        if (!name || !phone || !city || !settlement || !department || !payment) {
            alert('Будь ласка, заповніть усі поля 💚');
            return;
        }

        const titleElement = document.querySelector('.order h2');

        const productTitle = titleElement
            ? titleElement.textContent.replace('Замовити', '').trim()
            : 'Невідомий товар';

      const order = {
    customer: name,
    product: productTitle,
    phone: phone,
    city: city,
    settlement: settlement,
    department: department,
    address: city + ", " + settlement + ", " + department,
    payment: payment
};

        try {
            const response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });

            const result = await response.json();

            if (result.success) {
                alert('Замовлення успішно відправлено! 💚');
                orderForm.reset();
            } else {
                alert('Не вдалося відправити замовлення 😔');
            }

        } catch (error) {
            console.error(error);
            alert('Помилка зʼєднання із сервером 😔');
        }
    });
}