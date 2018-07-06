const button = document.querySelector(".button");
const answerText = document.querySelector(".answer");


button.addEventListener("click", () => {
    getLocation();
});

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation,showError);
    } else {
        console.log("browser doesn't support html5 geolocation");
    }
}

const showLocation = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude,longitude);
    const xhr = new XMLHttpRequest();
    xhr.open('GET',
    `https://api.onwater.io/api/v1/results/${latitude},${longitude}?access_token=[API-KEY]`);
    xhr.send(null);
    xhr.onreadystatechange =  () => {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                updateAnswer(JSON.parse(xhr.responseText)); // 'This is the returned text.'
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        };
    }
}

const showError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
             console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

const updateAnswer = (answer) => {
    if(answer.water === false) {
        answerText.innerHTML = "You're on land."
    } else {
        answerText.innerHTML = "You're on water."
    }
}