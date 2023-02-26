import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Navbar from "./Navbar.vue";

const fn = vi.fn();

describe("Navbar", () => {
  it("Deve renderizar", () => {
    const wrapper = mount(Navbar);
    expect(wrapper.find("[data-idtest='navbar']").exists()).toBeTruthy();
  });
});
