function ejecutar() {
  let method = $("#method").val();
  let significancy = Number($("#significancy").val());
  let fileInput = $("#fileInput")[0].files[0];
  let textInput = removeUnneededSpaces(
    $("#textInput")
      .val()
      .trim()
  );
  console.log("inp", textInput);
  makeRequest(method, significancy, fileInput || textInput);
}

function removeUnneededSpaces(input) {
  return input
    .replace(new RegExp(",", "g"), " ")
    .replace(/\r?\n|\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeRequest(method, significancy, input) {
  var data = new FormData();
  data.append("significancy", significancy);
  data.append(input instanceof File ? "numbersFile" : "numbers", input);
  $.ajax({
    url: "api/methods/" + method,
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    method: "POST",
    type: "POST", // For jQuery < 1.9
    success: function(data) {
      window[method](data); // Trick .. XDDD
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      //TODO ERROR NOTIFY
    }
  });
}

function chisquare(data) {
  console.log("chiSquare", data);

  var tableHeaders = "<th>desde</th><th>hasta</th><th>cantidad</th><th>X</th>";
  var valid = generateValid(data.valid);
  var x2Calculada =
    '<h5>X² Calculada: <span class="badge badge-primary">' +
    data.x2Calculated +
    "</span></h5>";

  var x2Tabla =
    '<h5>X² de Tabla: <span class="badge badge-primary">' +
    data.x2FromTable +
    "</span></h5>";

  var m = '<h5>M: <span class="badge badge-primary">' + data.m + "</span></h5>";

  $("#result").empty();
  $("#result").append(
    '<table id="displayTable" class="display" cellspacing="0" width="100%"><thead><tr>' +
      tableHeaders +
      "</tr></thead></table>" +
      valid +
      x2Calculada +
      x2Tabla +
      m
  );

  let table = $("#displayTable").DataTable({
    searching: false,
    paging: false,
    bFilter: false,
    bInfo: false,
    aoColumnDefs: [
      {
        aTargets: [3],
        mRender: function(data, type, full) {
          return data.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
        }
      }
    ]
  });

  data.intervals.map(function(item) {
    table.row.add([item.from, item.to, item.count, item.x]).draw(false);
  });
}

function poker(data) {
  console.log("Poker", data);

  var tableHeaders = "<th>Mano</th><th>FO</th><th>FE</th><th>X²</th>";
  var valid = generateValid(data.valid);
  var x2Calculada =
    '<h5>X² Calculada: <span class="badge badge-primary">' +
    data.x2Calc +
    "</span></h5>";

  var x2Tabla =
    '<h5>X² de Tabla: <span class="badge badge-primary">' +
    data.x2Table +
    "</span></h5>";

  $("#result").empty();
  $("#result").append(
    '<table id="displayTable" class="display" cellspacing="0" width="100%"><thead><tr>' +
      tableHeaders +
      "</tr></thead></table>" +
      valid +
      x2Calculada +
      x2Tabla
  );

  let table = $("#displayTable").DataTable({
    searching: false,
    paging: false,
    bFilter: false,
    bInfo: false,
    aoColumnDefs: [
      {
        aTargets: [2, 3],
        mRender: function(data, type, full) {
          return data.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
        }
      }
    ]
  });
  for (var key in data.table) {
    table.row
      .add([
        getPokerName(key),
        data.table[key].fo,
        data.table[key].fe,
        data.table[key].t
      ])
      .draw(false);
  }
}

function getPokerName(siglas) {
  switch (siglas) {
    case "1P":
      return "1 Par";
    case "2P":
      return "2 Pares";
    case "TD":
      return "Todas Diferentes";
    case "P":
      return "Poker";
    case "T":
      return "Trio";
    case "TP1":
      return "Trio y 1 Par";
    case "Q":
      return "Quintilla"; // Todo Que carajo es quintilla?
      break;
    default:
  }
}

function run(data) {
  var valid = generateValid(data.valid);
  var zCalculada =
    '<h5>Z Calculada: <span class="badge badge-primary">' +
    data.zCalculated +
    "</span></h5>";

  var zTabla =
    '<h5>Z de Tabla: <span class="badge badge-primary">' +
    data.zFromTable +
    "</span></h5>";

  var corridas =
    '<h5>Corridas: <span class="badge badge-primary">' +
    data.runs +
    "</span></h5>";

  var corridasStr = "<h5>Texto de Corrida: " + data.runStr + "</h5>";

  $("#result").empty();
  $("#result").append(valid + zCalculada + zTabla + corridas + corridasStr);
}

function runBelowHalf(data) {
  var valid = generateValid(data.valid);
  var zCalculada =
    '<h5>Z Calculada: <span class="badge badge-primary">' +
    data.zCalculated +
    "</span></h5>";

  var zTabla =
    '<h5>Z de Tabla: <span class="badge badge-primary">' +
    data.zFromTable +
    "</span></h5>";

  var n1 =
    '<h5>N1: <span class="badge badge-primary">' + data.n1 + "</span></h5>";
  var n2 =
    '<h5>N2: <span class="badge badge-primary">' + data.n2 + "</span></h5>";

  var corridas =
    '<h5>Corridas: <span class="badge badge-primary">' +
    data.runs +
    "</span></h5>";

  var corridasStr = "<h5>Texto de Corrida: " + data.runStr + "</h5>";

  $("#result").empty();
  $("#result").append(
    valid + zCalculada + zTabla + n1 + n2 + corridas + corridasStr
  );
}

function kolmogorov(data) {
  console.log("Kolmogorov", data);

  var tableHeaders =
    "<th>i</th><th>xi</th><th>i/n</th><th>i/n-xi</th><th>xi-(i-1)/n</th>";
  var valid = generateValid(data.valid);
  var x2Calculada =
    '<h5>D Calculada: <span class="badge badge-primary">' +
    data.dCalc +
    "</span></h5>";

  var x2Tabla =
    '<h5>D de Tabla: <span class="badge badge-primary">' +
    data.dTable +
    "</span></h5>";

  $("#result").empty();
  $("#result").append(
    '<table id="displayTable" class="display" cellspacing="0" width="100%"><thead><tr>' +
      tableHeaders +
      "</tr></thead></table>" +
      valid +
      x2Calculada +
      x2Tabla
  );

  let table = $("#displayTable").DataTable({
    searching: false,
    bFilter: false,
    bInfo: false,
    aoColumnDefs: [
      {
        aTargets: [1, 2, 3, 4],
        mRender: function(data, type, full) {
          return data.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
        }
      }
    ]
  });

  data.tableResult.map(function(item) {
    table.row
      .add([
        item["i"],
        item["xi"],
        item["i/n"],
        item["i/n-xi"],
        item["xi-(i-1)/n"]
      ])
      .draw(false);
  });
}

function gaps(data) {
  console.log("Gaps", data);

  var tableHeaders =
    "<th>Brecha</th><th>Frecuencia</th><th>Re Freq</th><th>SN</th><th>Resultado</th>";
  var valid = generateValid(data.valid);
  var x2Calculada =
    '<h5>D Calculada: <span class="badge badge-primary">' +
    data.dCalc +
    "</span></h5>";

  var x2Tabla =
    '<h5>D de Tabla: <span class="badge badge-primary">' +
    data.dTable +
    "</span></h5>";

  $("#result").empty();
  $("#result").append(
    '<table id="displayTable" class="display" cellspacing="0" width="100%"><thead><tr>' +
      tableHeaders +
      "</tr></thead></table>" +
      valid +
      x2Calculada +
      x2Tabla
  );

  let table = $("#displayTable").DataTable({
    searching: false,
    paging: false,
    bFilter: false,
    bInfo: false,
    order: [],
    aoColumnDefs: [
      {
        aTargets: [4],
        mRender: function(data, type, full) {
          return data.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
        }
      }
    ]
  });
  for (var key in data.intervalsTable) {
    table.row
      .add([
        key,
        data.intervalsTable[key].freq,
        data.intervalsTable[key].refreq,
        data.intervalsTable[key].sn,
        data.intervalsTable[key].result
      ])
      .draw(false);
  }
}

function half(data) {
  var valid = generateValid(data.valid);
  var zCalculada =
    '<h5>r: <span class="badge badge-primary">' + data.r + "</span></h5>";

  var zTabla =
    '<h5>LIR: <span class="badge badge-primary">' + data.lir + "</span></h5>";

  var corridas =
    '<h5>LSR: <span class="badge badge-primary">' + data.lsr + "</span></h5>";

  var corridasStr = "<h5>N: " + data.n + "</h5>";

  $("#result").empty();
  $("#result").append(valid + zCalculada + zTabla + corridas + corridasStr);
}

function generateValid(valid) {
  var colorValid = valid ? "primary" : "secondary";
  var validText = valid ? "Aceptada" : "No Aceptada";
  var validHtml =
    '<h5>Hipotesis: <span class="badge badge-' +
    colorValid +
    '">' +
    validText +
    "</span></h5>";
  return validHtml;
}
