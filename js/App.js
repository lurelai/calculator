import { Calculator } from './modules/Calculator.js'
import { view } from './modules/view.js'
import { noticeAllButtons } from './modules/noticeAllButtons.js'

const App = {
    init: ()=>{
        try{
            const operation = document.querySelector('.operation')
            const buttons = document.querySelectorAll('.button')

            for(let button of buttons){
                if(button.attributes.class.value.includes('nothing'))
                    continue;

                button.addEventListener('click', (e)=>{
                    view.changeOperation(operation, noticeAllButtons(button, operation))
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

