export const environment = {
  production: true,
  url: {
    user: {
      signIn: 'http://ludojunction/api/api/user.signIn.php',
      signUp: 'http://ludojunction/api/api/user.signUp.php',
      activate: 'http://ludojunction/api/api/user.activate.php',
      select: 'http://ludojunction/api/api/user.select.php'
    },
    balance: {
      view: 'http://ludojunction/api/api/balance.view.php',
      payin: 'http://ludojunction/api/api/balance.payin.php',
      payout: 'http://ludojunction/api/api/balance.payout.php',
      previousRequest: 'http://ludojunction/api/api/balance.previous.php'
    },
    challenge: {
      get: 'http://ludojunction/api/api/challenge.get.php',
      create: 'http://ludojunction/api/api/challenge.create.php',
      update: 'http://ludojunction/api/api/challenge.update.php',
      accept: 'http://ludojunction/api/api/challenge.accept.php',
      result: 'http://ludojunction/api/api/challenge.result.php'
    },
    transaction: 'http://ludojunction/api/api/transactions.php'
  }
};
