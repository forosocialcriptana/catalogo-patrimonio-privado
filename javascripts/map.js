var data_id = '0ApyGMNeKDyLddHlESWR1MGxUaUgtOUlKbm1KUUtoTEE',
    map_id = 'forosocialcriptana.map-ns0xydjk',
    features,
    features_summary,
    map = L.mapbox.map('map', map_id);

mmg_google_docs_spreadsheet_1(data_id, mapData);
map.setView([39.396805714385486,-3.0959129333496094],12);
// Añade pantalla completa al mapa
var fullscreenControl = new L.Control.Fullscreen();
fullscreenControl.addTo(map);
// Leyenda del mapa
map.legendControl.addLegend(document.getElementById('legend-content').innerHTML);
L.tileLayer('Foro Social de Campo de Criptana', {
    attribution: '<a href="http://www.forosocialcriptana.com">Foro Social de Campo de Criptana</a>'
}).addTo(map);

// add a marker in the given location, attach some popup content to it and open the popup
// L.marker([39.396805714385486,-3.12576]).addTo(map).bindPopup('Iglesia');


// Nota que aparece al hacer click sobre las marcas del mapa
map.markerLayer.on('click',function(e) {
	var feature = e.layer.feature;
	e.layer.bindPopup('<h3>' + feature.properties.título + 
			'</h3><p><img src="' + feature.properties.fotos + '" width="400"></p>', {minWidth: 400});
	var info = '<h2>' + feature.properties.título + '</h2>' +
	'<p>' + feature.properties.descripciónbreve + '</p>';
	document.getElementById('info').innerHTML = info;
});

// Cierra las notas de las marcas cuando se hace click sobre el mapa
map.on('click',function(e){
	document.getElementById('info').innerHTML = '';
});

// Construye el mapa
function mapData(f) {
    map.markerLayer.setGeoJSON(f);
}

//Carga de librerías para gráficos
google.load('visualization', '1.0', {packages:['corechart']}); 
//Carga de datos
function drawGraph() {
   var query = new google.visualization.Query('https://docs.google.com/spreadsheet/tq?key=0ApyGMNeKDyLddHlESWR1MGxUaUgtOUlKbm1KUUtoTEE&gid=4&range=A1:B10&pub=1');
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
	  if (response.isError()) {
	    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
	  return;
	  }
	  var data = response.getDataTable();
	  var chart = new google.visualization.PieChart(document.getElementById('types_chart'));
	  chart.draw(data, {
	    title: 'Distribución de lugares por tipo de valor',
	    backgroundColor: 'transparent',
	    height: 400
	  });
	}
google.setOnLoadCallback(drawGraph);


// Función para publicar los datos abiertos
function download_data() {
    $('#download_csv').attr('href', 'https://docs.google.com/a/developmentseed.org/spreadsheet/pub?key=' + data_id + '&output=csv');
    $('#download_josn').attr('href', 'https://spreadsheets.google.com/feeds/list/' + data_id + '/od6/public/values?alt=json-in-script');
}

//Filtros
$(document).ready(function () {
    var $typesMenu = $('#tipos');
    $typesMenu.find('a').click(function (e) {
        var id_types = e.target.id;
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