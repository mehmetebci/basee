//Provides: Base_int_math_int_popcount const
function Base_int_math_int_popcount(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
}

//Provides: Base_clear_caml_backtrace_pos const
function Base_clear_caml_backtrace_pos(x) {
  return 0;
}

//Provides: Base_int_math_int32_clz const
function Base_int_math_int32_clz(x) {
  var n = 32;
  var y;
  y = x >>16; if (y != 0) { n = n -16; x = y; }
  y = x >> 8; if (y != 0) { n = n - 8; x = y; }
  y = x >> 4; if (y != 0) { n = n - 4; x = y; }
  y = x >> 2; if (y != 0) { n = n - 2; x = y; }
  y = x >> 1; if (y != 0) return n - 2;
  return n - x;
}

//Provides: Base_int_math_int_clz const
//Requires: Base_int_math_int32_clz
function Base_int_math_int_clz(x) { return Base_int_math_int32_clz(x); }

//Provides: Base_int_math_nativeint_clz const
//Requires: Base_int_math_int32_clz
function Base_int_math_nativeint_clz(x) { return Base_int_math_int32_clz(x); }

//Provides: Base_int_math_int64_clz const
//Requires: caml_int64_shift_right_unsigned, caml_int64_is_zero, caml_int64_to_int32
function Base_int_math_int64_clz(x) {
  var n = 64;
  var y;
  y = caml_int64_shift_right_unsigned(x, 32);
  if (!caml_int64_is_zero(y)) { n = n -32; x = y; }
  y = caml_int64_shift_right_unsigned(x, 16);
  if (!caml_int64_is_zero(y)) { n = n -16; x = y; }
  y = caml_int64_shift_right_unsigned(x, 8);
  if (!caml_int64_is_zero(y)) { n = n - 8; x = y; }
  y = caml_int64_shift_right_unsigned(x, 4);
  if (!caml_int64_is_zero(y)) { n = n - 4; x = y; }
  y = caml_int64_shift_right_unsigned(x, 2);
  if (!caml_int64_is_zero(y)) { n = n - 2; x = y; }
  y = caml_int64_shift_right_unsigned(x, 1);
  if (!caml_int64_is_zero(y)) return n - 2;
  return n - caml_int64_to_int32(x);
}

//Provides: Base_int_math_int_pow_stub const
function Base_int_math_int_pow_stub(base, exponent) {
  var one = 1;
  var mul = [one, base, one, one];
  var res = one;
  while (!exponent==0) {
    mul[1] = (mul[1] * mul[3]) | 0;
    mul[2] = (mul[1] * mul[1]) | 0;
    mul[3] = (mul[2] * mul[1]) | 0;
    res = (res * mul[exponent & 3]) | 0;
    exponent = exponent >> 2;
  }
  return res;
}

//Provides: Base_int_math_int64_pow_stub const
//Requires: caml_int64_mul, caml_int64_is_zero, caml_int64_shift_right_unsigned
//Requires: caml_int64_create_lo_hi, caml_int64_lo32
function Base_int_math_int64_pow_stub(base, exponent) {
  var one = caml_int64_create_lo_hi(1,0);
  var mul = [one, base, one, one];
  var res = one;
  while (!caml_int64_is_zero(exponent)) {
    mul[1] = caml_int64_mul(mul[1], mul[3]);
    mul[2] = caml_int64_mul(mul[1], mul[1]);
    mul[3] = caml_int64_mul(mul[2], mul[1]);
    res = caml_int64_mul(res, mul[caml_int64_lo32(exponent) & 3]);
    exponent = caml_int64_shift_right_unsigned(exponent, 2);
  }
  return res;
}

//Provides: Base_hash_string mutable
//Requires: caml_hash
function Base_hash_string(s) {
  return caml_hash(1,1,0,s)
}
//Provides: Base_hash_double const
//Requires: caml_hash
function Base_hash_double(d) {
  return caml_hash(1,1,0,d);
}

//Provides: Base_am_testing const
//Weakdef
function Base_am_testing(x) {
  return 0;
}
