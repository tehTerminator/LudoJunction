export const environment = {
  production: true,
  url: {
    user: {
      signIn: 'http://ludojunction/api/user.signIn.php',
      signUp: 'http://ludojunction/api/user.signUp.php',
      activate: 'http://ludojunction/api/user.activate.php',
      select: 'http://ludojunction/api/user.select.php'
    },
    balance: {
      view: 'http://ludojunction/api/balance.view.php',
      payin: 'http://ludojunction/api/balance.payin.php',
      payout: 'http://ludojunction/api/balance.payout.php',
      previousRequest: 'http://ludojunction/api/balance.previous.php'
    },
    challenge: {
      get: 'http://ludojunction/api/challenge.get.php',
      create: 'http://ludojunction/api/challenge.create.php',
      update: 'http://ludojunction/api/challenge.update.php',
      accept: 'http://ludojunction/api/challenge.accept.php',
      result: 'http://ludojunction/api/challenge.result.php'
    },
    transaction: 'http://ludojunction/api/transactions.php'
  }
};
