export const noticeAllButtons = (button, operation)=>{
    const { innerText: text } = operation
    const lastLetter = text.at(-1)

    const buttonsInfo = {
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        specials: {
            "parentheses": (numbers)=>{
                const operatorsValues = ['+', '-', 'X', '/']
                let openParenthesesCount = 0
                let closeParenthesesCount = 0

                for(let i of text){
                    if(i === '(')
                        openParenthesesCount++

                    if(i === ')')
                        closeParenthesesCount++
                }

                if(lastLetter === ')' && openParenthesesCount - closeParenthesesCount !== 0) 
                    return text+')'

                if(lastLetter === ')' && openParenthesesCount - closeParenthesesCount === 0)
                    return text+'X'+'('

                if(operatorsValues.includes(lastLetter))
                    return text+'('

                if(numbers.includes(lastLetter)){
                    if(openParenthesesCount - closeParenthesesCount === 0)
                        return text+'X'+'('

                    else
                        return text+')'
                }

                if(lastLetter === '(')
                    return text+'('
            },

            "divide": ()=>{ return text + '/' },
            "times": ()=>{ return text + 'X' },
            "plus": ()=>{ return text + '+' },
            "minus": ()=>{ return text + '-' },
            "submit": ()=>{ 
                let openParenthesesCount = 0
                let closeParenthesesCount = 0

                for(let i of text){
                    if(i === '(')
                        openParenthesesCount++

                    if(i === ')')
                        closeParenthesesCount++
                }

                if(openParenthesesCount !== closeParenthesesCount)
                    return text

                else
                    return 'submit'

            },

            "comma": ()=>{ 
                const operatorsValues = ['+', '-', 'X', '/']
                let operatorCount = 0
                let operatorCountCache = 0
                let canAddAComma = true

                for(let i of text)
                    if(operatorsValues.includes(i))
                        operatorCount++ 

                for(let i of text){
                    if(operatorsValues.includes(i))
                        operatorCountCache++;                        
                    
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
        
        else if(lastLetter === ')')
            return text

        else
            return text + button.innerText
    }

    else if(button.id === "parentheses"){
        return buttonsInfo.specials.parentheses(buttonsInfo.numbers)
    }

    else if(button.id === "clear"){
        return '0'
    }

    else{
        if ( buttonsInfo.numbers.includes( lastLetter) || text.at(-1) === ')')
            return buttonsInfo.specials[button.id]()

        else
            return text
    }
} 

