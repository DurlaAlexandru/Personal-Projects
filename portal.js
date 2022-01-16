const addTicket = document.forms['addTicket'];
var tickets = [];

addTicket.addEventListener('submit', function(e){
  e.preventDefault();
  var inputValueDomain = document.getElementById("valueDomain").value
  var inputValueProblem = document.getElementById("valueProblem").value
  var inputValueTicketInfo = document.getElementById("validationTextarea").value
  var inputValueCity = document.getElementById("valueCity").value
  var inputValueDepartament = document.getElementById("valueDepartament").value
  // Object
  var ticket = {
    id: '',
    valueDomain: inputValueDomain,
    valueProblem: inputValueProblem,
    valueTicketInfo: inputValueTicketInfo,
    valueCity: inputValueCity,
    valueDepartament: inputValueDepartament,
  }

  var tickets = JSON.parse(window.localStorage.getItem('tickets'));
  if(!tickets){
    var tickets = [];
    ticket.id = 1;
  } else {
    ticket.id = tickets.length + 1;
  }
  tickets.push(ticket);
  window.localStorage.removeItem('tickets');
  window.localStorage.setItem('tickets', JSON.stringify(tickets));
  location.reload();
});

var resolveTicket = function(ticketID) {
  for (var i = 0; i < tickets.length; i++) {
    if (tickets[i].id == ticketID) {
      tickets.splice(i,1);
    }
  }
  window.localStorage.removeItem('tickets');
  window.localStorage.setItem('tickets', JSON.stringify(tickets));
  location.reload();
}

window.onload = function() {
  tickets = JSON.parse(window.localStorage.getItem('tickets'));
  var counterSpan = document.getElementById("ticket-counter");
  var table = document.getElementById("tickets-table");
  var counter = 0;
  if (tickets && counterSpan && table) {
    counter = tickets.length;
    counterSpan.innerHTML = counter;
    for (var i = 0; i < tickets.length; i++) {
      var row = table.insertRow(i+1);
      var cell = row.insertCell(0);
      cell.innerHTML = '#' + tickets[i].id;
      var cell = row.insertCell(1);
      cell.innerHTML = tickets[i].valueDomain;
      var cell = row.insertCell(2);
      cell.innerHTML = tickets[i].valueProblem;
      var cell = row.insertCell(3);
      cell.innerHTML = tickets[i].valueTicketInfo;
      var cell = row.insertCell(4);
      cell.innerHTML = tickets[i].valueCity;
      var cell = row.insertCell(5);
      cell.innerHTML = tickets[i].valueDepartament;
      var cell = row.insertCell(6);
      var btn = document.createElement("button");
      btn.innerHTML = "Resolve";
      btn.classList.add("btn-danger")
      btn.name = tickets[i].id;
      btn.onclick = function () {
        resolveTicket(this.name);
      };
      cell.appendChild(btn);
    }
  }
}
