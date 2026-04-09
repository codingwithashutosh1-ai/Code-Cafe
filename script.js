// ======================
// CART LOGIC
// ======================
let cart = {};
let total = 0;

function addToCart(item, price){
    if(cart[item]){
        cart[item].quantity++;
    } else {
        cart[item] = { price: price, quantity: 1 };
    }
    updateCart();
}

function increaseQuantity(item){
    if(cart[item]){
        cart[item].quantity++;
        updateCart();
    }
}

function decreaseQuantity(item){
    if(cart[item]){
        cart[item].quantity--;
        if(cart[item].quantity <= 0) delete cart[item];
        updateCart();
    }
}

function updateCart(){
    const cartDiv = document.getElementById("cartItems");
    cartDiv.innerHTML = "";
    total = 0;
    for(let item in cart){
        let itemTotal = cart[item].price * cart[item].quantity;
        total += itemTotal;
        cartDiv.innerHTML += `
            <div>
                ${item} 
                <button onclick="decreaseQuantity('${item}')">-</button>
                ${cart[item].quantity}
                <button onclick="increaseQuantity('${item}')">+</button>
                = ₹${itemTotal}
            </div>
        `;
    }
    document.getElementById("total").innerText = total;
}

// ======================
// THEME SWITCHING
// ======================
const themeSelector = document.getElementById("themeSelector");

function applyTheme(value){
    document.body.classList.remove("light-theme","dark-theme","blue-theme","blackhole-theme","cloud-theme");
    document.getElementById("bg-layer").style.display = "block"; // show bg layer always
    switch(value){
        case "light": document.body.classList.add("light-theme"); break;
        case "dark": document.body.classList.add("dark-theme"); break;
        case "blue": document.body.classList.add("blue-theme"); break;
        case "cloud": document.body.classList.add("cloud-theme"); break;
        case "blackhole": document.body.classList.add("blackhole-theme"); break;
        default: document.body.classList.add("blackhole-theme");
    }
}

// theme selector event
themeSelector.addEventListener("change",(e)=>{ applyTheme(e.target.value); });

// default theme on load
window.addEventListener("DOMContentLoaded",()=>{
    const defaultTheme = themeSelector.value || "blackhole";
    applyTheme(defaultTheme);
});

// ======================
// CLOUDS DYNAMIC GENERATION
// ======================
const cloudContainer = document.getElementById("cloudContainer");

function createCloud(size){
    const cloud = document.createElement("div");
    cloud.classList.add("cloud", size);
    cloud.style.top = Math.random()*100 + "px";
    cloud.style.left = Math.random()*window.innerWidth + "px";
    cloudContainer.appendChild(cloud);
}

// generate multiple clouds
for(let i=0; i<6; i++){
    createCloud(i%2===0?"small":"medium");
}