/**
*  The {TaskSubscriber} is responsbile for delegating each
*  callback, or subscriptions, so that it can be called in the
*  appropriate context.
*
*  @this the {TaskProperty} where the subscriber is destructured
*  @constructs TaskSubscriber
*/
export default function createTaskSubscriber() {
  let startFn,
      nextFn,
      cancelFn,
      dropFn,
      restartFn,
      errorFn,
      successFn,
      finalizeFn

  return {
    emitBeforeStart() {
      if (startFn) startFn()
    },
    emitBeforeNext() {
      if (nextFn) nextFn()
    },
    emitCancel() {
      if (cancelFn) cancelFn()
    },
    emitDrop() {
      if (dropFn) dropFn()
    },
    emitRestart() {
      if (restartFn) restartFn()
    },
    emitError() {
      if (errorFn) errorFn()
    },
    emitSuccess() {
      if (successFn) successFn()
    },
    emitFinalize() {
      if (finalizeFn) finalizeFn()
    },

    subscriptions: {
      beforeStart(fn) { // onStart
        startFn = fn.bind(this)
        return this
      },
      beforeNext(fn) {
        nextFn = fn.bind(this)
        return this
      },
      onCancel(fn) {
        cancelFn = fn.bind(this)
        return this
      },
      onDrop(fn) {
        dropFn = fn.bind(this)
        return this
      },
      onRestart(fn) {
        restartFn = fn.bind(this)
        return this
      },
      onError(fn) {
        errorFn = fn.bind(this)
        return this
      },
      onSuccess(fn) {
        successFn = fn.bind(this)
        return this
      },
      onFinalize(fn) { // afterEnd // TODO
        finalizeFn = fn.bind(this)
        return this
      }
    }
  }
}
