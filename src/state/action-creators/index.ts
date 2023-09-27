import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

import {
  Action,
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
  Direction
} from "../actions";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  };
};

export const moveCell = (id: string, direaction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direaction
    }
  };
};

export const insertCellBefore = (
  id: string,
  cellTypes: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellTypes
    }
  };
};
