const promisify = require('util.promisify')
const tape = require('tape')
// const { parallel } = require('async')
const util = require('ethereumjs-util')
var abi = require('ethereumjs-abi')
// const Common = require('ethereumjs-common').default
const { OVMStateManager } = require('../../../dist/state')
const stateManagerAbi = require('./StateManagerABI.json')
const { createAccount } = require('../utils')
const VM = require('../../../dist/index').default
// const { isRunningInKarma } = require('../../util')

async function getAccountNonce(vm, accountPrivateKey) {
  const account = (await promisify(vm.stateManager.getAccount.bind(vm.stateManager))(
    util.privateToAddress(accountPrivateKey),
  ))
  return account.nonce
}
tape('OVM State Dump', async (t) => {
  t.test('should load in dump correctly', async (st) => {
    const vm = new VM()
    await vm.initOVM()
    st.ok(vm.stateManager)
    const emCode = await vm.pStateManager.getContractCode(Buffer.from('00000000000000000000000000000000dead0000','hex'))
    st.equal(emCode.length, 15053, 'has exec manager code at 0x0...dead0000')
    const smCode = await vm.pStateManager.getContractCode(Buffer.from('00000000000000000000000000000000dead0001','hex'))
    st.equal(smCode.length, 2731, 'has state manager code at 0x0...dead0001')
    // st.deepEqual(vm.stateManager._trie.root, util.KECCAK256_RLP, 'it has default trie')
    st.end()
  })
})
// tape('OVMStateManager', t => {
//   t.test('should instantiate', st => {
//     const stateManager = new OVMStateManager()

//     // st.deepEqual(stateManager._trie.root, util.KECCAK256_RLP, 'it has default root')
//     // st.equal(stateManager._common.hardfork(), 'petersburg', 'it has default hardfork')
//     // stateManager.getStateRoot((err, res) => {
//     //   st.error(err, 'getStateRoot returns no error')
//     //   st.deepEqual(res, util.KECCAK256_RLP, 'it has default root')
//     //   st.end()
//     // })
//     st.end()
//   })
//   t.test('should set and get storage', async st => {
//     const vm = new VM()
//     const psm = new PStateManager(vm.stateManager)
//     // const stateManager = new OVMStateManager()
//     // const putContractStorage = promisify((...args) => stateManager.putContractStorage(...args))
//     // const getContractStorage = promisify((...args) => stateManager.getContractStorage(...args))

//     // const addressBuffer = Buffer.from('a94f5374fce5edbc8e2a8697c15331677e6ebf0b', 'hex')
//     // const key = util.toBuffer('0x1234567890123456789012345678901234567890123456789012345678901234')
//     // console.log('key',key)
//     // console.log('other key', Buffer.from('0x1234567890123456789012345678901234567890123456789012345678901234', 'hex'))
//     // const value = Buffer.from('0x1234')
//     // await putContractStorage(addressBuffer, key, value)
//     // const contract0 = await getContractStorage(addressBuffer, key)
//     // st.equal(
//     //   contract0.toString('hex'),
//     //   value.toString('hex'),
//     //   "contract key's value is set in the _storageTries cache",
//     // )
//     // const eei = new EEI(env, state, evm: EVM, common: Common, gasLeft: BN) 
//     const accountPk = new Buffer(
//       'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109',
//       'hex',
//     )

//     const accountAddress = util.privateToAddress(accountPk)

//     console.log('Account:', util.bufferToHex(accountAddress))

//     const account = new Account({ balance: 1e18 })

//     await promisify(vm.stateManager.putAccount.bind(vm.stateManager))(accountAddress, account)

//     const address = '0x' + '11'.repeat(20)
//     const contractAddresss = '0x' + '12'.repeat(20)
//     const key = '0x' + '22'.repeat(32)
//     const value = '0x' + '33'.repeat(32)

//     const params = abi.rawEncode(['address', 'bytes32', 'bytes32'], [ address, key, value ])
//     const data = '0x' + abi.methodID('setStorage', ['address', 'bytes32', 'bytes32']).toString('hex') + params.toString('hex')
//     console.log('encoded', data)
//     // const tx = new Transaction({
//     //   to: contractAddress,
//     //   value: 0,
//     //   gasLimit: 2000000, // We assume that 2M is enough,
//     //   gasPrice: 1,
//     //   data,
//     //   nonce: await getAccountNonce(vm, senderPrivateKey),
//     // })
  
//     // tx.sign(senderPrivateKey)
  
//     // const setGreetingResult = await vm.runTx({ tx })
//     st.end()
//   })

  // func TestSloadAndStore(t *testing.T) {
  //   rawStateManagerAbi, _ := ioutil.ReadFile("./StateManagerABI.json")
  //   stateManagerAbi, _ := abi.JSON(strings.NewReader(string(rawStateManagerAbi)))
  //   state := newState()
  
  //   address := common.HexToAddress("9999999999999999999999999999999999999999")
  //   key := [32]byte{}
  //   value := [32]byte{}
  //   copy(key[:], []byte("hello"))
  //   copy(value[:], []byte("world"))
  
  //   storeCalldata, _ := stateManagerAbi.Pack("setStorage", address, key, value)
  //   getCalldata, _ := stateManagerAbi.Pack("getStorage", address, key)
  
  //   call(t, state, vm.StateManagerAddress, storeCalldata)
  //   getStorageReturnValue, _ := call(t, state, vm.StateManagerAddress, getCalldata)
  
  //   if !bytes.Equal(value[:], getStorageReturnValue) {
  //     t.Errorf("Expected %020x; got %020x", value[:], getStorageReturnValue)
  //   }
  // }

//   t.test('should clear the cache when the state root is set', async st => {
//     const stateManager = new StateManager()
//     const addressBuffer = Buffer.from('a94f5374fce5edbc8e2a8697c15331677e6ebf0b', 'hex')
//     const account = createAccount()

//     const getStateRoot = promisify((...args) => stateManager.getStateRoot(...args))
//     const checkpoint = promisify((...args) => stateManager.checkpoint(...args))
//     const putAccount = promisify((...args) => stateManager.putAccount(...args))
//     const getAccount = promisify((...args) => stateManager.getAccount(...args))
//     const commit = promisify((...args) => stateManager.commit(...args))
//     const setStateRoot = promisify((...args) => stateManager.setStateRoot(...args))
//     const putContractStorage = promisify((...args) => stateManager.putContractStorage(...args))
//     const getContractStorage = promisify((...args) => stateManager.getContractStorage(...args))

//     // test account storage cache
//     const initialStateRoot = await getStateRoot()
//     await checkpoint()
//     await putAccount(addressBuffer, account)

//     const account0 = await getAccount(addressBuffer)
//     st.equal(
//       account0.balance.toString('hex'),
//       account.balance.toString('hex'),
//       'account value is set in the cache',
//     )

//     await commit()
//     const account1 = await getAccount(addressBuffer)
//     st.equal(
//       account1.balance.toString('hex'),
//       account.balance.toString('hex'),
//       'account value is set in the state trie',
//     )

//     await setStateRoot(initialStateRoot)
//     const account2 = await getAccount(addressBuffer)
//     st.equal(
//       account2.balance.toString('hex'),
//       '',
//       'account value is set to 0 in original state root',
//     )

//     // test contract storage cache
//     await checkpoint()
//     const key = util.toBuffer('0x1234567890123456789012345678901234567890123456789012345678901234')
//     const value = Buffer.from('0x1234')
//     await putContractStorage(addressBuffer, key, value)

//     const contract0 = await getContractStorage(addressBuffer, key)
//     st.equal(
//       contract0.toString('hex'),
//       value.toString('hex'),
//       "contract key's value is set in the _storageTries cache",
//     )

//     await commit()
//     await setStateRoot(initialStateRoot)
//     const contract1 = await getContractStorage(addressBuffer, key)
//     st.equal(
//       contract1.toString('hex'),
//       '',
//       "contract key's value is unset in the _storageTries cache",
//     )

//     st.end()
//   })

  // t.test(
  //   'should put and get account, and add to the underlying cache if the account is not found',
  //   async st => {
  //     const stateManager = new OVMStateManager()
  //     const account = createAccount()

  //     await promisify(stateManager.putAccount.bind(stateManager))(
  //       'a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
  //       account,
  //     )

  //     let res = await promisify(stateManager.getAccount.bind(stateManager))(
  //       'a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
  //     )

  //     st.equal(res.balance.toString('hex'), 'fff384')

  //     stateManager._cache.clear()

  //     res = await promisify(stateManager.getAccount.bind(stateManager))(
  //       'a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
  //     )

  //     st.equal(stateManager._cache._cache.keys[0], 'a94f5374fce5edbc8e2a8697c15331677e6ebf0b')

  //     st.end()
  //   },
  // )

//   t.test(
//     'should call the callback with a boolean representing emptiness, when the account is empty',
//     async st => {
//       const stateManager = new StateManager()

//       const promisifiedAccountIsEmpty = promisify(
//         stateManager.accountIsEmpty.bind(stateManager),
//         function(err, result) {
//           return err || result
//         },
//       )
//       let res = await promisifiedAccountIsEmpty('a94f5374fce5edbc8e2a8697c15331677e6ebf0b')

//       st.ok(res)

//       st.end()
//     },
//   )

//   t.test(
//     'should call the callback with a false boolean representing non-emptiness when the account is not empty',
//     async st => {
//       const stateManager = new StateManager()
//       const account = createAccount('0x1', '0x1')

//       await promisify(stateManager.putAccount.bind(stateManager))(
//         'a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
//         account,
//       )

//       const promisifiedAccountIsEmpty = promisify(
//         stateManager.accountIsEmpty.bind(stateManager),
//         function(err, result) {
//           return err || result
//         },
//       )
//       let res = await promisifiedAccountIsEmpty('a94f5374fce5edbc8e2a8697c15331677e6ebf0b')

//       st.notOk(res)

//       st.end()
//     },
//   )

//   t.test('should generate the genesis state root correctly for mainnet', async st => {
//     if (isRunningInKarma()) {
//       st.skip('skip slow test when running in karma')
//       return st.end()
//     }

//     parallel([
//       async () => {
//         // 1. Test generating from ethereum/tests
//         const genesisData = require('ethereumjs-testing').getSingleFile(
//           'BasicTests/genesishashestest.json',
//         )
//         const stateManager = new StateManager()

//         const generateCanonicalGenesis = promisify((...args) =>
//           stateManager.generateCanonicalGenesis(...args),
//         )
//         const getStateRoot = promisify((...args) => stateManager.getStateRoot(...args))

//         await generateCanonicalGenesis()
//         let stateRoot = await getStateRoot()
//         st.equals(
//           stateRoot.toString('hex'),
//           genesisData.genesis_state_root,
//           'generateCanonicalGenesis should produce correct state root for mainnet from ethereum/tests data',
//         )
//       },
//       async () => {
//         // 2. Test generating from common
//         const common = new Common('mainnet', 'petersburg')
//         const expectedStateRoot = Buffer.from(common.genesis().stateRoot.slice(2), 'hex')
//         const stateManager = new StateManager({ common: common })

//         const generateCanonicalGenesis = promisify((...args) =>
//           stateManager.generateCanonicalGenesis(...args),
//         )
//         const getStateRoot = promisify((...args) => stateManager.getStateRoot(...args))

//         await generateCanonicalGenesis()
//         let stateRoot = await getStateRoot()

//         st.true(
//           stateRoot.equals(expectedStateRoot),
//           `generateCanonicalGenesis should produce correct state root for mainnet from common`,
//         )
//       },
//       () => {
//         st.end()
//       },
//     ])
//   })

//   t.test('should generate the genesis state root correctly for all other chains', async st => {
//     const chains = ['ropsten', 'rinkeby', 'kovan', 'goerli']
//     for (const chain of chains) {
//       const common = new Common(chain, 'petersburg')
//       const expectedStateRoot = Buffer.from(common.genesis().stateRoot.slice(2), 'hex')
//       const stateManager = new StateManager({ common: common })

//       const generateCanonicalGenesis = promisify((...args) =>
//         stateManager.generateCanonicalGenesis(...args),
//       )
//       const getStateRoot = promisify((...args) => stateManager.getStateRoot(...args))

//       await generateCanonicalGenesis()
//       let stateRoot = await getStateRoot()

//       st.true(
//         stateRoot.equals(expectedStateRoot),
//         `generateCanonicalGenesis should produce correct state root for ${chain}`,
//       )
//     }

//     st.end()
//   })

//   t.test('should dump storage', async st => {
//     const stateManager = new StateManager()
//     const addressBuffer = Buffer.from('a94f5374fce5edbc8e2a8697c15331677e6ebf0b', 'hex')
//     const account = createAccount()

//     const putContractStorage = promisify((...args) => stateManager.putContractStorage(...args))

//     await promisify(stateManager.putAccount.bind(stateManager))(
//       'a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
//       account,
//     )

//     const key = util.toBuffer('0x1234567890123456789012345678901234567890123456789012345678901234')
//     const value = util.toBuffer('0x0a') // We used this value as its RLP encoding is also 0a
//     await putContractStorage(addressBuffer, key, value)

//     stateManager.dumpStorage(addressBuffer, data => {
//       const expect = { [util.keccak256(key).toString('hex')]: '0a' }
//       st.deepEqual(data, expect, 'should dump storage value')

//       st.end()
//     })
//   })

//   t.test('should pass Common object when copying the state manager', st => {
//     const stateManager = new StateManager({
//       common: new Common('goerli', 'byzantium'),
//     })

//     st.equal(stateManager._common.chainName(), 'goerli')
//     st.equal(stateManager._common.hardfork(), 'byzantium')

//     const stateManagerCopy = stateManager.copy()
//     st.equal(stateManagerCopy._common.chainName(), 'goerli')
//     st.equal(stateManagerCopy._common.hardfork(), 'byzantium')

//     st.end()
//   })

//   t.test("should validate the key's length when modifying a contract's storage", async st => {
//     const stateManager = new StateManager()
//     const addressBuffer = Buffer.from('a94f5374fce5edbc8e2a8697c15331677e6ebf0b', 'hex')
//     const putContractStorage = promisify((...args) => stateManager.putContractStorage(...args))
//     try {
//       await putContractStorage(addressBuffer, Buffer.alloc(12), util.toBuffer('0x1231'))
//     } catch (e) {
//       st.equal(e.message, 'Storage key must be 32 bytes long')
//       st.end()
//       return
//     }

//     st.fail('Should have failed')
//     st.end()
//   })

//   t.test("should validate the key's length when reading a contract's storage", async st => {
//     const stateManager = new StateManager()
//     const addressBuffer = Buffer.from('a94f5374fce5edbc8e2a8697c15331677e6ebf0b', 'hex')
//     const getContractStorage = promisify((...args) => stateManager.getContractStorage(...args))
//     try {
//       await getContractStorage(addressBuffer, Buffer.alloc(12))
//     } catch (e) {
//       st.equal(e.message, 'Storage key must be 32 bytes long')
//       st.end()
//       return
//     }

//     st.fail('Should have failed')
//     st.end()
//   })
// })

// tape('Original storage cache', async t => {
//   const stateManager = new StateManager()

//   const putAccount = promisify(stateManager.putAccount.bind(stateManager))
//   const putContractStorage = promisify(stateManager.putContractStorage.bind(stateManager))
//   const getContractStorage = promisify(stateManager.getContractStorage.bind(stateManager))
//   const getOriginalContractStorage = promisify(
//     stateManager.getOriginalContractStorage.bind(stateManager),
//   )

//   const address = 'a94f5374fce5edbc8e2a8697c15331677e6ebf0b'
//   const addressBuffer = Buffer.from(address, 'hex')
//   const account = createAccount()
//   await putAccount(address, account)

//   const key = Buffer.from('1234567890123456789012345678901234567890123456789012345678901234', 'hex')
//   const value = Buffer.from('1234', 'hex')

//   t.test('should initially have empty storage value', async st => {
//     const res = await getContractStorage(addressBuffer, key)
//     st.deepEqual(res, Buffer.alloc(0))

//     const origRes = await getOriginalContractStorage(addressBuffer, key)
//     st.deepEqual(origRes, Buffer.alloc(0))

//     stateManager._clearOriginalStorageCache()

//     st.end()
//   })

//   t.test('should set original storage value', async st => {
//     await putContractStorage(addressBuffer, key, value)
//     const res = await getContractStorage(addressBuffer, key)
//     st.deepEqual(res, value)

//     st.end()
//   })

//   t.test('should get original storage value', async st => {
//     const res = await getOriginalContractStorage(addressBuffer, key)
//     st.deepEqual(res, value)
//     st.end()
//   })

//   t.test('should return correct original value after modification', async st => {
//     const newValue = Buffer.from('1235', 'hex')
//     await putContractStorage(addressBuffer, key, newValue)
//     const res = await getContractStorage(addressBuffer, key)
//     st.deepEqual(res, newValue)

//     const origRes = await getOriginalContractStorage(addressBuffer, key)
//     st.deepEqual(origRes, value)
//     st.end()
//   })

//   t.test('should cache keys separately', async st => {
//     const key2 = Buffer.from(
//       '0000000000000000000000000000000000000000000000000000000000000012',
//       'hex',
//     )
//     const value2 = Buffer.from('12', 'hex')
//     const value3 = Buffer.from('123', 'hex')
//     await putContractStorage(addressBuffer, key2, value2)

//     let res = await getContractStorage(addressBuffer, key2)
//     st.deepEqual(res, value2)
//     let origRes = await getOriginalContractStorage(addressBuffer, key2)
//     st.deepEqual(origRes, value2)

//     await putContractStorage(addressBuffer, key2, value3)

//     res = await getContractStorage(addressBuffer, key2)
//     st.deepEqual(res, value3)
//     origRes = await getOriginalContractStorage(addressBuffer, key2)
//     st.deepEqual(origRes, value2)

//     // Check previous key
//     res = await getContractStorage(addressBuffer, key)
//     st.deepEqual(res, Buffer.from('1235', 'hex'))
//     origRes = await getOriginalContractStorage(addressBuffer, key)
//     st.deepEqual(origRes, value)

//     st.end()
//   })

//   t.test("getOriginalContractStorage should validate the key's length", async st => {
//     try {
//       await getOriginalContractStorage(addressBuffer, Buffer.alloc(12))
//     } catch (e) {
//       st.equal(e.message, 'Storage key must be 32 bytes long')
//       st.end()
//       return
//     }

//     st.fail('Should have failed')
//     st.end()
//   })
// })
