import {expect, test} from "vitest";
import {aggregateMoves} from "@/animationJson/aggregateMoves.ts";

const simpleCase = [

  {
    "tick":10,
    "easing": "EASEINOUTQUAD",
    "turn": 0,
    "leftArm":{
      "yaw":-1.5707963705062866 // z
    }
  },
  {
    "tick":13,
    "easing": "EASEINOUTQUAD",
    "turn": 0,
    "rightLeg":{
      "pitch":-1.5707963705062866 // x
    }
  },
  {
    "tick":15,
    "easing": "EASEINOUTQUAD",
    "turn": 0,
    "leftLeg":{
      "roll":-1.5707963705062866 // y
    }
  }
];

const caseWithMultipleMoves = [
  {
    "tick":10,
    "easing": "EASEINOUTQUAD",
    "turn": 0,
    "leftArm":{
      "yaw":-1.5707963705062866 // z
    }
  },
  {
    "tick":13,
    "easing": "EASEINOUTQUAD",
    "turn": 0,
    "rightLeg":{
      "pitch":-1.5707963705062866, // x
      "roll":-1.5707963705062866, // y
      "yaw":-1.5707963705062866 // z

    }
  },
  {
    "tick":15,
    "easing": "EASEINOUTQUAD",
    "turn": 0,
    "leftLeg":{
      "roll":-1.5707963705062866, // y
      "yaw":-1.5707963705062866 // z

    }
  }
];

test("should aggregate correct simple case by default export script", () => {
  const aggregation = aggregateMoves(simpleCase);

  expect(Object.keys(aggregation)).toStrictEqual(["10", "13", "15"]);
});

test("should aggregate correct case with multiple moves", () => {
  const aggregation = aggregateMoves(caseWithMultipleMoves);

  expect(Object.keys(aggregation)).toStrictEqual(["10", "13", "15"]);
  expect(aggregation[10].length).toBe(1);
  expect(aggregation[13].length).toBe(3);
  expect(aggregation[15].length).toBe(2);
});