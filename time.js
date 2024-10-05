
function formatDateTime(date) {
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const datePart = date.toLocaleDateString(undefined, options);
    const timePart = date.toLocaleTimeString([], timeOptions);
    return `${timePart} ${datePart}`;
}

function formatDate(date) {
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

function displayTimeIntervals(currentDate) {
    const currentHour = new Date(currentDate);
    currentHour.setMinutes(0); 
    document.getElementById('cur-hour').textContent = formatTime(currentHour);
    
    const thirtyMinutesLater = new Date(currentDate);
    thirtyMinutesLater.setMinutes(30); 
    document.getElementById('thirty-min').textContent = formatTime(thirtyMinutesLater);
    
    const oneHourLater = new Date(currentDate);
    oneHourLater.setHours(oneHourLater.getHours() + 1); 
    oneHourLater.setMinutes(0);
    document.getElementById('one-hour').textContent = formatTime(oneHourLater);
}

async function fetchUserTime() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            // fetch time data based on timezone
            const timeResponse = await fetch(`http://worldtimeapi.org/api/timezone/Etc/UTC`);
            const timeData = await timeResponse.json();
            const currentDate = new Date(timeData.datetime);

            // update #all-time with cur time and date
            document.getElementById('all-time').textContent = formatDateTime(currentDate);

            // update #time with formatted date only
            document.getElementById('time').textContent = formatDate(currentDate);

            // display the times
            displayTimeIntervals(currentDate);
        }, (error) => {
            console.error('Geolocation error:', error);
            document.getElementById('all-time').textContent = 'Unable to retrieve location';
            document.getElementById('time').textContent = 'Unable to retrieve date';
        });
    } else {
        document.getElementById('all-time').textContent = 'Geolocation not supported';
        document.getElementById('time').textContent = 'Geolocation not supported';
    }
}

fetchUserTime();