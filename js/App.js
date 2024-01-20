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
                    let quickExpressionCache = ''
                    let finalExpressionCache = ''
                    let foundTheOperator = false
                    let currentOperator = ''
                    let n1 = null
                    let solvedOneExpression = false

                    for(let j of expression){
                        if(operators[j] && !solvedOneExpression){
                            if(foundTheOperator){
                                finalExpressionCache += operators[currentOperator].solve( Number(n1), Number(quickExpressionCache))

                                quickExpressionCache = j

                                solvedOneExpression = true
                                continue;
                            }else if(operators[j].priority > 0){
                                n1 = quickExpressionCache
                                currentOperator = j

                                quickExpressionCache = ''

                                foundTheOperator = true
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
                    let solvedOneExpression = false
                    let foundTheOperator = false
                    let quickExpressionCache = ''
                    let finalExpressionCache = ''
                    let currentOperator = ''
                    let n1 = null


                    for(let j of expression){
                        if(operators[j] && !solvedOneExpression){
                            if(foundTheOperator){
                                finalExpressionCache += operators[currentOperator].solve(Number(n1), Number(quickExpressionCache))
                                quickExpressionCache = j

                                solvedOneExpression = true
                                continue;
                            }else{
                                n1 = quickExpressionCache
                                quickExpressionCache = ''
                                currentOperator = j
                                foundTheOperator = true
                            }
                        }else{
                            quickExpressionCache += j 
                        }
                    }

                    finalExpressionCache += quickExpressionCache
                    expression = finalExpressionCache
                } 
            }

            solveTheRest()

            return expression.trim()
        }

        function solveAllExpressionBetweenAParentheses(expression, operators){
            let howManyParenthesesItHave = 0

            for(let i of expression)
                if(i === '(')
                    howManyParenthesesItHave++
                
            let howManyParenthesesItHaveCache = howManyParenthesesItHave

            for(let i = 0; i < howManyParenthesesItHave; i++){
                let currentParenthesesCount = 0
                let finalExpressionCache = ''
                let currentExpressionCache = ''
                let foundTheParenthesesToWork = false

                for(let j of expression){
                    if(j === '(' && !foundTheParenthesesToWork){
                        currentParenthesesCount++;

                        if(currentParenthesesCount === howManyParenthesesItHaveCache)
                            foundTheParenthesesToWork = true

                        else
                            finalExpressionCache += j

                        continue;
                    }else if(foundTheParenthesesToWork){
                        if(j === ')'){
                            foundTheParenthesesToWork = false

                            finalExpressionCache += solveASimpleExpression(currentExpressionCache+' ', operators)
                            currentParenthesesCount = null;
                            continue;
                        }else
                            currentExpressionCache += j
                    }else{
                        finalExpressionCache += j
                    }
                }

                expression = finalExpressionCache
                howManyParenthesesItHaveCache--;
            }
            return expression.trim()
        }

        const noParentheses = solveAllExpressionBetweenAParentheses("70*((17+3)-10)/(12(-2+2)) ", this.operators)
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

