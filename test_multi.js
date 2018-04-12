let multi = require('./multi.js')
let nacl = require('./lib/nacl.js')

function p (arr) {
    // for (let x of arr) {
    //     console.log(','+x.toString(16))
    // }
    console.log(arr.toString())
}

let pk = nacl.sign.keyPair().publicKey
p(pk)

let pks = []

for (let x = 0 ; x != 10 ; x ++) {
    pks.push(nacl.sign.keyPair().publicKey)
}

let gpk = multi.crypto_multi_add_key(pk,pks)
p(gpk)

