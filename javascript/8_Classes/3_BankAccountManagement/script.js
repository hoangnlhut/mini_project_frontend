class  BankAccount{
  constructor(){
      this.balance  = 0;
      this.transactions = [];
  }

  deposit(amount){
    const tran = {
      type: "deposit",  // deposit or withdraw
      amount : amount
    };
    if(amount > 0){
      this.transactions.push(tran);
      this.balance += amount;
      return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    }

    return "Deposit amount must be greater than zero.";
  }

  withdraw(amount){
    const tran = {
      type: "withdraw",  
      amount : amount
    };
    if(amount > 0 && this.balance >= amount)
    {
      this.balance -= amount;
      this.transactions.push(tran);
      return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    }

    return "Insufficient balance or invalid amount.";
  }

  checkBalance(){
    return `Current balance: $${this.balance}`;
  }

  listAllDeposits(){
    let result = `Deposits: `;
      this.transactions.forEach(({type, amount}) => {
        if(type === 'deposit') 
            result += `${amount},`
      });
    return result.substring(0, result.length - 1);
  }

  listAllWithdrawals(){
    let result = `Withdrawals: `;
      this.transactions.forEach(({type, amount}) => {
        if(type === 'withdraw') 
            result += `${amount},`
      });
    return result.substring(0, result.length - 1);
  }
}


const myAccount = new BankAccount();
console.log(myAccount.deposit(100));
console.log(myAccount.deposit(12000));
console.log(myAccount.deposit(2000));
console.log(myAccount.deposit(3000));
console.log(myAccount.deposit(4000));
console.log(myAccount.withdraw(14000));
console.log(myAccount.withdraw(1000));

console.log(myAccount.checkBalance());

console.log(myAccount.listAllDeposits());
console.log(myAccount.listAllWithdrawals());