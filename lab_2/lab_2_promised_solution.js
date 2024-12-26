const asyncMap = (array, asyncFunction) => {
    const arrayLength = array.length;
    const mappedArray = [];
    let completed = 0;
    let hasError = false;

    return new Promise((resolve, reject) => {
        const actionAfterEachElement = () => {
            completed++;
            if (completed === arrayLength && !hasError) {
                resolve(mappedArray);
            }
        };

        for (let i = 0; i < arrayLength; i++) {
            asyncFunction(array[i])
                .then(result => {
                    mappedArray[i] = result;
                    actionAfterEachElement();
                })
                .catch(err => {
                    mappedArray[i] = undefined;
                    if (!hasError) {
                        hasError = true;
                        reject(err);
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
                reject(new Error(`${value} is not a number!`));
            } else {
                resolve(value * 2);
            }
        }, delay);
    });
};

const numbers = [1, 2, 5, 'ogogog', 3, 9, 0];
console.log("Original array: ", numbers);

asyncMap(numbers, asyncDouble)
    .then(results => {
        console.log("Promise-based results:", results);
    })
    .catch(err => {
        console.error("Error:", err.message);
    });