// 1. bikin object awal
let hp = {
	name : 'Hacktiv Pro 99',
	price : '600',
	stock : 41,
}
let listPreOrder = {
}
let counterPerson = 0;
let namaHp = document.getElementById('hpName');
let hargaHp = document.getElementById('harga');
let stockHp = document.getElementById('stock');
namaHp.innerHTML = hp.name;
hargaHp.innerHTML = hp.price;

//check if localStorage.getItem('stock') is not null
console.log('isi local storage', window.localStorage.getItem('stock'))
if(Number(window.localStorage.getItem('stock')) >= 1){
  console.log('if')
  stockHp.innerHTML = Number(window.localStorage.getItem('stock'));
}else{
  console.log('else')
  // hp.stock = 20;
  stockHp.innerHtml = hp.stock;
  document.getElementById('stock').innerHTML = "Stock habis gan!"
  console.log(hp.stock)
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
        id : 0
    }

    //reduce the stocks and update the html value
   
    stockHp.innerHTML = hp.stock
    let diskon = objCustomer.totalCost - (objCustomer.totalCost*0.25)

    
    //error handling check character nama
    // console.log("test",objCustomer.nama.length);
    let namaIsRight = true
    let flagAngka = false
    //check character length
    if(objCustomer.nama.length < 2 || objCustomer.nama.length > 20){
      namaIsRight = false
      alert("Nama harus lebih dari 2 huruf dan kurang dari 20 huruf")
    }
    // looping check jika ada angka di nama
    for(let i = 0; i <objCustomer.nama.length; i ++ ){
      if(objCustomer.nama.charCodeAt(i)>=48 && objCustomer.nama.charCodeAt(i)<=57){
        flagAngka = true
      }
    }
    if(flagAngka){
      alert("Nama tidak boleh berisi angka");
    }

    //handling nomorHp jika bukang angka,
    // 'asdasdsa'
    // 0819274319123
    console.log(objCustomer.noHp.length)
    let isValidHp = false;
    if(objCustomer.noHp.length >= 10){
      if(!isNaN(Number(objCustomer.noHp)) && (objCustomer.noHp.length >= 10 || objCustomer.noHp.length<=13)){
        console.log('input bener gan!')
        isValidHp = true;
      }else{
        alert('Nomor hp tidak boleh berisi character alphabet')
      }
    }else if(objCustomer.noHp.length<=9){
      alert('Nomor hp tidak boleh kurang dari 10')
    } 

    //handling email
    let isValidEmail = false;
    let counter = -1;
    for (let i = 0; i < objCustomer.email.length; i++) {
      // console.log();
      if(isValidEmail === false){
        counter++
      }
      if (objCustomer.email[i] === '@' ) {
        isValidEmail = true
        continue
      }
    }

    // handling jumlah stocks
    let isValidStock = false;
    console.log(objCustomer.jumlahDiBeli, 'ini jumlah yg ingin di beli', window.localStorage.getItem('stock'))
    if(objCustomer.jumlahDiBeli <= window.localStorage.getItem('stock')){
      isValidStock = true;
    }else{
      alert('Tidak boleh pre order lebih dari jumlah stock yg tersedia!')
    }


    // console.log(counter)
    if (!isValidEmail) {
      alert("Masukkan nama email anda dengan benar")
    }
    if(objCustomer.email.length<=3){
      alert("Nama email minimal adalah 4 huruf")
      isValidEmail = false;
    }
        //set local storages
    console.log(namaIsRight,isValidEmail,counter, isValidHp, isValidStock)
    if (namaIsRight && isValidEmail && counter >3 && isValidHp && isValidStock) {
      console.log(window.localStorage.getItem('stock'),'before')
      hp.stock -= objCustomer.jumlahDiBeli
      console.log(window.localStorage.getItem('stock'),'after')
      window.localStorage.setItem('stock',hp.stock ); 
      document.getElementById('stock').innerHTML = hp.stock

      // ketika berhasil
      console.log('isi local storage', window.localStorage.getItem('stock'))
      if(Number(window.localStorage.getItem('stock')) >= 1){
        console.log('if')
        stockHp.innerHTML = Number(window.localStorage.getItem('stock'));
      }else{
        console.log('else')
        // hp.stock = 20;
        stockHp.innerHtml = hp.stock;
        document.getElementById('stock').innerHTML = "Stock habis gan!"
        console.log(hp.stock)
      }
          
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
      objCustomer.id = Math. floor(Date. now() / 1000);
      divDetailsPurchased.style.display = 'flex'

      // masukan ke dalam ListPreOrder.
      if(listPreOrder[counterPerson] === undefined) {
        listPreOrder[counterPerson] = objCustomer.nama;
        counterPerson++;
        reRenderList(listPreOrder);
      }
      
    } 
})

const reRenderList = (listPreOrder) => {
  const getParent = document.getElementById('list-details')
  getParent.innerHTML = ''
  for(key in listPreOrder) {
   console.log(key,listPreOrder[key]);
   const index = String(key)
   const createP = document.createElement('p')
   createP.setAttribute("id", key);
   createP.innerHTML = `${listPreOrder[key]} <button id = 'remove' onclick= 'RemoveObj(this)'> remove </button>`
   getParent.appendChild(createP)
   //addEventListener
  }
  const button1 = document.getElementById('remove')
  button1.addEventListener("click",(index) => {
    console.log('di function clink button',this.index)
    
    // console.log(index,index.value, index.innerHTML)
  })
}

function RemoveObj (obj) {
  console.log('ini this',obj)
  console.log(obj.parentNode.id, ' ini id')
  delete listPreOrder[obj.parentNode.id]
  document.getElementById(obj.parentNode.id).remove()
}


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

