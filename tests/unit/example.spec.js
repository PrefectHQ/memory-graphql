import { shallowMount } from "@vue/test-utils";
import MemoryGame from "@/components/MemoryGame.vue";

// describe("MemoryGame.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
