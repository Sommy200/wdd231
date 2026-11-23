import {temples} from "../data/temples.js"

console.log(temples)


import {url} from "../data/temples.js "

//console.log(url)

const showHere = document.querySelector("#showHere")
const mydialog = document.querySelector("#mydialog")
const mytitle = document.querySelector("#mydialog h2")
const myinfo = document.querySelector("#mydialog p")
const myclose = document.querySelector("#mydialog button")
const dialogBoxText = document.querySelector("#mydialog div");

myclose.addEventListener("click", () => mydialog.close())

function displayItems(data) {
    console.log(data)

    data.forEach(x => {
        console.log(x)
        const photo = document.createElement("img")
        photo.src = `${url}${x.path}`
        photo.alt = x.name

        photo.addEventListener("click", () => showStuff(x));
        
        showHere.appendChild(photo)
        
    });
}

displayItems(temples)

function showStuff(x) {
    mytitle.innerHTML = x.name
    dialogBoxText.innerHTML = "Dedicated April 1187 by Daniel H wells"
    mydialog.showModal();
}