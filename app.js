/*==========================================================
===================EVENT LISTENERS============================
============================================================*/


document.getElementById('send').addEventListener("click",addBirthday);

document.getElementById('table-output').addEventListener('click',removeBirthday);











/*========================================================================================CLASSES=========================================
==================================================*/

/*=======================CREATE BDAY OBJECT ==================*/

class Bday {
  constructor(name,birthday,address){
    this.name = name;
    this.birthday = birthday; 
    this.address = address;
  }
  
}

/*=======================ADD TO UI ====================*/
class UI {
  addToUI (person) {
    const table = document.getElementById("table-output");
    const tr = document.createElement('tr');
    table.appendChild(tr);
    tr.innerHTML = `<td>${person.name}</td>
                      <td>${person.birthday}</td>
                      <td>${person.address}</td>
                      <td><a href="#"  class="delete">X</a></td>`
   }

  
   message(cls,mes) {
     const div = document.createElement('div');
     div.className = cls;
     const messageAlert = document.createTextNode(mes);
     div.appendChild(messageAlert);
     const body = document.querySelector('body');
     const container = document.querySelector('.container');
     body.insertBefore(div,container);
     setTimeout(function () {
       div.remove();
     },2000);

   }
   
  
   clearInputs () {
    const inputs = document.querySelectorAll("#form-input input[type=text]")
    inputs.forEach(input=> {input.value=''});
   }
   
  
}
/* ==============================================
  ==================LOCAL STORAGE ================
  ==================================================*/

class Store {

  static getStorage () {
   
    let storageValues =  JSON.parse(localStorage.getItem("Birthdays"));
   
    return storageValues;
  }
  static addToStorage (bday) {
      let personBday;
      if(localStorage.getItem("Birthdays")===null){
         personBday = [];
      }else {
        personBday = JSON.parse(localStorage.getItem("Birthdays"));
      }
      personBday.push(bday);
      localStorage.setItem("Birthdays",JSON.stringify(personBday));

  }
  static removeFromStorage (target) {
      let localStorageItems = this.getStorage();
      localStorageItems.forEach((item,index)=>{
        if(item.birthday === target) {
          localStorageItems.splice(index,1);
        }
      })
      localStorage.setItem("Birthdays",JSON.stringify(localStorageItems));
  }
  static displayLocalStorageBirthdays () {
    const ui =  new UI();
    let localStorageBirthdays = JSON.parse(localStorage.getItem("Birthdays"));
    localStorageBirthdays.forEach(birthday=>{
      ui.addToUI(birthday);
    })
  }
}
document.addEventListener("DOMContentLoaded",Store.displayLocalStorageBirthdays);


//function add the birthday to the DOM

function addBirthday (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const birthday = document.getElementById("bday").value;
    const address = document.getElementById("address").value;

    const personBday = new Bday(name,birthday,address);
    // instaniate UI class
    const ui = new UI();
    //validate all fields are filled out before adding

    if(name === ""|| birthday === "" || address=== ""){
      ui.message("alert alert-danger","Complete All Fields")
    }else {
      // add to DOM
      ui.addToUI(personBday);
      Store.addToStorage(personBday);
      ui.message("alert alert-success","Birthday Added");
      //clear inputs
      ui.clearInputs();
    }

}


function removeBirthday (e) {
  if(e.target.classList.contains("delete")){
  
   Store.removeFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

   e.target.parentElement.parentElement.remove();
     
  
  }
}




