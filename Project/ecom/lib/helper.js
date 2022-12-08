const helpers = require('handlebars-helpers')();
const extra={
    plusOne:(a,b)=>{
        return a+1000-b;
    }
}
module.exports=Object.assign(extra,helpers);

