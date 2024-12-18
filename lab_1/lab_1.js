const asyncMap = (array, asyncCallback) => {
    const arrayLength = array.length
    const mappedArray = [];
    let completed = 0;

    for (let i = 0; i < arrayLength; i++) {
        asyncCallback(array[i], (err, result) => {
            if (err) {
                console.error("Error: ", err);
                return;
            }

            mappedArray[i] = result;
            completed++;

            if (completed === array.length) {
                console.log("Final result:", mappedArray);
            }
        });
    }
}

const asyncDouble = (value, cb) => {
    const delay = Math.floor(Math.random() * 2500) + 500;

    console.log(`Processing ${value} with delay ${delay}ms`)

    setTimeout(() => {
        cb(null, value * 2);
    }, delay);
}

const numbers = [1, 2, 3];
console.log("Original array: ", numbers)

asyncMap(numbers, asyncDouble);
