var deviceID = window.location.search.substr(1);

document.getElementById('background').className += " option" + rnd(1, 3);

document.getElementById('M').innerText += deviceID == "simulator" ? Math.floor(Math.random() * 900000000) : deviceID;
document.getElementById('motorDesc').innerText += rndVal(["Main", "Second", "Small"]) + " " + rndVal(["pump", "conveyor", "compressor"]) + " " + rnd(1, 15);
document.getElementById('motorSiteLocation').innerText += "Row " + String.fromCharCode(rnd('A'.charCodeAt(0), 'G'.charCodeAt(0))) + " line " + rnd(1, 15);

// ###### Util Functions ######

function rndVal(array) {
    return array[rnd(0, array.length)];
}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// ###### DataTable ######

var dt = $('#raw_table').DataTable({
    "order": [[2, "desc"]]
});

function table() {
    dt.row.add([
        1,
        "Location",
        1,
        1,
        1,
        1
    ]).draw();
}

// ###### GAUGES ######

var gauges = {};

gauges['torque'] = gauge('#sg-gauge1', {
    size: 200,
    clipWidth: 310,
    clipHeight: 300,
    ringWidth: 7,
    minValue: -5,
    maxValue: 5,
    transitionMs: 4000
});

gauges['speed'] = gauge('#sg-gauge2', {
    size: 200,
    clipWidth: 310,
    clipHeight: 300,
    ringWidth: 7,
    minValue: 0,
    maxValue: 3000,
    transitionMs: 4000
});

gauges['temperature'] = gauge('#sg-gauge3', {
    size: 200,
    clipWidth: 310,
    clipHeight: 300,
    ringWidth: 7,
    minValue: 0,
    maxValue: 100,
    transitionMs: 4000
});

for (var key in gauges) {
    gauges[key].render();
}

// ###### VALUES TABLE (the small one) ######

var textViews = {
    'torque': [document.getElementById('t4'), "Nm"],
    'speed': [document.getElementById('t2'), "RPM"],
    'temperature': [document.getElementById('t6'), "deg C"]
};

// ###### GRAPH ######

var rtContainer = $('#graph-wrapper');
var rtWidth = rtContainer.width() - 30;
var rtHeight = rtContainer.height();

var graphData = {
    'temperature': 34,
    'torque': 0,
    'speed': 0
};

var options = {
    mainChart: {
        height: rtHeight * 0.65,
        width: rtWidth,
        margin: {top: 25, right: 0, bottom: 10, left: 30}
    },
    filterChart: {
        height: rtHeight * 0.2,
        width: rtWidth,
        margin: {top: 10, right: 0, bottom: 10, left: 30}
    },
    series: [
        /*
         {
         name: 'temperature',
         color: '#1F77B4',
         type: 'area',
         get: function () {
         return graphData['temperature'];
         }
         },
         */
        {
            name: 'torque',
            //color: '#AEC7E8',
            color: '#1F77B4',
            get: function () {
                return graphData['torque'];
            }
        },
        {
            name: 'speed',
            color: '#FF7F0E',
            opacity: '1',
            get: function () {
                return (graphData['speed'] / 1000).toFixed(2);
            }
        }
    ],
    defaultTicks: 60 * 6,
    duration: 100,
    yLabel: '',
    xLabel: 'TIME',
    container: '#rt-graph'
};

drawMultiseriesRealTime(options);

var controls = {
    'start': document.getElementById('start-device'),
    'stop': document.getElementById('stop-device')
};

// ###### INVALIDATE FUNCTION ######

function update(data) {
    for (var key in data) {
        gauges[key].update(data[key]);
        textViews[key][0].innerHTML = data[key] + " " + textViews[key][1];
        graphData[key] = data[key];
    }
}