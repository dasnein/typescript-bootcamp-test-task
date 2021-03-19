export default function generateStacks({
  cells, axis, sortAxis, direction = 'up',
} = {}) {
  const stacks = cells.reduce((tempStacks, cell) => {
    const updatedStacks = { ...tempStacks };
    const stacksKey = cell[axis];

    if (!updatedStacks[stacksKey]) {
      updatedStacks[stacksKey] = [];
    }

    updatedStacks[stacksKey].push({ ...cell });

    return updatedStacks;
  }, {});

  Object.values(stacks).forEach((stack) => {
    stack.sort((a, b) => {
      if (direction === 'up') {
        return b[sortAxis] - a[sortAxis];
      }

      return a[sortAxis] - b[sortAxis];
    });
  });

  return stacks;
}
