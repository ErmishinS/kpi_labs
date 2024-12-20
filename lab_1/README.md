
---

<p style="display: flex; justify-content: space-around;">
    <a href="../">Main page</a>
    <a href="../lab_1/">Task 1</a>
    <a href="../lab_2/">Task 2</a>
    <a href="../lab_3/">Task 3</a>
    <a href="../lab_4/">Task 4</a>
    <a href="../lab_5/">Task 5</a>
</p>

---

# Task 1
  * Choose array fn (map/filter/filterMap/some/find/findIndex)
  * Prepare its callback based async counterpart
  * Prepare demo cases for the usage

# JS code
```javascript
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

```

# Testing program

### Test 1
<img src="./media/lab_1_test_1.png">

### Test 2
<img src="./media/lab_1_test_2.png">

### Test 3
<img src="./media/lab_1_test_3.png">
