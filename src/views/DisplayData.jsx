import { useMemo } from "react";
import { Style } from "../hooks/Style";
import FilterById from "./FilterById";

const DisplayData = ({
  state,
  drop,
  DropZoneStart,
  DragOver,
  Drop,
  DragStart,
  UpdateDragWay1,
  getByCategory,
}) => {
  const memoList = useMemo(
    () =>
      getByCategory(state, drop).map((name, i) => {
        return (
          <FilterById
            key={i}
            name={name}
            UpdateDragWay1={UpdateDragWay1}
            i={i}
            DragStart={DragStart}
          />
        );
      }),
    [DragStart, UpdateDragWay1, drop, getByCategory, state]
  );

  return (
    <div
      className="dropzone"
      draggable
      key={drop}
      id={drop}
      onDragStart={(e) => DropZoneStart(e, drop)}
      onDragLeave={(e) => Style(e)}
      onDragOver={(e) => DragOver(e, drop)}
      onDrop={(e) => Drop(e, drop)}
    >
      <div className="header">
        <p className="P">{drop}</p>
      </div>
      <div>{memoList}</div>
    </div>
  );
};

export default DisplayData;
