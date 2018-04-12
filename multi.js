let nacl = require('./lib/nacl.js')

function crypto_multi_point_add(pk,keyarr) {
    let key = new Uint8Array(32);
    let p = [nacl.lowlevel.crypto_sign_op_gf(),
        nacl.lowlevel.crypto_sign_op_gf(),
        nacl.lowlevel.crypto_sign_op_gf(),
        nacl.lowlevel.crypto_sign_op_gf()];
    let q = [nacl.lowlevel.crypto_sign_op_gf(),
        nacl.lowlevel.crypto_sign_op_gf(),
        nacl.lowlevel.crypto_sign_op_gf(),
        nacl.lowlevel.crypto_sign_op_gf()];
    if(nacl.lowlevel.crypto_sign_op_unpack(p,pk)) return -1;
    for (let x of keyarr) {
        if(nacl.lowlevel.crypto_sign_op_unpack(q,x)) return -1;
        nacl.lowlevel.crypto_sign_op_add(p,q);
    }
    nacl.lowlevel.crypto_sign_op_pack(key,p);
    return key;
}

function crypto_multi_rand(sk,m) {
    let r = new Uint8Array(32);
    nacl.lowlevel.crypto_hash(d, sk, 32);
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;

    let smlen = n + 64;
    for (i = 0; i < n; i++) sm[64 + i] = m[i];
    for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

    nacl.lowlevel.crypto_hash(r, sm.subarray(32), n+32);
    nacl.lowlevel.crypto_sign_op_reduce(r);
    nacl.lowlevel.crypto_sign_op_scalarbase(p, r);
    nacl.lowlevel.crypto_sign_op_pack(sm, p);
    return r;
}

function crypto_multi_sign(m, gr, gpk) {
    let h = new Uint8Array(64), d = new Uint8Array(32);
    let x = new Float64Array(64)
    for (i = 0; i < 64; i++) d[i] = sm[i+32];

    for (i = 0; i < 32; i++) sm[i+32] = gpk[i];
    nacl.lowlevel.crypto_hash(h, sm, n + 64);
    nacl.lowlevel.crypto_sign_op_reduce(h);

    for (i = 0; i < 64; i++) x[i] = 0;
    for (i = 0; i < 32; i++) x[i] = r[i];
    for (i = 0; i < 32; i++) {
        for (j = 0; j < 32; j++) {
            x[i+j] += h[i] * d[j];
        }
    }

}

module.exports = {
    crypto_multi_add_key: crypto_multi_add_key,
}

