// Split Calculator Logic


document.getElementById('multiCalculator').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get input values
    const distance = parseFloat(document.getElementById('distance').value);
    const time = document.getElementById('time').value;
    const split = document.getElementById('split').value;
    const watts = parseFloat(document.getElementById('watts').value);

    // Parse time and split into total seconds
    const parseTime = (timeStr) => {
        const timeParts = timeStr.split(':');
        if (timeParts.length === 2) {
            const minutes = parseInt(timeParts[0]);
            const seconds = parseFloat(timeParts[1]);
            return minutes * 60 + seconds;
        }
        return null;
    };

    // Convert seconds back to mm:ss.ms
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = (totalSeconds % 60).toFixed(1);
        return `${minutes}:${seconds.padStart(4, '0')}`;
    };

    // Calculate Watts based on Split
    const calculateWattsFromSplit = (splitSeconds) => {
        // Calculate watts from split (per 500 meters)
        return 2.8 / Math.pow(splitSeconds / 500, 3);
    };

    // Reverse Calculate Split from Watts
    const calculateSplitFromWatts = (wattsValue) => {
        // Calculate split in seconds from watts
        return 500 * Math.pow(2.8 / wattsValue, 1 / 3);
    };

    let result = '';
    let wattsCalculated = 0;

    // Calculate Split if Time and Distance are provided
    if (distance && time) {
        const totalTime = parseTime(time);
        if (isNaN(totalTime)) {
            alert('Invalid time format. Use mm:ss.ms.');
            return;
        }
        const splitSeconds = (totalTime / distance) * 500;
        wattsCalculated = calculateWattsFromSplit(splitSeconds); // Calculate Watts from Split
        result = `Split: ${formatTime(splitSeconds)} per 500m`;

    } 
    // Calculate Time if Distance and Split are provided
    else if (distance && split) {
        const splitSeconds = parseTime(split);
        if (isNaN(splitSeconds)) {
            alert('Invalid split format. Use mm:ss.ms.');
            return;
        }
        const totalTime = (splitSeconds * distance) / 500;
        wattsCalculated = calculateWattsFromSplit(splitSeconds); // Calculate Watts from Split
        result = `Time: ${formatTime(totalTime)}`;

    }
    // Calculate Distance if Time and Split are provided
    else if (time && split) {
        const totalTime = parseTime(time);
        const splitSeconds = parseTime(split);
        if (isNaN(totalTime) || isNaN(splitSeconds)) {
            alert('Invalid time or split format. Use mm:ss.ms.');
            return;
        }
        const distance = (totalTime / splitSeconds) * 500;
        wattsCalculated = calculateWattsFromSplit(splitSeconds); // Calculate Watts from Split
        result = `Distance: ${distance.toFixed(1)} meters`;

    } 
    // Calculate Watts if only Split is provided
    else if (split) {
        const splitSeconds = parseTime(split);
        if (isNaN(splitSeconds)) {
            alert('Invalid split format. Use mm:ss.ms.');
            return;
        }
        wattsCalculated = calculateWattsFromSplit(splitSeconds); // Calculate Watts from Split
        result = `Watts: ${wattsCalculated.toFixed(1)} W`;
    } 
    // Reverse Calculate Split if Watts are provided
    else if (watts) {
        if (isNaN(watts)) {
            alert('Invalid watts value.');
            return;
        }
        const splitSeconds = calculateSplitFromWatts(watts); // Reverse calculate split from watts
        result = `Calculated Split: ${formatTime(splitSeconds)} per 500m`;
    } 
    else {
        alert('Please enter valid values.');
        return;
    }

    // Display result
    document.getElementById('resultOutput').textContent = result;
    document.getElementById('watts').value = wattsCalculated.toFixed(1); // Update Watts field
});

// Clear button functionality
document.getElementById('clearButton').addEventListener('click', function () {
    // Clear all fields and result
    document.getElementById('multiCalculator').reset();
    document.getElementById('resultOutput').textContent = 'Your result will appear here.';
    document.getElementById('watts').value = ''; // Clear watts field
});