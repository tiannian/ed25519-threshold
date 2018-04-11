# Threshold Signature for ED25519

## ED25519
### Keypair

- sk = random(0,2^256-1)
- a = clrset(sk)
- pk = scalarbase(a)

### Signature

- Point G
- r = random(0,2^512-1) or H(lf(H(sk)), M)
- R = r * G
- S = (r + H(R, pk, M) * a) mod L
- Signature(M, pk) = (R, S)

### Verify

- S * G = R + H(R, pk, M) * pk

## Simple Multi-Signature
### Keypair

- Sk = { Sk[1], Sk[2], ... Sk[n] }
- Pk = { Pk[1], Pk[2], ... Pk[n] } = { G * Sk[1], G * Sk[2], ... G * Sk[n] }

### Signature

- GPk = sum( Pk )
- r = { r[1], r[2], ... r[n] } = random(0,2^256-1)
- R = { G * r[1], G * r[2], ... G * r[n] }
- GR = sum( R )
- s = { r[1] + H( GPk, GR, M ) * Sk[1], r[2] + H( GPk, GR, M ) * Sk[2], ... r[n] + H( GPk, GR, M ) * Sk[n] }
- GS = sum( s )

### Verify

- S * G = R + H(GPk, GR, M) * GPk
