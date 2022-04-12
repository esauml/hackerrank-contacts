const fs = require('fs')

function contacts(queries) {
    let list = createListABC()
    let results = []
    queries.forEach(row => {
        let accion = row[0]
        let value = row[1]

        if (accion === 'add') {
            list = addToList(list, value)
        }
        else {
            let subset = list[value.charAt(0)]
            let count =  findValues2(subset, value)
            results.push(count)
        }
    })

    return results
}

function contactsMemoized(queries) {
    // Write your code here
    let list = createListABC()
    let memoization = {}
    let results = []
    let timesMemoized = 0
    queries.forEach(row => {
        let accion = row[0]
        let value = row[1]

        if (accion === 'add') {
            list = addToList(list, value)
        }
        else {
            let [index, count] = doMemoization(memoization, value)
            let subset = list[value.charAt(0)]
            let found = findValues(subset, value, index) // find(1) o find(2)
            if(count > 0) timesMemoized++ // counts times memoized
            let result = count + found
            memoization = memorize(memoization, value, subset.length, result)
            results.push(result)
        }
    })
    console.log('times memoized', timesMemoized)
    return results
}

function createListABC() {
    let dictionary = {}

    for(let a = 97,b = 122;a <= 122;a++,b--){
        let char = String.fromCharCode(a)
        dictionary[char] = []
    }

    return dictionary
}

function addToList(list, element) {
    let char = element.charAt(0);
    list[char].push(element)

    return list
}

function findValues(list, value, startAt) {
    let slice = list.slice(startAt)
    let searches = slice.filter(e => {
        if(e.startsWith(value)) {
            return true
        }
    })

    return searches.length
}

function findValues2(list, value) {
    let searches = list.filter(e => {
        if(e.startsWith(value)) {
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
    
    fs.readFile('input03.txt', (err, data) => {
        if (err) throw err;

        // console.log(data.toString());
        let rows = []
        data.toString().split(/\r?\n/).forEach(line => {
            // console.log(`Line from file: ${line}`);
            rows.push(line.split(' '))
        });

        console.log('file lines: ', rows.length)
        
        // rows = contactsMemoized(rows)
        rows = contacts(rows)

        console.log('input: ', rows.length)
        console.log(rows)


        // testing
        fs.readFile('output03.txt', (err, outputData) => {
            if (err) throw err;

            let output = []
            outputData.toString().split(/\r?\n/).forEach(line => {
                output.push(line)
            })

            console.log('output: ', output.length)

            let ok = true
            for(let i = 0; i < rows.length; i++) {
                let val1 = rows[i];
                let val2 = output[i];
                if(val1 != val2) {
                    // console.log('test not passed on i:', i, 'val1: ', val1, 'val2: ', val2)
                    ok = false
                }
            }

            if(ok) console.log('Tests passed!')
            else console.log('Error tests!')
        })
    })

    
}

run();