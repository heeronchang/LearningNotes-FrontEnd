```JavaScript
const SingletonObj = (function () {
      function Singleton (args) {
        this.name = 'Singleton';
        let argsObj = args || {};
        this.propA = argsObj.A;
      }

      let _instance;

      const _static = {
        name: 'Singleton',
        getInstance(args) {
          if (_instance === undefined) {
            _instance = new Singleton(args);
          }
          
          return _instance;
        }
      };

      return _static;
    })();

    const singletonA = SingletonObj.getInstance({A:1});
    console.log(singletonA.propA);
```