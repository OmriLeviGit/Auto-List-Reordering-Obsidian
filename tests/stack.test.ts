import Stack from "../src/Stack";
import { createMockEditor } from "./__mocks__/createMockEditor";

describe("Stack Indentation and Number Parsing Tests", () => {
    let stack: Stack;

    beforeEach(() => {
        stack = new Stack(createMockEditor([""]), 0);
    });

    const testCases = [
        {
            name: "Leading space before numbers",
            inputs: [" 1. text", "  1. text", "  2. text"],
            expected: [undefined, 1, 2],
        },
        {
            name: "Single number entry (1 indentation)",
            inputs: ["1. text", "2. text"],
            expected: [2],
        },
        {
            name: "Number followed by empty space",
            inputs: ["1. text", " text"],
            expected: [1, undefined],
        },
        {
            name: "Same number with space",
            inputs: ["1. text", " 1. text"],
            expected: [1, 1],
        },
        {
            name: "Two lines with offset space",
            inputs: ["1. text", " 1. test", " text"],
            expected: [1, undefined],
        },
        {
            name: "Multiple indentations with sequential numbers",
            inputs: ["1. text", " 1. text", "2. text"],
            expected: [2],
        },
        {
            name: "Multiple indentations with last entry",
            inputs: ["1. text", " 1. text", "2. text", "    1. text"],
            expected: [2, undefined, undefined, undefined, 1],
        },
        {
            name: "Sequential entries with varied indentation",
            inputs: ["1. text", " 1. text", "2. text", "    1. text", "    2. text"],
            expected: [2, undefined, undefined, undefined, 2],
        },
        {
            name: "Additional numbered entry with same indentation",
            inputs: ["1. text", " 1. text", "2. text", "    1. text", "    2. text", "   3. text"],
            expected: [2, undefined, undefined, 3],
        },
        {
            name: "No valid entry after several inputs",
            inputs: ["1. text", " 1. text", "2. text", "    1. text", "    2. text", "   3. text", "text"],
            expected: [],
        },
        {
            name: "Final number entry at end",
            inputs: ["1. text", " 1. text", "2. text", "    1. text", "    2. text", "   3. text", "3. text"],
            expected: [3],
        },
        {
            name: "Final entry with previous indentation",
            inputs: [
                "1. text",
                " 1. text",
                "2. text",
                "    1. text",
                "    2. text",
                "   3. text",
                "3. text",
                " 1. text",
                " text",
            ],
            expected: [3, undefined],
        },
        {
            name: "Multiple entries with repeated indentation",
            inputs: [
                "1. text",
                " 1. text",
                "2. text",
                "    1. text",
                "    2. text",
                "   3. text",
                "3. text",
                " 1. text",
                " text",
                "    1. text",
            ],
            expected: [3, undefined, undefined, undefined, 1],
        },
    ];

    testCases.forEach(({ name, inputs, expected }) => {
        test(name, () => {
            inputs.forEach((input) => stack.insert(input));
            expect(stack.get()).toEqual(expected);
        });
    });
});
