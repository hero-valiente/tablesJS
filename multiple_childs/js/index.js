function format ( dataSource ) {
    var html = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    if(typeof dataSource == "object"){
        for (var key in dataSource){
            html += '<tr>'+
                       '<td>' + key             +'</td>'+
                       '<td>' + dataSource[key] +'</td>'+
                    '</tr>';
        } 
    }else{
        html += '<tr> nada que mostrar</tr>'
    }
    return html += '</table>';  
}

var myJson = {
    "plataforma NetCAS": {
        id: 1,
        nombre: "NETCAS",
        password: "1234"
    },
    "EJECUCIÓN DE CRQ's": false,
    "TIMER ALCATEL": 1000,
    "NOMBRE DE LA PLATAFORMA": "NETCAS"
};
var tableData;
function evalJSon(myJson){
    var arrayTableData = []
    
    
    var type;
    for(var item in myJson){
        console.log(item)
        var tableData = {};
        type = typeof myJson[item];
        tableData.descripcion = item;
        if( type == "string" || type =="boolean" || type == "number" ){
            tableData.valor =  myJson[item];
        }else if(myJson[item]["nombre"] != null){
            tableData.valor = myJson[item]["nombre"];
            
        }else{
            tableData.valor = "ver detalle";
        }
        arrayTableData.push(tableData);
    }
    return arrayTableData;
}

function addDetailControl( myJson){
    var i = 0;
    for(var item in myJson){
        if(typeof myJson[item] == "object"){
            var cell = table.column(2).nodes()[i];
            $(cell).addClass('details-control');
        }
        i++;
    }
}

var gRow;
var table;
$(function () {
    tableData = evalJSon(myJson);

      table = $('#example').DataTable({
          data : tableData,
          columns: [            
            { data: "descripcion" },
            { data: "valor" },
            {
            //    "className":      'details-control',
                "data":           null,
                "defaultContent": '',
                "width": "5%"
            },
        ],
        ordering: false

      });
      addDetailControl( myJson);
      // Add event listener for opening and closing details
      $('#example').on('click', 'td.details-control', function () {
          var tr = $(this).closest('tr');
          var row = table.row(tr);
        gRow = row;
          if (row.child.isShown()) {
              // This row is already open - close it
              row.child.hide();
              tr.removeClass('shown');
          } else {
              // Open this row
              row.child(format(myJson[row.data()["descripcion"]])).show();
              tr.addClass('shown');
          }
      });
  });