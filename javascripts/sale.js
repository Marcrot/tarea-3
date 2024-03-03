const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
const products = {
    "productos": [
        {
            "id": 1,
            "name": "オリジナルブレンド200g",
            "price": 500
        },
        {
            "id": 2,
            "name": "オリジナルブレンド500g",
            "price": 900
        },
        {
            "id": 3,
            "name": "スペシャルブレンド200g",
            "price": 700
        },
        {
            "id": 4,
            "name": "スペシャルブレンド500g",
            "price": 1200
        }
    ]
}
let purchases = [];

function calc() {
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum);
    let string = "";
    for (let i = 0; i < purchases.length; i++) {
        string += `${purchases[i].name} ${purchases[i].price}円が${purchases[i].number}点\n`;
    }
    window.alert(`${string} \n 小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
    purchases = [];
    priceElement.value= "";
    numberElement.value = "";
  }
function calcPostageFromPurchase(sum) {
    if (sum == 0 || sum >= 3000) {
        return 0;
    } else if (sum < 2000) {
        return 500;
    } else {
        return 250;
    }
}
function subtotal() {
    let sum = 0;
    for (let i = 0; i < purchases.length; i++) {
        sum += purchases[i].price * purchases[i].number;
    }
    return sum;
}
function display() {
    let string = "";
    for (let i = 0; i < purchases.length; i++) {
        string += `${purchases[i].name} ${purchases[i].price}円が${purchases[i].number}点\n`;
    }
    return string;
}

function add() {
    //const price = priceElement.value;
    const id = priceElement.value;
    const price = products.productos.find(products=> products.id == id).price;
    const name = products.productos.find(products=> products.id == id).name;
    const number = numberElement.value;
    let purchase = {
        price: parseInt(price),
        number: parseInt(number),
        name: name
    };

    let newPurchase = true; //--1

    purchases.forEach((item) => {  //--2
        if (item.price === purchase.price) {
            newPurchase = false;
        }
    })

    if (purchases.length < 1 || newPurchase) { //--3
        purchases.push(purchase);
    } else {
        for (let i = 0; i < purchases.length; i++) {
            if (purchases[i].price === purchase.price) {
                purchases[i].number += purchase.number;
            }
        }
    }

    window.alert(`${display()}\n小計${subtotal()}円`);
    priceElement.value = "";
    numberElement.value = "";
}