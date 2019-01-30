function format ( dataSource ) {
    var html = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    for (var key in dataSource){
        html += '<tr>'+
                   '<td>' + key             +'</td>'+
                   '<td>' + dataSource[key] +'</td>'+
                '</tr>';
    }        
    return html += '</table>';  
}

$(function () {

      var table = $('#example').DataTable({});

      // Add event listener for opening and closing details
      $('#example').on('click', 'td.details-control', function () {
          var tr = $(this).closest('tr');
          var row = table.row(tr);

          if (row.child.isShown()) {
              // This row is already open - close it
              row.child.hide();
              tr.removeClass('shown');
          } else {
              // Open this row
              row.child(format({
                  'Key 1' : tr.data('key-1'),
                  'Key 2' :  tr.data('key-2')
              })).show();
              tr.addClass('shown');
          }
      });
  });