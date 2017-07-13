export function isValidPassword(input) {
    const hasSmallChar = /[a-z]/
    const hasBigChar = /[A-Z]/
    const hasNum = /\d/
    if(!input) return false
    if(input.length < 6 || input.length > 18) return false
    if(!hasSmallChar.test(input)) return false
    // if(!hasBigChar.test(input)) return false
    return hasNum.test(input)
}

export function bidRuleX(input) {
    input = parseInt(input)
    
    if(input>5000000) return 200000
    if(input>1000000) return 100000
    if(input>500000) return 50000
    if(input>200000) return 20000
    if(input>100000) return 10000
    if(input>50000) return 5000
    if(input>20000) return 2000
    if(input>10000) return 1000
    if(input>5000) return 500
    if(input>2000) return 200
    return 100
}

export function bidRule(input, ruleList) {
    input = parseInt(input)
    if(!ruleList.length || !input) return 0
    for(let i=0;i<ruleList.length;i++){
        if(input < ruleList[i].MaxPrice && input >= ruleList[i].MinPrice){
            return parseInt(ruleList[i].PriceLimit)
        }
    }
}


export function depositRule(input) {
    input = parseInt(input)

    if(input >= 500000) return 0.05 * input
    if(input >= 300000) return 50000
    if(input >= 100000) return 30000
    if(input >= 50000) return 10000
    if(input >= 10000) return 5000
    if(input >= 5000) return 1000
    if(input >= 50000) return 10000
    if(input >= 50000) return 10000
}

export function commissionRule(input) {
    input = parseInt(input)
    
    if(input>=50000) return 0.06
    if(input>=10000) return 0.08
    if(input>=5000) return 0.10
    return 0.12
}