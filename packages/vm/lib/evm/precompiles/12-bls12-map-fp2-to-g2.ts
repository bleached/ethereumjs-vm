import BN = require('bn.js')
import { PrecompileInput } from './types'
import { VmErrorResult, ExecResult } from '../evm'
import { ERROR, VmError } from '../../exceptions'
const assert = require('assert')
const { BLS12_381_ToFp2Point, BLS12_381_FromG2Point } = require('./util/bls12_381')

export default async function (opts: PrecompileInput): Promise<ExecResult> {
  assert(opts.data)

  const mcl = opts._VM._mcl

  let inputData = opts.data

  // note: the gas used is constant; even if the input is incorrect.
  let gasUsed = new BN(opts._common.param('gasPrices', 'Bls12381MapG2Gas'))

  if (inputData.length != 128) {
    return VmErrorResult(new VmError(ERROR.BLS_12_381_INVALID_INPUT_LENGTH), gasUsed)
  }

  // check if some parts of input are zero bytes.
  const zeroBytes16 = Buffer.alloc(16, 0)
  const zeroByteCheck = [
    [0, 16],
    [64, 80],
  ]

  for (let index in zeroByteCheck) {
    let slicedBuffer = opts.data.slice(zeroByteCheck[index][0], zeroByteCheck[index][1])
    if (!slicedBuffer.equals(zeroBytes16)) {
      return VmErrorResult(new VmError(ERROR.BLS_12_381_POINT_NOT_ON_CURVE), gasUsed)
    }
  }

  // convert input to mcl Fp2 point

  const Fp2Point = BLS12_381_ToFp2Point(opts.data.slice(0, 64), opts.data.slice(64, 128), mcl)

  // map it to G2
  const result = Fp2Point.mapToG2()

  const returnValue = BLS12_381_FromG2Point(result)

  return {
    gasUsed,
    returnValue: returnValue,
  }
}
