# ethereumjs-ovm

Implements Optimism's OVM in Javascript. Forked with <3 from `ethereumjs-vm`!

## Logging

This fork provides some custom logging tools for introspecting the OVM via the `debug` package. Particularly, the environment variable `DEBUG='ethjs-ovm:interpreter` will allow you to log various degrees of internal EVM execution such as calls, stack, and memory.
You must also add `DEBUG_OVM=true` to enable debugging.
The logging namespace includes the start and ending bytes of the address and the call depth (e.g. `js-ovm:intrp:0xdeadde..ad0005:d5`)

Available namespaces are:

- All OVM debug logging (warning, lots of logs): `DEBUG='*'`
- Call logging: `DEBUG='*:calls` (recommended to run first)
- Step logging: `DEBUG='*:calls:steps` (recommended to run filtered by address, e.g. `DEBUG='*:calls,js-ovm:intrp:0xdeadde..ad0005:d2:calls:steps'`)
- Memory logging: `DEBUG=*:calls:memory` (recommended to run filtered by address, see above)

Or mix and match any of the above to get your desired logging level.

# LICENSE

[MIT](https://opensource.org/licenses/MIT)

[coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/branch/master/graph/badge.svg
[coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-vm
[gitter-badge]: https://img.shields.io/gitter/room/ethereum/ethereumjs.svg
[gitter-link]: https://gitter.im/ethereum/ethereumjs
[stackexchange-badge]: https://img.shields.io/badge/ethereumjs-stackexchange-brightgreen
[stackexchange-link]: https://ethereum.stackexchange.com/questions/tagged/ethereumjs
[js-standard-style-badge]: https://cdn.rawgit.com/feross/standard/master/badge.svg
[js-standard-style-link]: https://github.com/feross/standard
[account-package]: ./packages/account
[account-npm-badge]: https://img.shields.io/npm/v/@ethereumjs/account.svg
[account-npm-link]: https://www.npmjs.com/package/@ethereumjs/account
[account-issues-badge]: https://img.shields.io/github/issues/ethereumjs/ethereumjs-vm/package:%20account?label=issues
[account-issues-link]: https://github.com/ethereumjs/ethereumjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+account"
[account-actions-badge]: https://github.com/ethereumjs/ethereumjs-vm/workflows/Account/badge.svg
[account-actions-link]: https://github.com/ethereumjs/ethereumjs-vm/actions?query=workflow%3A%22Account%22
[account-coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/branch/master/graph/badge.svg?flag=account
[account-coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/tree/master/packages/account
[block-package]: ./packages/block
[block-npm-badge]: https://img.shields.io/npm/v/@ethereumjs/block.svg
[block-npm-link]: https://www.npmjs.com/package/@ethereumjs/block
[block-issues-badge]: https://img.shields.io/github/issues/ethereumjs/ethereumjs-vm/package:%20block?label=issues
[block-issues-link]: https://github.com/ethereumjs/ethereumjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+block"
[block-actions-badge]: https://github.com/ethereumjs/ethereumjs-vm/workflows/Block/badge.svg
[block-actions-link]: https://github.com/ethereumjs/ethereumjs-vm/actions?query=workflow%3A%22Block%22
[block-coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/branch/master/graph/badge.svg?flag=block
[block-coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/tree/master/packages/block
[blockchain-package]: ./packages/blockchain
[blockchain-npm-badge]: https://img.shields.io/npm/v/@ethereumjs/blockchain.svg
[blockchain-npm-link]: https://www.npmjs.com/package/@ethereumjs/blockchain
[blockchain-issues-badge]: https://img.shields.io/github/issues/ethereumjs/ethereumjs-vm/package:%20blockchain?label=issues
[blockchain-issues-link]: https://github.com/ethereumjs/ethereumjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+blockchain"
[blockchain-actions-badge]: https://github.com/ethereumjs/ethereumjs-vm/workflows/Blockchain/badge.svg
[blockchain-actions-link]: https://github.com/ethereumjs/ethereumjs-vm/actions?query=workflow%3A%22Blockchain%22
[blockchain-coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/branch/master/graph/badge.svg?flag=blockchain
[blockchain-coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/tree/master/packages/blockchain
[common-package]: ./packages/common
[common-npm-badge]: https://img.shields.io/npm/v/@ethereumjs/common.svg
[common-npm-link]: https://www.npmjs.com/package/@ethereumjs/common
[common-issues-badge]: https://img.shields.io/github/issues/ethereumjs/ethereumjs-vm/package:%20common?label=issues
[common-issues-link]: https://github.com/ethereumjs/ethereumjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+common"
[common-actions-badge]: https://github.com/ethereumjs/ethereumjs-vm/workflows/Common/badge.svg
[common-actions-link]: https://github.com/ethereumjs/ethereumjs-vm/actions?query=workflow%3A%22Common%22
[common-coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/branch/master/graph/badge.svg?flag=common
[common-coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/tree/master/packages/common
[ethash-package]: ./packages/ethash
[ethash-npm-badge]: https://img.shields.io/npm/v/@ethereumjs/ethash.svg
[ethash-npm-link]: https://www.npmjs.org/package/@ethereumjs/ethash
[ethash-issues-badge]: https://img.shields.io/github/issues/ethereumjs/ethereumjs-vm/package:%20ethash?label=issues
[ethash-issues-link]: https://github.com/ethereumjs/ethereumjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+ethash"
[ethash-actions-badge]: https://github.com/ethereumjs/ethereumjs-vm/workflows/Ethash/badge.svg
[ethash-actions-link]: https://github.com/ethereumjs/ethereumjs-vm/actions?query=workflow%3A%22Ethash%22
[ethash-coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/branch/master/graph/badge.svg?flag=ethash
[ethash-coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/tree/master/packages/ethash
[tx-package]: ./packages/tx
[tx-npm-badge]: https://img.shields.io/npm/v/@ethereumjs/tx.svg
[tx-npm-link]: https://www.npmjs.com/package/@ethereumjs/tx
[tx-issues-badge]: https://img.shields.io/github/issues/ethereumjs/ethereumjs-vm/package:%20tx?label=issues
[tx-issues-link]: https://github.com/ethereumjs/ethereumjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+tx"
[tx-actions-badge]: https://github.com/ethereumjs/ethereumjs-vm/workflows/Tx/badge.svg
[tx-actions-link]: https://github.com/ethereumjs/ethereumjs-vm/actions?query=workflow%3A%22Tx%22
[tx-coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/branch/master/graph/badge.svg?flag=tx
[tx-coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/tree/master/packages/tx
[vm-package]: ./packages/vm
[vm-npm-badge]: https://img.shields.io/npm/v/@ethereumjs/vm.svg
[vm-npm-link]: https://www.npmjs.com/package/@ethereumjs/vm
[vm-issues-badge]: https://img.shields.io/github/issues/ethereumjs/ethereumjs-vm/package:%20vm?label=issues
[vm-issues-link]: https://github.com/ethereumjs/ethereumjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+vm"
[vm-actions-badge]: https://github.com/ethereumjs/ethereumjs-vm/workflows/VM/badge.svg
[vm-actions-link]: https://github.com/ethereumjs/ethereumjs-vm/actions?query=workflow%3A%22VM%22
[vm-coverage-badge]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/branch/master/graph/badge.svg?flag=vm
[vm-coverage-link]: https://codecov.io/gh/ethereumjs/ethereumjs-vm/tree/master/packages/vm
