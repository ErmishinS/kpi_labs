const asyncMapBatch = async function* (array, asyncCallback, signal, batchSize = 5) {
    for (let i = 0; i < array.length; i += batchSize) {
        if (signal.aborted) {
            console.error("Task was aborted");
            throw new Error("Task was aborted");
        }

        const batch = array.slice(i, i + batchSize);
        try {
            const results = await asyncCallback(batch);
            console.log(`Batch processed: ${batch} -> ${results}`);
            yield results;
        } catch (err) {
            console.error(`Error processing batch ${batch}: ${err.message}`);
            yield batch.map(() => undefined);
        }
    }
};

const asyncDoubleBatch = async (batch) => {
    const delay = Math.floor(Math.random() * 2000) + 100;
    console.log(`Processing batch with delay ${delay}ms`);
    return Promise.all(
        batch.map(item =>
            new Promise((resolve) => {
                

                setTimeout(() => {
                    if (typeof item !== 'number') {
                        console.error(`${item} is not a number!`);
                        resolve(undefined);
                    } else {
                        resolve(item * 2);
                    }
                }, delay);
            })
        )
    );
};

const numbers = [1, 'some text', 3, 4, 5, 6];
const duplicatedArray = [];
for (let i = 0; i < 5000; i++) {
    duplicatedArray.push(...numbers);
}

async function runTask() {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const cancelTimeout = setTimeout(() => {
        abortController.abort();
    }, 5000);

    try {
        for await (const batchResult of asyncMapBatch(duplicatedArray, asyncDoubleBatch, signal, 5)) {
            console.log("Processed batch result:", batchResult);
        }
    } catch (err) {
        if (signal.aborted) {
            console.error("Processing was aborted.");
        } else {
            console.error(err.message);
        }
    } finally {
        clearTimeout(cancelTimeout);
    }
}

runTask();