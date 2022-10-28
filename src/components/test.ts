import { reactive, toRefs } from 'vue'

export default function testHook() {
  const test = reactive({
    testA: 1,
    testB: 2
  })
  //   return toRefs(test)
  return test
}
