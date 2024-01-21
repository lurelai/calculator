export const operationCompiler = (operation)=>{
    const text = operation.innerText
    const possibleValues = {
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        others: {
            "+": "+",
            "-": "-",
            "X": "*",
            "/": "/",
            "(": "(",
            ")": ")",
        }
    }
    let finalValue = ''

    for(let i of text){
        if(possibleValues.numbers.includes(i))
            finalValue += i

        else
            finalValue += possibleValues.others[i]
    }

    return finalValue
}
