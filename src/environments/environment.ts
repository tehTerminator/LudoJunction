// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {
    user: {
      signIn: 'http://ludojunction.com/api/user.signIn.php',
      signUp: 'http://ludojunction.com/api/user.signUp.php',
      activate: 'http://ludojunction.com/api/user.activate.php',
      select: 'http://ludojunction.com/api/user.select.php',
      revalidate: 'http://ludojunction.com/api/user.validate.php',
      reset: 'http://ludojunction.com/api/user.reset.php'
    },
    balance: {
      view: 'http://ludojunction.com/api/balance.view.php',
      payin: 'http://ludojunction.com/api/balance.payin.php',
      payout: 'http://ludojunction.com/api/balance.payout.php',
      previousRequest: 'http://ludojunction.com/api/balance.previous.php'
    },
    challenge: {
      get: 'http://ludojunction.com/api/challenge.get.php',
      create: 'http://ludojunction.com/api/challenge.create.php',
      update: 'http://ludojunction.com/api/challenge.update.php',
    accept: 'http://ludojunction.com/api/challenge.accept.php',
      result: 'http://ludojunction.com/api/challenge.result.php',
      reject: 'http://ludojunction.com/api/challenge.reject.php'
    },
    transaction: 'http://ludojunction.com/api/transactions.php'
  },
  adminUrls: {
    challenges: {
      get: 'http://ludojunction.com/api/admin.challenges.get.php',
      approve: 'http://ludojunction.com/api/admin.challenge.approve.php',
    },
    payRequest: {
      get: 'http://ludojunction.com/api/admin.payReq.get.php',
      post: 'http://ludojunction.com/api/admin.payReq.post.php'
    },
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
