import * as registry from './registry'

class AsyncModuleProvider {

  constructor(opts) {
    this.modules = []
    if (opts.registry) {
      this.modules = opts.registry
    }
  }

  getModule(name) {
    return new Promise((resolve, reject)=> {
      if (!this.modules[name]) {
        return reject(new Error('Module not registered'))
      }

      if (__SERVER__) {
        return resolve(this.modules[name])
      }

      this.modules[name]((file)=> {
        resolve(file)
      })
    })
  }

  get(...args) {
    const calls = []

    if (args.length === 1 && Array.isArray(args[0])) {
      args = args[0]
    }
    
    for (let name of args) {
      calls.push(this.getModule(name))
    }
    
    return Promise.all(calls)
      .then((results)=> {
        if (results.length === 1) {
          return results[0]
        }
        return results;
      })
  }
}

export default new AsyncModuleProvider({ registry })