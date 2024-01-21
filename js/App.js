import { Calculator } from './modules/Calculator.js'
import { view } from './modules/view.js'
import { noticeAllButtons } from './modules/noticeAllButtons.js'
import { operationCompiler } from './modules/compiler.js'

const App = {
    init: ()=>{
        try{
            const operation = document.querySelector('.operation')
            const buttons = document.querySelectorAll('.button')
            const calculator = new Calculator

            for(let button of buttons){
                if(button.attributes.class.value.includes('nothing'))
                    continue;

                button.addEventListener('click', (e)=>{
                    const valueToChange = noticeAllButtons(button, operation)

                    if(valueToChange === 'submit'){
                        const operationCompiled = operationCompiler(operation) 
                        calculator.setOperation = operationCompiled

                        const operationResult = calculator.solveTheOperation
                        view.changeOperation(operation, operationResult)
                    }

                    else
                        view.changeOperation(operation, valueToChange)
                })
            }
        }catch(err){
            console.log(err)
        }
    },

    close: ()=>{

    }
}

App.init()

