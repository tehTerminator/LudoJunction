// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {
    user: {
      signIn: 'http://localhost:80/ludoJunction/api/user.signIn.php',
      signUp: 'http://localhost:80/ludoJunction/api/user.signUp.php',
      activate: 'http://localhost:80/ludoJunction/api/user.activate.php',
      select: 'http://localhost:80/ludoJunction/api/user.select.php'
    },
    balance: {
      view: 'http://localhost:80/ludoJunction/api/balance.view.php',
      payin: 'http://localhost:80/ludoJunction/api/balance.payin.php',
      previousRequest: 'http://localhost:80/ludoJunction/api/balance.previous.php'
    },
    challenge: {
      get: 'http://localhost:80/ludoJunction/api/challenge.get.php',
      create: 'http://localhost:80/ludoJunction/api/challenge.create.php',
      update: 'http://localhost:80/ludoJunction/api/challenge.update.php',
      accept: 'http://localhost:80/ludoJunction/api/challenge.accept.php',
      result: 'http://localhost:80/ludoJunction/api/challenge.result.php'
    },
    transaction: 'http://localhost:80/ludoJunction/api/transactions.php'
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
