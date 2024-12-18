const asyncMap = async (array, asyncCallback) => {
    const mappedArray = [];
    for (let i = 0; i < array.length; i++) {
        try {
            const result = await asyncCallback(array[i]);
            mappedArray[i] = result;
        } catch (err) {
            console.error(err);
            mappedArray[i] = undefined;
        }
    }
    return mappedArray;
};

const asyncDouble = async (value) => {
    const delay = Math.floor(Math.random() * 2500) + 500;
    console.log(`Processing ${value} with delay ${delay}ms`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof value !== 'number') {
                reject(new Error('Input must be a number'));
            } else {
                resolve(value * 2);
            }
        }, delay);
    });
};


const numbers = [1.1, 5.5, 26];
console.log("Original array: ", numbers);

async function processWithAsyncAwait() {
    try {
        const results = await asyncMap(numbers, asyncDouble);
        console.log("Async-Await results:", results);
    } catch (err) {
        console.error(err);
    }
}

processWithAsyncAwait();