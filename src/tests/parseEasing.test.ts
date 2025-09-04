import E from "easing-functions";

import {describe, expect, it} from "vitest";
import {parseEasing} from "@/animationJson/parseEasing.ts";


describe("without easing", () => {
  it("detect constant", () => {
    expect(parseEasing("CONSTANT")).toEqual(E.Constant);
  });

  it("detect linear", () => {
    expect(parseEasing("LINEAR")).toEqual(E.Linear);
  });
});

describe("with easing", () => {
  it("in with any interpolation", () => {
    expect(parseEasing("EASEINQUAD")).toEqual(E.Quadratic.In);
    expect(parseEasing("EASEINCUBIC")).toEqual(E.Cubic.In);
    expect(parseEasing("EASEINQUART")).toEqual(E.Quartic.In);
    expect(parseEasing("EASEINQUINT")).toEqual(E.Quintic.In);
    expect(parseEasing("EASEINSINE")).toEqual(E.Sinusoidal.In);
    expect(parseEasing("EASEINEXPO")).toEqual(E.Exponential.In);
    expect(parseEasing("EASEINCIRC")).toEqual(E.Circular.In);
  });

  it("out with any interpolation", () => {
    expect(parseEasing("EASEOUTQUAD")).toEqual(E.Quadratic.Out);
    expect(parseEasing("EASEOUTCUBIC")).toEqual(E.Cubic.Out);
    expect(parseEasing("EASEOUTQUART")).toEqual(E.Quartic.Out);
    expect(parseEasing("EASEOUTQUINT")).toEqual(E.Quintic.Out);
    expect(parseEasing("EASEOUTSINE")).toEqual(E.Sinusoidal.Out);
    expect(parseEasing("EASEOUTEXPO")).toEqual(E.Exponential.Out);
    expect(parseEasing("EASEOUTCIRC")).toEqual(E.Circular.Out);
  });

  it("in out with any interpolation", () => {
    expect(parseEasing("EASEINOUTQUAD")).toEqual(E.Quadratic.InOut);
    expect(parseEasing("EASEINOUTCUBIC")).toEqual(E.Cubic.InOut);
    expect(parseEasing("EASEINOUTQUART")).toEqual(E.Quartic.InOut);
    expect(parseEasing("EASEINOUTQUINT")).toEqual(E.Quintic.InOut);
    expect(parseEasing("EASEINOUTSINE")).toEqual(E.Sinusoidal.InOut);
    expect(parseEasing("EASEINOUTEXPO")).toEqual(E.Exponential.InOut);
    expect(parseEasing("EASEINOUTCIRC")).toEqual(E.Circular.InOut);
  });
});
