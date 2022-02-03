const Web3 = require('web3')

class TransactionChecker{

    web3;
    web3ws;
    account;
    subscription;

    constructor(account){
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/44fec24c9c48437fbf411cbbb7853f4f'))
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/44fec24c9c48437fbf411cbbb7853f4f'))
        this.account = account.toLowerCase()
    }


    subscribe(topic){
        this.subscription = this.web3ws.eth.subscribe(topic, (err,res) => {
            if(err) console.error(err)
        })
    }

    watchTransactions(){
        console.log('Watching all pending transactions...');
        this.subscription.on('data', (txHash) => {
            setTimeout(async () =>{
                try{
                    let tx = await this.web3.eth.getTransaction(txHash)
                    if(tx != null){
                        console.log(tx.from)
                        if(this.account == tx.to.toLowerCase()){
                            console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()})
                        }
                    }
                    
                }catch(err){
                    console.error(err)
                }
            }, 5 * 60000)
        })
    }

}

let txChecker = new TransactionChecker('0xbc250dE8638FC6c6FB243BCf7cD291F83c75Dd2a');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions()