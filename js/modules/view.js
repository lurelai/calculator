export const view = {
    changeOperation(operation, toChange){
        operation.innerText = toChange
    },

    verifyCommaAndChange(operationTAG, operationResult){
        let toChange = ''

        for(let i of operationResult){
            if(i === '.')
                toChange += ','

            else
                toChange += i
        }

        operationTAG.innerText = toChange
    }
}

