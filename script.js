//Funzione che richiama i dati dal server
function loadCards () {
  $.ajax ({
    url : "http://157.230.17.132:3010/todos",
    method : "GET",
    success : function (data,stato) {
      if (stato == "success") {
        var myarr = [];
        for (var i = 0; i < data.length; i++) {
          var cards = data[i];
          var cardValue = cards["value "];
          myarr.push(cardValue);
          console.log(cards);
          console.log(cardValue);
        }
        chart (myarr);
      }
    },
    error : function () {}
  });
}
//Funzione per creare il grafico
function chart (myarr) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
              label: 'Billions earned in 2018',
              backgroundColor: ['rgb(255, 99, 132)',
                               'rgb(200, 99, 192)',
                               'rgb(355, 99, 32)',
                               'rgb(5, 10, 132)',
                               'rgb(55, 99, 32)',
                               'rgb(415, 99, 132)',
                               'rgb(415, 99, 132)',
                               'rgb(199, 99, 132)',
                               'rgb(45, 9, 132)',
                               'rgb(15, 99, 132)',
                               'rgb(15, 99, 32)',
                               'rgb(715, 99, 32)',
                               'rgb(255, 74, 132)'],
              borderColor: 'rgb(255, 99, 132)',
              data: myarr
          }]
      },

      // Configuration options go here
      options: {}
  });
  chart.canvas.parentNode.style.width = '700px';
  chart.canvas.parentNode.style.height = '350px';
}
//Funzione per creare il grafico relativo ai numeri random
function chartRnd (myarr) {
  var ctx = document.getElementById('myChartOfRnd').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
              label: 'Random Numbers',
              backgroundColor: ['rgb(255, 99, 132)',
                               'rgb(200, 99, 192)',
                               'rgb(355, 99, 32)',
                               'rgb(5, 10, 132)',
                               'rgb(55, 99, 32)',
                               'rgb(415, 99, 132)',
                               'rgb(415, 99, 132)',
                               'rgb(199, 99, 132)',
                               'rgb(45, 9, 132)',
                               'rgb(15, 99, 132)',
                               'rgb(15, 99, 32)',
                               'rgb(715, 99, 32)',
                               'rgb(255, 74, 132)'],
              borderColor: 'rgb(255, 99, 132)',
              data: myarr
          }]
      },

      // Configuration options go here
      options: {}
  });
  chart.canvas.parentNode.style.width = '700px';
  chart.canvas.parentNode.style.height = '350px';
}
//Funzione che richiama i dati dal server per la generazione di 12 numeri casuali compresi tra 0 e 100
function loadCardsForRnd () {
  $.ajax ({
    url : "https://www.boolean.careers/api/array/integers",
    method : "GET",
    data : {
      min: 1,
      max: 100,
      items: 12
    },
    success : function (data,stato) {
      console.log(data.response);
      chartRnd (data.response);
    },
    error : function () {},
  });
}

//-----------------------------------------------------------------------------------------------

function getSales() {
  clearCharts();
  $.ajax ({
    url : "http://157.230.17.132:4010/sales",
    method : "GET",
    data : {

    },
    success : function (data,stato) {
      salesPerMonth(data);
      salesPerSalesman(data);
    },
    error : function () {},
  });
}
//Funzione per estrarre il nome del mese dalla stinga ricevuta
function getMonthNameFromDate(date) {

  var mom = moment(date, "DD/MM/YYYY");
  var monthName = mom.format("MMMM");

  return monthName;
}
//funzione per ricavare mese e totale vendite di quel mese
function salesPerMonth (data) {

  var monthSales = {
    "January" : 0,
    "February" : 0,
    "March" : 0,
    "April" : 0,
    "May" : 0,
    "June" : 0,
    "July" : 0,
    "August" : 0,
    "September" : 0,
    "October" : 0,
    "November" : 0,
    "December" : 0,
  }

  for (var i = 0; i < data.length; i++) {

    var d = data[i];
    var amount = Number(d.amount);
    var date = d.date;
    var month = getMonthNameFromDate(date);
    monthSales[month] += amount;
    // console.log(d.salesman + month + amount);
  }
  var months = Object.keys(monthSales);
  var totalAmount = Object.values(monthSales);
  console.log(totalAmount);
  monthlyChart (months, totalAmount);
  quarterChart(monthSales);
}
//Funzione per creare il grafico relativo alle vendite mensili
function monthlyChart (keys,monthSales) {
  var ctx = document.getElementById('chartMonthlySales').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: keys,
      datasets: [{
        label: 'Total Sales in 2017',
        backgroundColor: ['rgb(155, 222, 932)',
        // 'rgb(200, 450, 192)',
        // 'rgb(355, 99, 32)',
        // 'rgb(155, 399, 322)',
        // 'rgb(355, 945, 112)',
        // 'rgb(155, 254, 32)',
        // 'rgb(355, 99, 323)',
        // 'rgb(155, 889, 222)',
        // 'rgb(355, 999, 32)',
        // 'rgb(55, 99, 322)',
        // 'rgb(355, 159, 444)',
        // 'rgb(5, 10, 132)',
        ],
      borderColor: 'rgb(77, 77, 77)',
      data: monthSales,
      }]
    },
  // Configuration options go here
  options: {}
  });
chart.canvas.parentNode.style.width = '700px';
chart.canvas.parentNode.style.height = '350px';
}
//Funzione per creare il grafico relativo alle vendite trimestrali
function quarterChart (monthSales) {
  var totalAmount = Object.values(monthSales);
  var q1 = 0;
  var q2 = 0;
  var q3 = 0;
  var q4 = 0;

  for (var i = 0; i < 3; i++) {
    q1 += totalAmount[i];
    q2 += totalAmount[i+3];
    q3 += totalAmount[i+6];
    q4 += totalAmount[i+9];
  }

  var ctx = document.getElementById('quarterSalesChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ["q1","q2","q3","q4"],
      datasets: [{
        label: 'Total Sales in 2017',
        backgroundColor: ['rgb(26, 209, 6)',
                          'rgb(26, 209, 6)',
                          'rgb(26, 209, 6)',
                          'rgb(26, 209, 6)',
        ],
      borderColor: 'rgb(77, 77, 77)',
      data: [q1,q2,q3,q4],
      }]
    },
  // Configuration options go here
  options: {}
  });
chart.canvas.parentNode.style.width = '700px';
chart.canvas.parentNode.style.height = '350px';
}
//Funzione per ricavare totale vendite e percentuale di ogni venditore
function salesPerSalesman(data) {

  var salesman = {};
  var totaleVendite = 0;

  for (var i = 0; i < data.length; i++) {

    var d = data[i];
    var amount = Number(d.amount);
    totaleVendite += amount;

    if (!salesman[d.salesman]) {
      salesman[d.salesman] = 0;
    }

    salesman[d.salesman] += amount;
  }
  console.log(salesman);
  console.log("totale vendite: "+totaleVendite);
  var salesMan = Object.keys(salesman);
  var totalAmount = Object.values(salesman)
  annualPieChart(salesMan, totalAmount)
}
//Funzione per creare il grafico relativo alle vendite totali e alle percentuali di ogni venditore
function annualPieChart (salesman, totalAmount) {
  console.log(totalAmount);
  var ctx = document.getElementById('totalAnnualSalesChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
      labels: salesman,
      datasets: [{
        label: 'Total Sales',
        backgroundColor: ['rgb(155, 222, 932)',
        'rgb(200, 450, 192)',
        'rgb(355, 99, 32)',
        'rgb(5, 10, 132)',],
        borderColor: 'rgba(255, 99, 132, 0.1)',
        data: totalAmount
      }]
    },
    // Configuration options go here
    options:{}
  });
  chart.canvas.parentNode.style.width = '600px';
  chart.canvas.parentNode.style.height = '300px';
}
//Funzione per aggiungere una vendita
function addSale() {
  var venditore = $("#venditore").val();
  var somma = $("#vendita").val();
  var data = $("#data").val();
  $.ajax ({
    url : "http://157.230.17.132:4010/sales",
    method : "POST",
    data : {
      salesman : capitalizeFirstLetter(venditore),
      amount: somma,
      date: data,
    },
    success : function (data,stato) {
      clearClick();
      getSales();
    },
    error : function () {},
  });
}
//Funzione per scrivere con la maiuscola una qualsiasi stringa
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//funzione per ripulire i campi
function clearClick () {
  var venditore = $("#venditore").val("");
  var somma = $("#vendita").val("");
  var data = $("#data").val("");
}
//funzione per piallare i grafici
function clearCharts() {
  var chartsCont = $("#totalAnnualSalesChart");
  var chartsCont2 = $("#chartMonthlySales");
  var chartsCont3 = $("#quarterSalesChart");
  chartsCont.remove();
  chartsCont2.remove();
  chartsCont3.remove();
  var chartNew = document.createElement("canvas");
  var chartNew2 = document.createElement("canvas");
  var chartNew3 = document.createElement("canvas");
  $(chartNew).attr("id","chartMonthlySales");
  $(chartNew2).attr("id","totalAnnualSalesChart");
  $(chartNew3).attr("id","quarterSalesChart");
  var cont = $(".contNew");
  var cont2 = $(".contNew2");
  var cont3 = $(".contNew3");
  cont.append(chartNew);
  cont2.append(chartNew2);
  cont3.append(chartNew3);
}

function init() {
  // loadCards ();
  // loadCardsForRnd ();
  getSales();
  var myBtn = $("#addDataButton");
  myBtn.click(addSale);
}

$(document).ready(init);
