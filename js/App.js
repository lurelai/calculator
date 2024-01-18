class Calculator{
    static operation = ""
    
    constructor(){
        this.operation = ""
        this.finalResult = "a"
        this.operators = {
            "+": { solve: (n1, n2)=>n1+n2, priority: 0 },
            "-": { solve: (n1, n2)=>n1-n2, priority: 0 },
            "*": { solve: (n1, n2)=>n1*n2, priority: 1 },
            "/": { solve: (n1, n2)=>n1/n2, priority: 1 },
            "(": { priority: 2 },
            ")": { priority: 2 },
            " ": { priority: null} // Show the end of the operation
        } 
    }

    get solveTheOperation(){
        // 20+10*3/3
        function solveASimpleExpression(expression, operators){
            let hightPriorityOrderCount = 0
            let normalPriorityOrderCount = 0
            
            function solveAllExpressionsWithPriorityOrder(){
                for(let i of expression){
                    if(operators[i]){
                        if(operators[i].priority > 0){
                            hightPriorityOrderCount++
                        }else if(operators[i].priority === 0){
                            normalPriorityOrderCount++
                        }
                    }
                }

                for(let i = 0; i < hightPriorityOrderCount; i++){
                    // "20+10/10"
                    let quickExpressionCache = ''
                    let finalExpressionCache = ''
                    let hightPriority = 0
                    let currentOperator = ''
                    let toSolve = []
                    let ended = false

                    for(let j of expression){
                        if(operators[j] && !ended){
                            if(hightPriority === 1){
                                toSolve.push(quickExpressionCache)
                                finalExpressionCache += operators[currentOperator].solve( Number(toSolve[0]), Number(toSolve[1]))
                                quickExpressionCache = j
                                ended = true

                                continue;
                            }else if(operators[j].priority > 0){
                                currentOperator = j
                                toSolve.push(quickExpressionCache)
                                quickExpressionCache = ''

                                hightPriority += 1
                                continue;

                            }else if(operators[j].priority === 0){
                                finalExpressionCache += quickExpressionCache
                                finalExpressionCache += j
                                quickExpressionCache = ''
                            }
                        }else{
                            quickExpressionCache += j;
                        }
                    }
                    finalExpressionCache += quickExpressionCache
                    expression = finalExpressionCache
                }
            }

            solveAllExpressionsWithPriorityOrder()

            function solveTheRest(){
                for(let i = 0; i < normalPriorityOrderCount; i++){
                    let ended = false
                    let quickExpressionCache = ''
                    let finalExpressionCache = ''
                    let currentOperator = ''
                    let toSolve = []

                    for(let j of expression){
                        if(operators[j]){
                            if(ended){
                                toSolve.push(quickExpressionCache)
                                console.log(operators[currentOperator].solve(toSolve[0], 3))
                                console.log(operators[currentOperator].solve(toSolve[0], toSolve[1]))
                                continue;
                            }else{
                                toSolve.push(quickExpressionCache)
                                quickExpressionCache = ''
                                currentOperator = j
                                ended = true
                            }
                        }else{
                            quickExpressionCache += j 
                        }
                    }
                } 
            }

            solveTheRest()

            console.log(expression)
        }

        solveASimpleExpression("10*80+10*4/2*10-100 ", this.operators)
    } 
}

const calculator = new Calculator()
calculator.solveTheOperation

// 10+(60*3)/(2+(100/(100*0+100)))
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

