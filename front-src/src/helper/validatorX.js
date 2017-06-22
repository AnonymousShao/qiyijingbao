export function isValidPassword(input) {
    const hasSmallChar = /[a-z]/
    const hasBigChar = /[A-Z]/
    const hasNum = /\d/
    if(!input) return false
    if(input.length < 6 || input.length > 18) return false
    if(!hasSmallChar.test(input)) return false
    // if(!hasBigChar.test(input)) return false
    if(!hasNum.test(input)) return false
    return true
}