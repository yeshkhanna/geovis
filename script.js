mapboxgl.accessToken = 'pk.eyJ1IjoieWVzaGtoYW5uYSIsImEiOiJjbHVwNTdqM2cxOWRxMmpvMnN2aXV2eDlvIn0.GwgOYPhL1NIkHbJl6kPb6A'; 
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/yeshkhanna/clvxffsc5071y01ph8d66eqmj',
    zoom: 10,
    center: [-75.150996, 39.992945]
});

var legend = document.getElementById('legend');
var layers = ['Commercial land', 'Residential land', 'Institutional land', 'Other'];
var colors = ['#bf0808', '#32f145', '#e9f54d', '#000000'];

for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;
    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
}

map.on('load', function() {
    map.getCanvas().style.cursor = 'default';
    map.fitBounds([
        [-75.299998, 40.091772],
        [-75.011607, 39.884492]
    ]);

    map.on('mousemove', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['buildings-lu']
        });

        if (features.length > 0) {
            document.getElementById('pd').innerHTML =
                '<h3><strong> building id:' + features[0].properties.fid + '</strong></h3><p><strong><em>' +
                features[0].properties.landuse;
        } else {
            document.getElementById('pd').innerHTML =
                '<p>The building id is: </p>';
        }
    });
});
