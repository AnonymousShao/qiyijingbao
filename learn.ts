enum Action{
    add, all, v, d, dsf
}

let key1 = Symbol('key')
let key2 = Symbol('key')


console.log(key1,key2)

function a(): number|string|null {
    return null
}

let arr: string[]|number[] = ['1', '2']
console.log(arr)

let li: Array<string|number> = ['a']

li.push(3)
console.log(li)

class Person {
    talk(): string{
        return 'a'
    }
}


class Dog {
    bark(): string{
        return 'www'
    }
}

function extend<T, U>(first: T, second: U): T & U{
    let result = <T & U>{};
    for(let func of Object.getOwnPropertyNames(Object.getPrototypeOf(first))){
        (<any>result)[func] = (<any>first)[func]
    }
    for(let func of Object.getOwnPropertyNames(Object.getPrototypeOf(second))){
        (<any>result)[func] = (<any>second)[func]
    }
    return result
}

let personDog = extend(new Person(), new Dog())

console.log(personDog.bark())

let test: any = 123
let str: string = test as string;
let str2: string = <string>test;
console.log(str)

type newstring = string
let st: newstring = 'asfd'
console.log(st.length)

interface Square {
    color?: string;
    width?: number;
}

function createSquare(config: Square){
    return 3
}


