window.addEventListener('load', function (e) {
    const card = document.querySelector('#card');
    const prices = card.querySelectorAll('.price')// array
    const counts = card.querySelectorAll('.count') // array
    const countPrices = card.querySelectorAll('.countPrice') // element 
    const total = card.querySelector('.total')

    countPrices.forEach((item, index) => {
        let currency = prices[index].innerHTML * counts[index].innerHTML
        item.innerHTML = toCurrency(currency)
    })

    total.innerHTML = toCurrency(total.innerHTML)

    function toCurrency(val) {
        return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(val)
    }
});