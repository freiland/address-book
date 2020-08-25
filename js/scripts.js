
// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
  this.address = address
  
  
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address () {
  this.work = [];
  this.personal = [];
}

Address.prototype.addWork = function(workArr) {
  for (work of workArr) {
    this.work.push(work);
  }
}

Address.prototype.addPersonal = function(personalArr) {
  for (elem of personalArr) {
    this.personal.push(elem);
  }
}

// User Interface Logic ---------

let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  
  if (contact.address.work[0]) {
    $(".work").html(contact.address.work);
  } else {
    $("#work").remove();
  };

  if (contact.address.personal[0]) {
    $(".personal").html(contact.address.personal);
  } else {
    $("#personal").remove();
  };
  
  
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}



function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedWork = $("input#work").val().split(",");
    const inputtedPersonal = $("input#personal").val().split(",");
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#work").val("");
    $("input#personal").val("");
    
    let newAddress = new Address ();

    newAddress.addWork(inputtedWork);

    newAddress.addPersonal(inputtedPersonal);

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress);
    
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})