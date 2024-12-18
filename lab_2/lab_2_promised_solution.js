const asyncMap = (array, asyncCallback) => {
    const arrayLength = array.length;
    const mappedArray = [];
    let completed = 0;

    return new Promise((resolve, reject) => {
        for (let i = 0; i < arrayLength; i++) {
            asyncCallback(array[i])
                .then(result => {
                    mappedArray[i] = result;
                    completed++;
                    if (completed === arrayLength) {
                        resolve(mappedArray);
                    }
                })
                .catch(err => {
                    console.error(err);
                    mappedArray[i] = undefined;
                    completed++;
                    if (completed === arrayLength) {
                        resolve(mappedArray);
                    }
                });
        }
    });
};

const asyncDouble = (value) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 2500) + 500;
        console.log(`Processing ${value} with delay ${delay}ms`);

        setTimeout(() => {
            if (typeof value !== 'number') {
                reject(new Error('Input must be a number'));
            } else {
                resolve(value * 2);
            }
        }, delay);
    });
};

// Use case
const numbers = [1, 2, 5, 'asdklfjh', 3, 9, 0];
console.log("Original array: ", numbers);

asyncMap(numbers, asyncDouble)
    .then(results => {
        console.log("Promise-based results:", results);
    })
    .catch(err => {
        console.error("Error in Promise-based map:", err);
    });