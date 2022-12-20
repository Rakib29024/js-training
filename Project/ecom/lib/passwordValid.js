const passwordHash = require('password-hash');

module.exports={
    checkPassword:(password, hash, salt)=>{
        return passwordHash.verify(password, hash)
    },

    genPassword:(password)=>{
        hashPassord=passwordHash.generate(password)
        console.log(hashPassord)
        return hashPassord;
    }
}