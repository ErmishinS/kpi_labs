const asyncMap = async (array, asyncCallback) => {
    const mappedArray = [];
    const promises = array.map(async (item, index) => {
        try {
            const result = await asyncCallback(item);
            mappedArray[index] = result;
        } catch (err) {
            console.error(err.message);
            mappedArray[index] = undefined;
        }
    });
    await Promise.all(promises);
    return mappedArray;
};

const asyncDouble = async (value) => {
    const delay = Math.floor(Math.random() * 2500) + 500;
    console.log(`Processing ${value} with delay ${delay}ms`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof value !== 'number') {
                reject(new Error(`${value} is not a number!`));
            } else {
                resolve(value * 2);
            }
        }, delay);
    });
};

const numbers = ['string', 'str', 12345];
console.log("Original array: ", numbers);

async function processWithAsyncAwait() {
    try {
        const results = await asyncMap(numbers, asyncDouble);
        console.log("Async-Await results:", results);
    } catch (err) {
        console.error(err.message);
    }
}

processWithAsyncAwait();