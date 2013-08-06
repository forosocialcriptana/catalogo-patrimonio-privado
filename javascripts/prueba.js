mapbox.auto('map', 'ciudadreal-eea.map-j969i073', function(map){
  mapbox.converters.googledocs('0Aj7zn-PTgttkdEtSRl9FYUFlVTQ0TVpKVkFkZnlCR3c','od6', function(data){
    var markerlayer = mapbox.markers.layer();
    var interaction = mapbox.markers.interaction(markerlayer);
    interaction.formatter(function(feature){
      var p = feature.properties;
      var o = '<h2>' + p.titulo + '</h2>' + 
              '<div class="by">' + p.fecha + ' ' + p.lugar + '</div>' +
      //'<a target="_blank" href="' + p.url + '">' +
              '<img src="' + p.imagen + '" width="400">' ;
              //'<div class="by">' + p.fecha + ' ' + p.lugar'</div>' +
              
              //'</a>';
      return o;
    });
    map.addLayer(markerlayer);
    for (i in data) {
      data[i].properties['marker-size'] = 'medium';
      data[i].properties['marker-symbol'] = 'star-stroked';
      data[i].properties['marker-color'] = '00bcce';
    }
    markerlayer.features(data);
  });
});

