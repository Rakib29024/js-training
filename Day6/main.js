// var {add,sum} =require('./functionList.js');


// console.log(sum()+' '+add)

// problem

var n=0;
var n1=1;
console.log(n+"\n"+n1+"");
function sum(number){
    for( var i=2;i<number;i++){
        var n3=n+n1;
        console.log(n3);
        n=n3;
        n1=n3;
    }
}
sum(4);