const Web3 = require('web3');

class TransactionChecker{
    web3;
    account;

    constructor(account){
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/44fec24c9c48437fbf411cbbb7853f4f'))
        this.account = account;

    }

    async checkBlock(){
        let block = await this.web3.eth.getBlock('latest')
        let number = block.number;
        console.log('Searching block ' + number)


        if(block != null && block.transactions != null){
            for (let txHash of block.transactions) {
             let tx = await this.web3.eth.getTransaction(txHash)
                if(this.account == tx.to){
                    console.log('Transaction found on block: ' + number)
                    console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()})
                }   
            }
        }
    }

}

let txChecker = new TransactionChecker('0xbc250dE8638FC6c6FB243BCf7cD291F83c75Dd2a');
setInterval(() => {
    txChecker.checkBlock()
}, 20 * 1000)