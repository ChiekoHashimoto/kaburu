window.onload = function () {

    var dataPoints = []
    // ToDO: This should be hadled by server in order to not exposing the api key
    // Leaving this for time being 
    var apikey = "OZGT1BSFWVIBK1PD"

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Stock Price of BMW - August"
        },
        axisX:{
            valueFormatString: "DD MMM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Closing Price (in USD)",
            includeZero: false,
            valueFormatString: "$##0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "$" + CanvasJS.formatNumber(e.value, "##0.00");
                }
            }
        },
        data: [{
            type: "area",
            xValueFormatString: "DD MMM",
            yValueFormatString: "$##0.00",
            dataPoints: dataPoints
        }]
    });

    function addData(data) {
        var dates= []
        var closeValues= []
        for(x in data["Time Series (Daily)"]){
            dates.push(x)
            closeValues.push(data["Time Series (Daily)"][x]["4. close"])
        }

        for (var i = 0; i < dates.length; i++) {
            dataPoints.push({
                x: new Date(dates[i]),
                y: parseFloat(closeValues[i])
            });
        }
        chart.render();
    
    }
    // ToDo: Generate the api call dynamically based on user input
    $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NFLX&apikey=" + apikey, addData);


}    