function mmg_google_docs_spreadsheet_1(id, callback) {
//    if (typeof reqwest === 'undefined'){
//        throw 'CSV: reqwest required for mmg_csv_url';
//    }
	// Función que toma los geodatos de una hoja de cálculo de google con identificador id y dibuja las marcas sobre el mapa
    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/1/public/values?alt=json-in-script&callback=callback';
    reqwest({
        url: url,
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: response,
        error: response
    }); 
   
    function response(x) {
        var features = [],
            latfield = '',
            lonfield = '';
        if (!x || !x.feed) return features;
        // Identificación de los campos con la latitud y la longitud
        for (var f in x.feed.entry[0]) {
            if (f.match(/\$Lat/i)) latfield = f;
            if (f.match(/\$Lon/i)) lonfield = f;
        }
        // Creación de las marcas
        for (var i = 0; i < x.feed.entry.length; i++) {
            var entry = x.feed.entry[i];
            var feature = {
            	type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: []
                },
                properties: {
                }
            };
            // Carga las propiedades de cada marca
            for (var y in entry) {
                if (y === latfield) feature.geometry.coordinates[1] = parseFloat(entry[y].$t);
                else if (y === lonfield) feature.geometry.coordinates[0] = parseFloat(entry[y].$t);
                else if (y.indexOf('gsx$') === 0) {
                    feature.properties[y.replace('gsx$', '')] = entry[y].$t;
                }
            }
            if (feature.geometry.coordinates.length == 2) features.push(feature);
	    
            _.each(feature, function(value, key) {
            	if(feature.properties['tipodevalor'].indexOf("Histórico") != -1){ feature.properties['marker-color']='#FFFF00';}
            	if(feature.properties['tipodevalor'].indexOf("Etnográfico") != -1){ feature.properties['marker-color']='#FF0000';}
            	if(feature.properties['tipodevalor'].indexOf("Artístico") != -1){ feature.properties['marker-color']='#0000FF';} 
                if(feature.properties['tipodevalor'].indexOf("Ambiental") != -1){ feature.properties['marker-color']='#00FF00';} 
            });
        }

        return callback(features);
    }    
}
