import { useCallback, useMemo } from "react";
import DragEndDrop from "../hooks/DragAndDrop";
import CategoriesHook from "../hooks/categoriesHooks";
import DisplayData from "./DisplayData";
import "../css/index.css";

const Index = () => {
  const [
    onDrop,
    state,
    onDragStart,
    onDragOver,
    UpdateDragWay,
    OnDropZoneStart,
  ] = DragEndDrop();
  const [categoriesPanel] = CategoriesHook(state);

  const Filter = (state, drop) =>
    state.tasks.filter(({ category }) => category.trim() === drop.trim());

  const getByCategory = useCallback((state, drop) => {
    return Filter(state, drop);
  }, []);

  const memoList = useMemo(
    () =>
      categoriesPanel.map((drop, i) => {
        return (
          <DisplayData
            key={i}
            state={state}
            drop={drop}
            DropZoneStart={OnDropZoneStart}
            DragOver={onDragOver}
            Drop={onDrop}
            DragStart={onDragStart}
            UpdateDragWay1={UpdateDragWay}
            getByCategory={getByCategory}
          />
        );
      }),
    [
      OnDropZoneStart,
      UpdateDragWay,
      categoriesPanel,
      getByCategory,
      onDragStart,
      onDrop,
      state,
      onDragOver,
    ]
  );

  return <main className="main">{memoList}</main>;
};

export default Index;
