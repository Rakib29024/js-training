// if else statement
var v=10;
if(v==15){
    console.log(15)
}else if(v==2){
    console.log(2)
}
else if(v==8){
    console.log(8)
}
else{
    console.log(v)
}

//switch
switch (v) {
    case 10:
        console.log(1)
        break;
    case 2:
        console.log(2)
        break;

    case 3:
        console.log(2)
        break;

    default:
        console.log(v)
        break;
}

//array  
var arr=[1,2,3,4,5];
// console.log(typeof(arr[2]))
console.log(arr.length)
//task

console.log(arr[0]+arr[2])
//forloop 
var i=0;
for(i;i<arr.length;i++){
    console.log(arr[i])
}
for(var j=0;j<=4;j++){
    arr.push(j);
}

console.log(arr.length)

//foreach 
const obj={
    name:'rakib',
    lname:'hassan'
}
console.log(obj.name);
for (let index = 0; index < obj.length; index++) {
    console.log(obj)
    
}

Object.keys(obj).forEach(val => {
    console.log(val);
});


var i=0;
while(1){
    console.log(i)
    i++;
}

for(;;){
    console.log('1')

}