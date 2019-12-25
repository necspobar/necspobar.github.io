// 1桁の数字を0埋めで2桁にする
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;     
};

// 2) CSVから２次元配列に変換
function csv2Array(str) {
    var csvData = [];
    var lines = str.split("\n");
    for (var i = 0; i < lines.length; ++i) {
      var cells = lines[i].split("\t");
      csvData.push(cells);
    }
    return csvData;
  }
  
  function drawBarChart(data) {
    // 3)chart.jsのdataset用の配列を用意
    var tmpLabels = [], tmpData = [];
    var time = new Date(Date.parse(data[data.length - 5][1]));
    var t1 =  toDoubleDigits(time.getHours()) + ":" + toDoubleDigits(time.getMinutes());
    tmpLabels.push(t1);
    var time = new Date(Date.parse(data[data.length - 4][1]));
    var t2 =  toDoubleDigits(time.getHours()) + ":" + toDoubleDigits(time.getMinutes());
    tmpLabels.push(t2);
    var time = new Date(Date.parse(data[data.length - 3][1]));
    var t3 =  toDoubleDigits(time.getHours()) + ":" + toDoubleDigits(time.getMinutes());
    tmpLabels.push(t3);
    var time = new Date(Date.parse(data[data.length - 2][1]));
    var t4 =  toDoubleDigits(time.getHours()) + ":" + toDoubleDigits(time.getMinutes());
    tmpLabels.push(t4);
    tmpData.push(data[data.length - 5][2])
    tmpData.push(data[data.length - 4][2])
    tmpData.push(data[data.length - 3][2])
    tmpData.push(data[data.length - 2][2])

  
    // 4)chart.jsで描画
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: tmpLabels,
        datasets: [
          { label: "Number of People", data: tmpData, borderColor	: "gray" }
        ]
      },
      options: {
        scales: {
          yAxes: [{
              id: "人数",
              type: "linear", 
              position: "left",
              ticks: {
                  max: 30,
                  min: 0,
                  stepSize: 5
              }
          }]
        }
      }
    });
  }

  function main() {
    // 1) ajaxでCSVファイルをロード
    var req = new XMLHttpRequest();
    var filePath = './src/people_count.csv';
    req.open("GET", filePath, true);
    req.onload = function() {
      // 2) CSVデータ変換の呼び出し
      data = csv2Array(req.responseText);
      // 3) chart.jsデータ準備、4) chart.js描画の呼び出し
      drawBarChart(data);
    }
    req.send(null);
  }
  
  main();