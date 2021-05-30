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

  const DropZoneStart = useCallback(
    (e, drop) => OnDropZoneStart(e, drop),
    [OnDropZoneStart]
  );

  const DragOver = useCallback((e, drop) => onDragOver(e, drop), [onDragOver]);

  const DragStart = useCallback(
    ({ e, name }) => onDragStart(e, name),
    [onDragStart]
  );

  const Drop = useCallback((e, drop) => onDrop(e, drop), [onDrop]);

  const UpdateDragWay1 = useCallback(
    (e) => {
      UpdateDragWay(e);
    },
    [UpdateDragWay]
  );
  

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
            DropZoneStart={DropZoneStart}
            DragOver={DragOver}
            Drop={Drop}
            DragStart={DragStart}
            UpdateDragWay1={UpdateDragWay1}
            getByCategory={getByCategory}
          />
        );
      }),
    [
      categoriesPanel,
      DragOver,
      DragStart,
      DropZoneStart,
      Drop,
      UpdateDragWay1,
      getByCategory,
      state,
    ]
  );

  return <main className="main">{memoList}</main>;
};

export default Index;
