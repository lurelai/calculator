class Calculator{
    static operation = ""
    
    constructor(){
        this.operation = ""
        this.finalResult = ""
        this.operations = {
            "+": (n1, n2)=>n1+n2,
            "-": (n1, n2)=>n1-n2,
            "*": (n1, n2)=>n1*n2,
            "/": (n1, n2)=>n1/n2,
        } 
        
        // Calc the final result


    }

    get getFinalResult(){
        return this.finalResult
    }

    set changeOperation(newO){
        this.operation = newO
    } 
}

const calculator = new Calculator()
calculator.changeOperation = "10+60*3/(2+(100/100))"

console.log(calculator.operation, calculator.getFinalResult, calculator.operations['*'](1, 3))//70

