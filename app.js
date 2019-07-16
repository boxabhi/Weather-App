var cityvalue = document.getElementById('cityname');
var temp = document.getElementById('temp');
var weathercondition = document.getElementById('weathercondition');
var date = document.getElementById('date');


var previous = document.getElementById('previous');


var input = document.getElementById('input');
var submit = document.getElementById('submit');
var addHTML = document.getElementById('add');

// Setting Date 
var currentDate = new Date();
date.innerHTML = currentDate.toDateString();


submit.addEventListener('click', function () {
    var proxy = 'https://cors-anywhere.herokuapp.com/'
    var city = input.value;
    var apiKey = '2cd473cb17321b0c0bd791b210e5e5de';

   

    function run(city){

    var theUrl = proxy + `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            
    fetch(theUrl)
    .then(response =>{
        if(response.ok)
        return response.json();
        else{
        throw new Error('Something went wrong');
        }
    }).then(data =>{
        console.log(data);
    })
    .catch((error =>{

        addHTML.innerHTML = '<img src="icon/astronaut.png" id="previous-img" >  <h5>City not on earth may be on venus.</h5>';
       
        console.log(error);
    }))
}

(run(city));

    function httpGet(city) {
        var theUrl = proxy + `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    // clear rain thunderstorm 

    if(httpGet(city) == 'Missing required request header. Must specify one of: origin,x-requested-with'){
       
    }
    else{
    var fetchData = JSON.parse(httpGet(city));

    var country = fetchData['sys'].country;
    var cityName = fetchData['name'] + ' ,' + country;
    var summary = fetchData.weather['0'].description;
    var temperature = Math.floor(fetchData['main'].temp - 273.15) + '°C';
    var showIcon = (fetchData.weather['0'].main);
    var icon = '';
    if (showIcon == 'Rain' || showIcon == 'Thunderstorm')
        icon = 'src="icon/storm.png"';
    else if (showIcon == 'Clear')
        icon = 'src="icon/sunny.png"';
    else if (showIcon == 'Mist' || showIcon == 'Haze')
        icon = 'src="icon/fog.png"';
    else if (showIcon == 'Clouds')
        icon = 'src="icon/cloudy.png"';
    else if (showIcon == 'Smoke')
        icon = 'src="icon/smoke.png"';

   
    addHTML.innerHTML = '<h3 id="cityname">' + cityName + '</h3>' +
        ' <p id="weathercondition" style="text-transform : uppercase">' + summary + '</p>' +
        '<h1 id="temp"> <img ' + icon + ' id="previous-img">' + temperature + '</h1>';

    }
    
});

