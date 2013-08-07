var data_id = '0ApyGMNeKDyLddE4wS2NqY01QSjFqWXRHaXdFMzRnTWc',
    map_id = 'forosocialcriptana.map-ns0xydjk',
    features,
    features_summary,
    map = L.mapbox.map('map', map_id);

mmg_google_docs_spreadsheet_1(data_id, mapData);
map.setView([39.396805714385486,-3.0959129333496094],12);
// Add fullscreen
var fullscreenControl = new L.Control.Fullscreen();
fullscreenControl.addTo(map);
// Add map leyend
map.legendControl.addLegend(document.getElementById('legend-content').innerHTML);
L.tileLayer('Foro Social de Campo de Criptana', {
    attribution: '<a href="http://www.forosocialcriptana.com">Foro Social de Campo de Criptana</a>'
}).addTo(map);

// add a marker in the given location, attach some popup content to it and open the popup
//L.marker([38.870721,-3.99353]).addTo(map).bindPopup('Aeropuerto de Ciudad Real');


//Listen for individual marker clicks
map.markerLayer.on('click',function(e) {
	var feature = e.layer.feature;
	e.layer.bindPopup('<h3>' + feature.properties.título + 
			'</h3><p><img src="' + feature.properties.fotos + '" width="400"></p>', {minWidth: 400});
	var info = '<h2>' + feature.properties.título + '</h2>' +
	'<p>' + feature.properties.descripciónbreve + '</p>';
	document.getElementById('info').innerHTML = info;
});

// Clear the tooltip when map is clicked
map.on('click',function(e){
	document.getElementById('info').innerHTML = '';
});

// Build map
function mapData(f) {
    map.markerLayer.setGeoJSON(f);
}

//CARGA DE LIBRERÍAS PARA GRÁFICOS
google.load('visualization', '1.0', {packages:['corechart']}); 
//CARGA DE DATOS
function drawGraph() {
  var query1 = new google.visualization.Query('https://docs.google.com/spreadsheet/tq?key=0Aj7zn-PTgttkdEtSRl9FYUFlVTQ0TVpKVkFkZnlCR3c&gid=2&range=A1:B14&pub=1');
  var query2 = new google.visualization.Query('https://docs.google.com/spreadsheet/tq?key=0Aj7zn-PTgttkdEtSRl9FYUFlVTQ0TVpKVkFkZnlCR3c&gid=4&range=A1:B10&pub=1');
  query1.send(handleQueryResponse1);
  query2.send(handleQueryResponse2);
}
function handleQueryResponse1(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
  return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.PieChart(document.getElementById('causes_chart'));
  chart.draw(data, {
    title: 'Distribución de agresiones por Causa',
    backgroundColor: 'transparent',
    height: 400
  });
  document.getElementById('total').innerHTML=data.getValue(1,2);
}
function handleQueryResponse2(response) {
	  if (response.isError()) {
	    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
	  return;
	  }
	  var data = response.getDataTable();
	  var chart = new google.visualization.PieChart(document.getElementById('types_chart'));
	  chart.draw(data, {
	    title: 'Distribución de agresiones por Tipo',
	    backgroundColor: 'transparent',
	    height: 400
	  });
	}
google.setOnLoadCallback(drawGraph);


// function for put href for download data
function download_data() {
    $('#download_csv').attr('href', 'https://docs.google.com/a/developmentseed.org/spreadsheet/pub?key=' + data_id + '&output=csv');
    $('#download_josn').attr('href', 'https://spreadsheets.google.com/feeds/list/' + data_id + '/od6/public/values?alt=json-in-script');
}

//Filters
$(document).ready(function () {
    var $typesMenu = $('#types');
    // get event click on menu types
    $typesMenu.find('a').click(function (e) {
        var id_types = e.target.id;
        // check if is active on menu types "Todos"
        if (id_types === 'Todos') {
            $typesMenu.find('a').removeClass('active');
            $('#' + id_types).addClass('active');
           	map.markerLayer.setFilter(function(f) {
            	return true;
            });
        } else {
        	$typesMenu.find('a').removeClass('active');
            $('#' + id_types).addClass('active');
            map.markerLayer.setFilter(function(f) {
            	return f.properties['tipodevalor'].indexOf($typesMenu.find('.active').attr('id')) !== -1;
            });
        }
        return false;
    });

    $('a[href="#opendata"]').click(function (e) {
        $('#backdrop').fadeIn(200);
        $('#opendata, #close').show();
        return false;
    });

    $('a[href="#howto"]').click(function (e) {
        $('#backdrop').fadeIn(200);
        $('#howto, #close').show();
        return false;
    });

    $('#close').click(function (e) {
        $('#backdrop').fadeOut(200);
        $('#opendata, #howto, #close').hide();
        return false;
    });

    $('#arrow_block_inf').click(function (e) {
        $('.block_inf_type').css('display', 'block');
        $('#close_block_inf').show();

        // close other block static
        $('.statistic_by_month').css('display', 'none');
        $('#close_block_stac').css('display', 'none');
        return false;
    });

    $('#close_block_inf').click(function (e) {
        $('.zoomer').show();
        $('.block_inf_type').hide();
        $('#close_block_inf').hide();
        return false;
    });

    // get the click fro close block statistic line
    $('#close_block_stac').click(function () {
        $(this).hide();
        $('.statistic_by_month').css('display','none');
        $('#arrow_show_block').css('display','block');
    });
});