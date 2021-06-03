// 1. bikin object awal
let hp = {
	name : 'Hacktiv Pro 99',
	price : '600',
	stock : 40,
}

let namaHp = document.getElementById('hpName');
let hargaHp = document.getElementById('harga');
let stockHp = document.getElementById('stock');
namaHp.innerHTML = hp.name;
hargaHp.innerHTML = hp.price;
stockHp.innerHTML = hp.stock;
// console.log(object)
let objCustomer = {}
let btnOrder = document.getElementById('orderNow');
btnOrder.addEventListener('click',() =>{
    let namaCustomer = document.getElementById('nama');
    let emailCustomer = document.getElementById('email');
    let noHpCustomer = document.getElementById('noHp');
    let jumlahDiBeli = document.getElementById('jumlah')
    console.log('Helloooo');
    console.log(namaCustomer.value,emailCustomer.value,noHpCustomer.value,jumlahDiBeli.value,'-----');
})