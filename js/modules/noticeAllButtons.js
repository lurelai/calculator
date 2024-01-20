export const noticeAllButtons = (button, operation)=>{
    const { innerText: text } = operation

    const buttonsInfo = {
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        specials: {
            "clear": ()=>{ return "0" },
            "parentheses": (numbers)=>{
            },
            "divide": ()=>{ return text + '/' },
            "times": ()=>{ return text + 'X' },
            "plus": ()=>{ return text + '+' },
            "minus": ()=>{ return text + '-' },
            "submit": ()=>{ return text + '=' },

            "comma": ()=>{ 
                const operatorsValues = ['+', '-', '*', '/']
                let operatorCount = 0
                let operatorCountCache = 0
                let canAddAComma = true

                for(let i of text)
                    if(operatorsValues.includes(i))
                        operatorCount++ 

                for(let i of text){
                    if(operatorsValues.includes(i))
                        operatorCountCache++;                        
                    
                    console.log(operatorCountCache, operatorCount)
                    if(operatorCountCache === operatorCount)
                        if(i === ',')
                            canAddAComma = false;

                }

                if(canAddAComma)
                    return text + ","

                else
                    return text
            }
        }
    }

    if(buttonsInfo.numbers.includes(button.innerText)){
        if(text === '0')
            return button.innerText
        else
            return text + button.innerText
    }

    else if(button.id === "parentheses"){
        console.log(true)
    }

    else{
        if ( buttonsInfo.numbers.includes( text.at(-1) ))
            return buttonsInfo.specials[button.id]()

        else
            return text
    }
} 

