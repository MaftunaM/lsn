window.addEventListener('load', function (e) {
    const cardItem = document.querySelector('#card');
    const prices = cardItem.querySelectorAll('.price')// array
    const counts = cardItem.querySelectorAll('.count') // array
    const countPrices = cardItem.querySelectorAll('.countPrice') // element 
    const total = cardItem.querySelector('.total')

    countPrices.forEach((item, index) => {
        let currency = prices[index].innerHTML * counts[index].innerHTML
        item.innerHTML = toCurrency(currency)
    })

    total.innerHTML = toCurrency(total.innerHTML)

    function toCurrency(val) {
        return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(val)
    }

    cardItem.addEventListener('click', (e) => {
        const contain = e.target.classList.contains('btn-remove')

        if (!contain) {
            return
        }

        e.preventDefault()

        const id = e.target.getAttribute('data-id')

        fetch(`/card/remove/${id}`, {
            method: 'delete'
        })
            .then((res) => res.json())
            .then((card) => {
                if (card.items.length > 0) {

                    const html = card.items.map((item) => {
                        return `
                        <tr>
                                <td>
                                    ${item.name}
                                </td>
                                <td class="count">
                                    ${item.count}
                                </td>
                                <td class="price">
                                    ${toCurrency(item.price)}
                                </td>
                                <td>
                                    <span class="countPrice">${toCurrency(item.price * item.count)}</span>
                                </td>
                                <td>
                                    <a href="/card/remove/${item.id}" class="waves-effect waves-light btn btn-remove"
                                        style="background: #e53935" data-id="${item.id}">Delete</a>
                                </td>
                        </tr>
                        `
                    }).join('')
                    total.innerHTML = toCurrency(card.price)
                    cardItem.querySelector('#body').innerHTML = html
                } else {
                    // demak korzinada xech nima yo'q pustoy
                    cardItem.innerHTML = '<h2>Cart is empty</h2>'
                }
            })
            .catch(e => console.error(e))
    })
});