const convert = (str, numRows) => {
    let arrResult = Array(numRows).fill('');
    let direction = true;
    let actualRow = 0;

    for (const chr of str) {
        arrResult[actualRow] += chr;
        if (actualRow === 0) {
            direction = true;
        } else if (actualRow === numRows - 1) {
            direction = false;
        }

        actualRow += direction ? 1 : -1;

        
    }

    return arrResult.join('\n');

};

console.log(convert('PAYPALISHIRING', 3)); // 'PAHNAPLSIIGYIR'