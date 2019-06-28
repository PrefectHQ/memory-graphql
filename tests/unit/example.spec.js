import { shallowMount } from "@vue/test-utils";
import MemoryGame from "@/components/MemoryGame.vue";

describe("MemoryGame.vue", () => {
  const wrapper = shallowMount(MemoryGame);
  it("Check the cardDeck exists", () => {
    expect(wrapper.find(".cardDeck").exists()).toBe(true);
  });
});
