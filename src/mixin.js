import initTaskFactory from './plugin/index'
import asyncHelpers from './util/async'
import assert, { isFn } from './util/assert'

let tasksData = {}

export default function(Vue) {
  Vue.mixin({
    beforeCreate: initTasks,
    data: () => tasksData
  })
}

/**
 * Converts each registered method into a task object that is then
 * injects into the component instance.
 */
function initTasks() {
  let host = this,
      opts = this.$options

  if (opts.tasks) {
    assert(isFn(opts.tasks), 'The Tasks property must be a function')

    // initialize the tasks function with task factory function
    // so that task actions can be converted to task objects,
    let createTask = initTaskFactory(host),
        tasks = opts.tasks(createTask, asyncHelpers)

    // add each task to data initialization object
    Object.keys(tasks).forEach(key => {
      host[key] = tasks[key]
      // tasksData[key] = tasks[key]
    })
  }
}

// TODO
// created: validateTasks
// beforeDestory {}
