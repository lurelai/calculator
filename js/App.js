import { Calculator } from './modules/Calculator.js'
import { view } from './modules/view.js'
import { noticeAllButtons } from './modules/noticeAllButtons.js'

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

                    }

                    else
                        view.changeOperation(operation, valueToChange)
                })
            }

            console.log(calculator)
        }catch(err){
            console.log(err)
        }
    },

    close: ()=>{

    }
}

App.init()

