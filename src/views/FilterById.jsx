import { useState, useCallback } from "react";

const FilterById = ({ name, UpdateDragWay1, i, DragStart }) => {
  const [detect, setDetect] = useState(false);

  const DragControl = useCallback(
    (e) => {
      setDetect(!detect);
      DragStart({ e: e, name: name.name });
    },
    [DragStart, detect, name.name]
  );

  return (
    <div
      key={i}
      className={detect ? "data Click" : "data Disable"}
      id={name.id}
      onDragEnd={() => setDetect(false)}
      onDrop={(e) => UpdateDragWay1(e)}
      onDragOver={(e) => UpdateDragWay1(e)}
      onDragStart={(e) => DragControl(e)}
      draggable
    >
      <span className="span">
        <div className="div">
          <div id={name.id} className="data__context">
            <p>{name.id}</p>
            <p>{name.name}</p>
          </div>
        </div>
      </span>
    </div>
  );
};

export default FilterById;
