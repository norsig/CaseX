/* eslint comma-dangle: "off" */

$(document).ready(() => {
  let query = '';

  function exportCSV() {
    const token = window.sessionStorage.getItem('userInfo-token');
    $.ajax({
      url: `http://localhost:3000/export${query}`,
      type: 'GET',
      headers: {
        'x-access-token': token
      }
    }).done((response) => {
      const data = response.data;
      const filename = response.filename;
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    });
  }
  $('#export-button').click(exportCSV);

  $('#query2Checkbox').change(() => {
    const enabled = $('#query2Checkbox').prop('checked');
    $('#query2Attribute').attr('disabled', !enabled);
    $('#query2Comparator').attr('disabled', !enabled);
    $('#query2Value').attr('disabled', !enabled);
  });
  $('#query3Checkbox').change(() => {
    const enabled = $('#query3Checkbox').prop('checked');
    $('#query3Attribute').attr('disabled', !enabled);
    $('#query3Comparator').attr('disabled', !enabled);
    $('#query3Value').attr('disabled', !enabled);
  });
  $('#query4Checkbox').change(() => {
    const enabled = $('#query4Checkbox').prop('checked');
    $('#query4Attribute').attr('disabled', !enabled);
    $('#query4Comparator').attr('disabled', !enabled);
    $('#query4Value').attr('disabled', !enabled);
  });
  $('#query5Checkbox').change(() => {
    const enabled = $('#query5Checkbox').prop('checked');
    $('#query5Attribute').attr('disabled', !enabled);
    $('#query5Comparator').attr('disabled', !enabled);
    $('#query5Value').attr('disabled', !enabled);
  });

  function loadDataTable() {
    const uri = `http://localhost:3000/cases${query}`;
    // console.log(uri);
    const token = window.sessionStorage.getItem('userInfo-token');
    const table = $('#example').DataTable({
      destroy: true,
      ajax: {
        type: 'GET',
        url: uri,
        headers: {
          'x-access-token': token,
        },
        dataSrc: json => json,
      },
      columnDefs: [
        {
          targets: [4, 5, 8, 12],
          render: $.fn.dataTable.render.moment('x', 'Do MMM YY'),
        },
        {
          targets: [0, 1],
          width: '20px',
        },
      ],
      columns: [
        { data: 'drNumber' },
        { data: 'masterDrNumber' },
        { data: 'division' },
        { data: 'bureau' },
        { data: 'dateOccured' },
        { data: 'dateReported' },
        { data: 'weaponUsed[, ]' },
        { data: 'caseStatus' },
        { data: 'caseStatusDate' },
        { data: 'solvabilityFactor' },
        { data: 'reportingDistrict' },
        { data: 'motive[, ]' },
        { data: 'lastModifiedDate' },
        { data: 'lastModifiedBy.email' },
        { data: 'victim.victName.first' },
        { data: 'address' },
        { data: 'suspects[0].suspName.first' },
        {
          targets: -1,
          data: null,
          defaultContent: '<button>Click!</button>'
        }
      ],
    });

    // $('#example tbody').on('click', 'tr', () => {
    //   if ($(this).hasClass('selected')) {
    //     $(this).removeClass('selected');
    //   } else {
    //     table.$('th.selected').removeClass('selected');
    //     $(this).addClass('selected');
    //   }
    // });

    // https://datatables.net/examples/ajax/null_data_source.html
    $('#example tbody').on('click', 'button', () => {
      console.log($('button'));
      if ($('button').hasClass('selected')) {
        $('button').removeClass('selected');
      } else {
        table.$('th.selected').removeClass('selected');
        $('button').addClass('selected');
      }
      console.log($(this));
      const data = table.row('.parent', '.selected').data();
      // console.log('parent: ', $('.parent'));
      // console.log('selected: ', $('.selected'));
      console.log(data);
      document.cookie = `id=${data['_id']}`;
      // window.location = '/case';
    });
  }

  // default data table loads with no query
  loadDataTable();

  $('#submit-query').on('click', () => {
    // /cases?drNumber={"lt": 100, "gt": 30}&bureau=OSB
    const a = $('#query1Attribute').val();
    const c = $('#query1Comparator').val();
    const v = $('#query1Value').val();
    if (c === '=') {
      query = `${query}/?${a}${c}${v}`;
    } else {
      query = `${query}${a}={"${c}":${+v}}`;
    }

    if ($('#query2Checkbox').prop('checked')) {
      const A = $('#query2Attribute').val();
      const C = $('#query2Comparator').val();
      const V = $('#query2Value').val();
      if (C === '=') {
        query = query + '&' + A + C + V;
      } else {
        query = `${query}&${A}={"${C}":${+V}}`;
      }
    }

    if ($('#query3Checkbox').prop('checked')) {
      if ($('#query3Comparator').val() === '=') {
        query = query + '&' + $('#query3Attribute').val() + $('#query3Comparator').val() + $('#query3Value').val();
      } else {
        query = `${query}&${$('#query3Attribute').val()}={"${$('#query3Comparator').val()}":${+$('#query3Value').val()}}`;
      }
    }

    if ($('#query4Checkbox').prop('checked')) {
      if ($('#query4Comparator').val() === '=') {
        query = query + '&' + $('#query4Attribute').val() + $('#query4Comparator').val() + $('#query4Value').val();
      } else {
        query = `${query}&${$('#query4Attribute').val()}={"${$('#query4Comparator').val()}":${+$('#query4Value').val()}}`;
      }
    }
    // console.log(query);
    loadDataTable();
  });
});
