import { AXIS_SORT_DEPENDENCY } from '@/store/constants';
import generateStacks from './generate_stacks';

export default function checkAvailableMoves(cells) {
  const isAvailableMoves = Object.entries(AXIS_SORT_DEPENDENCY).some(([axis, sortAxis]) => {
    const stacksObject = generateStacks({ cells, axis, sortAxis });
    const stacks = Object.values(stacksObject);
    const isEmptyCells = stacks.some((stack) => stack.find((cell) => cell.value === 0));

    if (isEmptyCells) {
      return true;
    }

    for (let i = 0; i < stacks.length; i++) {
      for (let j = 1; j < stacks[i].length; j++) {
        const isCellsValueEqual = stacks[i][j].value === stacks[i][j - 1].value;

        if (isCellsValueEqual) {
          return true;
        }
      }
    }
  });

  return isAvailableMoves;
}
