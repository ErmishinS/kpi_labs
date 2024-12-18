# Task 2
  * Prepare promise based alternative
  * Write use cases for the promise based solution
  * Write use cases for the async-await
  * Add new on-demend feature during review
    e.g.: Add support for parallelism


# Code for promise based solution
```js
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



const numbers = [1, 2, 5, 'asdklfjh', 3, 9, 0];
console.log("Original array: ", numbers);

asyncMap(numbers, asyncDouble)
    .then(results => {
        console.log("Promise-based results:", results);
    })
    .catch(err => {
        console.error("Error in Promise-based map:", err);
    });
```

# Testing program

### Test 1
<img src="./media/lab_2_promise_solution_test_1.png">

### Test 2
<img src="./media/lab_2_promise_solution_test_2.png">


# Code for async-await solution
```js
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


const numbers = [1.1, 'qwerty', 26];
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
```

# Testing program

### Test 1
<img src="./media/lab_2_async_await_solution_test_1.png">

### Test 2
<img src="./media/lab_2_async_await_solution_test_2.png">

### Test 3
<img src="./media/lab_2_async_await_solution_test_3.png">


# Code for "with parallelism"
```js
const asyncMap = async (array, asyncCallback) => {
    const mappedArray = [];
    const promises = array.map(async (item, index) => {
        try {
            const result = await asyncCallback(item);
            mappedArray[index] = result;
        } catch (err) {
            console.error(err);
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
                reject(new Error('Input must be a number'));
            } else {
                resolve(value * 2);
            }
        }, delay);
    });
};

const numbers = [52, 2626, 1, 0, 5];
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
```

# Testing program

### Test 1
<img src="./media/lab_2_solution_with_parallelism_test_1.png">

### Test 2
<img src="./media/lab_2_solution_with_parallelism_test_2.png">
