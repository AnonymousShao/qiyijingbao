var Action;
(function (Action) {
    Action[Action["add"] = 0] = "add";
    Action[Action["all"] = 1] = "all";
    Action[Action["v"] = 2] = "v";
    Action[Action["d"] = 3] = "d";
    Action[Action["dsf"] = 4] = "dsf";
})(Action || (Action = {}));
var key1 = Symbol('key');
var key2 = Symbol('key');
console.log(key1, key2);
function a() {
    return null;
}
var arr = ['1', '2'];
console.log(arr);
var li = ['a'];
li.push(3);
console.log(li);
var Person = (function () {
    function Person() {
    }
    Person.prototype.talk = function () {
        return 'a';
    };
    return Person;
}());
var Dog = (function () {
    function Dog() {
    }
    Dog.prototype.bark = function () {
        return 'www';
    };
    return Dog;
}());
function extend(first, second) {
    var result = {};
    for (var _i = 0, _a = Object.getOwnPropertyNames(Object.getPrototypeOf(first)); _i < _a.length; _i++) {
        var func = _a[_i];
        result[func] = first[func];
    }
    for (var _b = 0, _c = Object.getOwnPropertyNames(Object.getPrototypeOf(second)); _b < _c.length; _b++) {
        var func = _c[_b];
        result[func] = second[func];
    }
    return result;
}
var personDog = extend(new Person(), new Dog());
console.log(personDog.bark());
var test = 123;
var str = test;
var str2 = test;
console.log(str);
var st = 'asfd';
console.log(st.length);
function createSquare(config) {
    return 3;
}
