const helpers = require('handlebars-helpers')();
const extra={
    ifTwo:(a,b)=>{
        return a==b?"active":"";
    },
    test:function(){
        return "Test";
    }
}
module.exports=Object.assign(extra,helpers);

