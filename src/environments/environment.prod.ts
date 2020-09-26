export const environment = {
  production: true,
  url: {
    user: {
      signIn: 'http://ludojunction.com/api/user.signIn.php',
      signUp: 'http://ludojunction.com/api/user.signUp.php',
      activate: 'http://ludojunction.com/api/user.activate.php',
      select: 'http://ludojunction.com/api/user.select.php'
    },
    challenge: {
      get: 'http://ludojunction.com/api/challenge.get.php',
      create: 'http://ludojunction.com/api/challenge.create.php',
      update: 'http://ludojunction.com/api/challenge.update.php',
      accept: 'http://ludojunction.com/api/challenge.accept.php',
      result: 'http://ludojunction.com/api/challenge.result.php'
    },
    transaction: 'http://ludojunction.com/api/transactions.php'
  }
};
