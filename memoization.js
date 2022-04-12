const fs = require('fs')

function contacts(queries) {
    
    let list = []
    let results = []
    queries.forEach(row => {
        let accion = row[0]
        let value = row[1]

        if (accion === 'add') {
            list.push(value)
        }
        else {
            let count =  findValues(list, value, 0)
            results.push(count)
        }
    })
}

function contactsMemoized(queries) {
    // Write your code here
    let list = []
    let memoization = {}
    let results = []
    let timesMemoized = 0
    queries.forEach(row => {
        let accion = row[0]
        let value = row[1]

        if (accion === 'add') {
            list.push(value)
        }
        else {
            let [index, count] = doMemoization(memoization, value)
            let found = findValues(list, value, index) // find(1) o find(2)
            if(count > 0) timesMemoized++ // counts times memoized
            let result = count + found
            memoization = memorize(memoization, value, list.length, result)
            results.push(result)
        }
    })
    console.log('times memoized', timesMemoized)
    return results
}

function findValues(list, value, startAt) {
    let slice = list.slice(startAt)
    let searches = slice.filter(e => {
        if(e.includes(value)) {
            return true
        }
    })

    return searches.length
}

function doMemoization(dictMemorized, searchValue) {
    let found = dictMemorized.hasOwnProperty(searchValue)
    let index = 0
    let value = 0
    if (found) {
        [index, value] = dictMemorized[searchValue]
    }

    return [index, value]
}

function memorize(dictMemorized, key, value1, value2) {
    dictMemorized[key] = [value1, value2]
    return dictMemorized
}

function run() {
    
    fs.readFile('input02.txt', (err, data) => {
        if (err) throw err;

        // console.log(data.toString());
        let rows = []
        data.toString().split(/\r?\n/).forEach(line => {
            // console.log(`Line from file: ${line}`);
            rows.push(line.split(' '))
        });

        console.log(rows.length)
        rows = contactsMemoized(rows)
        // rows = contacts(rows)
        console.log(rows)
    })

    
}

run();