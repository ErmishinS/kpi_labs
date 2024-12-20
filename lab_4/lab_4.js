const asyncMap = async function* (array, asyncCallback, signal) {

    for (const item of array) {
        if (signal.aborted) {
            throw new Error("Task was aborted");
        }

        try {
            const result = await asyncCallback(item, signal);
            yield result;
        } catch (err) {
            console.error(err.message);
            yield undefined;
        }
    }
};

const asyncDouble = async (value, signal) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 2500) + 500;
        console.log(`Processing ${value} with delay ${delay}ms`);

        const timeout = setTimeout(() => {
            if (typeof value !== 'number') {
                reject(new Error(`${value} is not a number!`));
            } else {
                resolve(value * 2);
            }
        }, delay);

        signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            const abortError = new Error(`Operation aborted for value ${value}`)
            abortError.name = 'AbortError'
            reject(abortError);
        });
    });
};

const numbers = [1, 'some text', 3, 4, 5, 6];
const duplicatedArray = [];
for (let i = 0; i < 5000; i++) {
    duplicatedArray.push(...numbers);
}
// console.log("Original array: ", duplicatedArray);

async function runTask() {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timeout = setTimeout(() => abortController.abort(), 10000);

    try {
        for await (const result of asyncMap(duplicatedArray, asyncDouble, signal)) {
            console.log(result);
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            console.error('Processing was aborted.');
        } else {
            console.error(err.message);
        }
    } finally {
        clearTimeout(timeout);
    }
}

runTask();