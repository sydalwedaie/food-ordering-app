import { menuArray } from "/data.js"

const menuEl = document.getElementById("menu")
const orderDetailsEl = document.getElementById("order-details")
const formEl = document.getElementById("form")

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

document.addEventListener("click", (e) => {
	e.target.dataset.id && addToCart(e.target.dataset.id)
	e.target.dataset.remove && removeFromCart(e.target.dataset.remove)
	e.target.id === "complete-order-btn" && handleCompleteOrderBtn()
	e.target.id === "cancel-btn" && handleCancelBtn()
})

formEl.addEventListener("submit", (e) => {
	e.preventDefault()
	localStorage.clear()
	document.getElementById("payment-modal").classList.add("hidden")
	const customerName = document.getElementById("customer-name").value
	orderDetailsEl.innerHTML = `
        <p class="order-complete-msg">Thanks, ${customerName}! Your order is on it's way</p>
    `
})

function menuFeed() {
	let feedHtml = ""
	menuArray.forEach((menuItem) => {
		feedHtml += `
        <section class="menu-item">
            <div class="item-image">${menuItem.emoji}</div>
            <div class="item-text">
                <h3 class="item-name">${menuItem.name}<h3>
                <p class="item-ingredients">${menuItem.ingredients}</p>
                <p class="item-price">$${menuItem.price}</p>
            </div>
            <div class="add-btn" data-id="${menuItem.id}">+</div>
        </section>
        `
	})
	return feedHtml
}

function orderDetailsFeed() {
	let cartList = ""
	let totalPrice = 0

	if (cartItems.length === 0) return ""
	cartItems.forEach((cartItem) => {
		totalPrice += cartItem.price
		cartList += `
        <li class="cart-item">
            <span class="cart-item--title">${cartItem.name}</span>
            <span class="cart-item--remove-btn" data-remove="${cartItem.id}">remove</span>
            <span class="cart-item--price">$${cartItem.price}</span>
        </li>
        `
	})

	return `
        <h2 class="cart--title">Your Order</h2>
        <ul class"cart-items">
            ${cartList}
        </ul>
        <hr>
        <p class="cart--total">
            <span class="cart-item--title">Total Price:</span>
            <span class="cart-item--price">$${totalPrice}</span>
        </p>
        <button class="button complete-order-btn" id="complete-order-btn">Complete Order</button>
    `
}

function addToCart(itemId) {
	const targetItem = menuArray.filter((item) => {
		return item.id == itemId
	})[0]
	cartItems.push(targetItem)
	localStorage.setItem("cartItems", JSON.stringify(cartItems))
	render()
}

function removeFromCart(itemId) {
	const targetItemIndex = cartItems.findIndex((item) => {
		return item.id === itemId
	})
	cartItems.splice(targetItemIndex, 1)
	render()
}

function handleCompleteOrderBtn() {
	document.getElementById("payment-modal").classList.remove("hidden")
}

function handleCancelBtn() {
	document.getElementById("payment-modal").classList.add("hidden")
}

function render() {
	menuEl.innerHTML = menuFeed()
	orderDetailsEl.innerHTML = orderDetailsFeed()
}

render()
