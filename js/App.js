class Calculator{
    static operation = ""
    
    constructor(){
        this.operation = ""
        this.finalResult = "a"
        this.operators = {
            "+": (n1, n2)=>n1+n2,
            "-": (n1, n2)=>n1-n2,
            "*": (n1, n2)=>n1*n2,
            "/": (n1, n2)=>n1/n2,
            "(": "priority", 
            ")": "priority"
        } 
    }

    set setFinalResult(r){
        this.finalResult = r
    }

    get solveTheOperation(){
        let orderToSolve = new Map()
        let currentResult = null
        
        //First function, eliminate the parentheses
        // How the parentheses has the bigger order to solve, it will show me how many parentheses has
        function eliminateAllParentheses(expression, operators){
            let parenthesesCount = 0;
            let currentExpression = expression

            for (let i of expression)
                if( i === '(')
                    parenthesesCount++

            // 10+(60*3)/(2+(100/(100*1)))
            for(let i = 2; i < parenthesesCount; i++){
                let toAddRest = false
                let currentExpressionCache = '' 
                let secondCache = ''
                let shortExpression = '' 
                let foundAParentheses = false

                for(let j of currentExpression){
                    if(j === '(' && !toAddRest){
                        shortExpression = ''
                        foundAParentheses = true
                        continue;

                    }else if(toAddRest){
                        currentExpressionCache += j

                    }else if(!foundAParentheses){
                        currentExpressionCache += j 
                        continue;

                    }else if(j !== ')'){
                        shortExpression += j
                        continue;
                        
                    }else{
                        toAddRest = true
                        let toSolveIt = {toSolve: ['', ''], operator: '', firstOrSecondNumber: 'first'}
                        for(let n of shortExpression){
                            if(operators[n]){
                                toSolveIt.operator = n
                                toSolveIt.firstOrSecondNumber = 'second'
                                continue;
                            }
                            
                            if(toSolveIt.firstOrSecondNumber === 'first')
                                toSolveIt.toSolve[0] += n

                            else
                                toSolveIt.toSolve[1] += n
                        }
                        const [n1, n2] = toSolveIt.toSolve
                        currentExpressionCache += operators[toSolveIt.operator](Number(n1), Number(n2))
                    }
                }
                
                currentExpression = currentExpressionCache
                console.log(currentExpression, '\n', currentExpressionCache)
            }

        }

        eliminateAllParentheses(this.operation, this.operators)

    }

    get getFinalResult(){
        return this.finalResult
    }

    set changeOperation(newO){
        this.operation = newO
    } 
}
// 10+(60*3)/(2+(100/(100*1)))
// 100*1 = 100
// 10+60*3/(2+(100/100)) 
// 100/100 = 1
// 10+60*3/(2+1)
// (2+1) = 3
// 10+60*3/3
// 60*3 = 180
// 10+180/3
// 10+60 = 70
// 70


const calculator = new Calculator()
calculator.changeOperation = "10+(60*3)/(2+(100/(100*1)))"

calculator.solveTheOperation

