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

//check if localStorage.getItem('stock') is not null
if(Number(window.localStorage.getItem('stock')) >= 1){
  stockHp.innerHTML = Number(window.localStorage.getItem('stock'));
}

//function Delivery
function hitungDelivery(min, max) {
    return Math.random() * (max - min) + min;
}


// console.log(object)
let objCustomer = {}
let btnOrder = document.getElementById('orderNow');

// variable customer-details
let namaCustDetails = document.getElementById('namaCust')
let emailCustDetails = document.getElementById('emailCust')
let noHpCustDetails = document.getElementById('noHpCust')
let jumlahCustDetails = document.getElementById('jumlahItem')
let totalCostDetails = document.getElementById('totalHarga')
let totalDeliveryDetails = document.getElementById('hitung')
let watchers = document.getElementById('jumlahOrang')

watchers.innerHTML = Math.floor(hitungDelivery(20, 60))

let divDetailsPurchased = document.getElementById('details-purchased')
btnOrder.addEventListener('click',(event) =>{
    // prevent the submit button to send.
    event.preventDefault();
    let countDelivery = hitungDelivery(5,10)
    let nama = document.getElementById('nama').value;
    let email = document.getElementById('email').value;
    let noHp = document.getElementById('noHp').value;
    let jumlahDiBeli = document.getElementById('jumlah').value;
    const totalCost = jumlahDiBeli * hp.price;
    console.log('ini total cost',totalCost)
    // create customer  object
    objCustomer = {
        nama,
        email,
        noHp,
        jumlahDiBeli,
        totalCost,
    }

    //reduce the stocks and update the html value
    hp.stock -= objCustomer.jumlahDiBeli
    stockHp.innerHTML = hp.stock
    let diskon = objCustomer.totalCost - (objCustomer.totalCost*0.25)

    
    //error handling 
    // console.log("test",objCustomer.nama.length);
    let namaIsRight = true
    if(objCustomer.nama.length < 2 || objCustomer.nama > 20){
      namaIsRight = false
      alert("Nama harus lebih dari 2 huruf dan kurang dari 20 huruf")
    } 

    let foundSymbol = false
    for (let i = 0; i < objCustomer.email.length; i++) {
      // console.log();
      if (objCustomer.email[i] === '@' ) {
        foundSymbol = true
        break
      }
    }

    if (!foundSymbol) {
      alert("Masukkan nama email anda dengan benar")
    } else if(objCustomer.email.length<=3){
      alert("Nama email minimal adalah 4 huruf")
    }

    if (namaIsRight === true && foundSymbol === true) {
      //set local storages
      window.localStorage.setItem('stock',hp.stock);
      console.log('localStorage stock',window.localStorage.getItem('stock'))
      // update div customer-details
      namaCustDetails.innerHTML = objCustomer.nama
      emailCustDetails.innerHTML = objCustomer.email
      noHpCustDetails.innerHTML = objCustomer.noHp
      jumlahCustDetails.innerHTML = objCustomer.jumlahDiBeli
      if (jumlahCustDetails.innerHTML >3){
        totalCostDetails.innerHTML = objCustomer.totalCost - (objCustomer.totalCost*0.25)
      }else{
        totalCostDetails.innerHTML = objCustomer.totalCost
      }
      totalDeliveryDetails.innerHTML = `*Pengiriman akan memakan waktu sekitar ${Math.ceil(countDelivery)} hari
                                       <br> ID Pembelian kamu adalah: ${Math. floor(Date. now() / 1000)} `
      //show div detail purchased
      divDetailsPurchased.style.display = 'flex'
    } 
})

// function onChange
let elementJumlah = document.getElementById('jumlah')
console.log(objCustomer);

elementJumlah.addEventListener('mouseout', () => {
    // console.log(parseInt(elementJumlah.value,10), typeof parseInt(elementJumlah.value,10));
    if(parseInt(elementJumlah.value,10) < 1){
        alert('Jumlah yang ingin di order harus lebih dari 0')
    }
})


//accordion function forvar 
const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 

