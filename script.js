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

function getSales() {
  $.ajax ({
    url : "http://157.230.17.132:4010/sales",
    method : "GET",
    data : {

    },
    success : function (data,stato) {
      var totalSales = 0;
      var marcoSales = 0;
      var giuseppeSales = 0;
      var riccardoSales = 0;
      var robertoSales = 0;

      for (var i = 0; i < data.length; i++) {
        var sale = Number(data[i].amount);
        var salesman = data[i].salesman;
        var date = data[i].date;
        totalSales += sale;
        // date = moment()

        // console.log(date);

        salesPerMonth(data);

        switch (salesman) {
          case "Marco":
            marcoSales += sale;
            break;
          case "Giuseppe":
            giuseppeSales += sale;
            break;
          case "Riccardo":
            riccardoSales += sale;
            break;
          case "Roberto":
            robertoSales += sale;
            break;
          // default:
        }

        // console.log(salesman);
        // console.log(date);
      }
      console.log(data);
      console.log("Totale vendite: " + totalSales);
      console.log("Vendite di MARCO: " + marcoSales);
      console.log("Vendite di GIUSEPPE: " + giuseppeSales);
      console.log("Vendite di RICCARDO: " + riccardoSales);
      console.log("Vendite di ROBERTO: " + robertoSales);

      annualPieChart (marcoSales,giuseppeSales,riccardoSales,robertoSales);
    },
    error : function () {},
  });
}
//Funzione per creare il grafico relativo alle vendite totali e alle percentuali di ogni venditore
function annualPieChart (marcoSales,giuseppeSales,riccardoSales,robertoSales) {
  var ctx = document.getElementById('totalAnnualSalesChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',

      // The data for our dataset
      data: {
        labels: ['Marco', 'Giuseppe', 'Riccardo', 'Roberto'],
        datasets: [{
          label: 'Total Sales',
          backgroundColor: ['rgb(155, 222, 932)',
                           'rgb(200, 450, 192)',
                           'rgb(355, 99, 32)',
                           'rgb(5, 10, 132)',],
          borderColor: 'rgba(255, 99, 132, 0.1)',
          data: [marcoSales,giuseppeSales,riccardoSales,robertoSales]
        }]
      },
      // Configuration options go here
      options:{}
  });
  chart.canvas.parentNode.style.width = '700px';
  chart.canvas.parentNode.style.height = '350px';
}
//Funzione per creare il grafico relativo alle vendite mensili
function monthlyChart (monthSales) {
  var ctx = document.getElementById('chartMonthlySales').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        datasets: [{
          label: 'Total Sales',
          backgroundColor: ['rgb(155, 222, 932)',
                           'rgb(200, 450, 192)',
                           'rgb(355, 99, 32)',
                           'rgb(155, 399, 322)',
                           'rgb(355, 945, 112)',
                           'rgb(155, 254, 32)',
                           'rgb(355, 99, 323)',
                           'rgb(155, 889, 222)',
                           'rgb(355, 999, 32)',
                           'rgb(55, 99, 322)',
                           'rgb(355, 159, 444)',
                           'rgb(5, 10, 132)',],
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

function salesPerMonth (data) {
  var monthSales = [0,0,0,0,0,0,0,0,0,0,0,0];
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var amount = Number(d.amount);
    var date = d.date;

    var dateSplit = date.split("/");
    var month = dateSplit[1];

    monthSales[month - 1] += amount;
  }
  monthlyChart (monthSales);
  // console.log("monthSales: " + monthSales);
}

function init() {
  // loadCards ();
  // loadCardsForRnd ();
  getSales();
}

$(document).ready(init);
