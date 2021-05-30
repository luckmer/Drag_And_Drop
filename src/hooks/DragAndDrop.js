import { useEffect, useState, useCallback } from "react";
import { Style } from "./Style";

const initialState = {
  tasks: [
    { name: "one", alter: "one", category: "one", id: 1 },
    { name: "two", alter: "one", category: "one", id: 2 },
    { name: "three", alter: "two", category: "two", id: 3 },
    { name: "four", alter: "two", category: "two", id: 4 },
    { name: "five", alter: "three", category: "three", id: 5 },
    { name: "six", alter: "three", category: "three", id: 6 },
    { name: "seven", alter: "three", category: "three", id: 7 },
  ],
};

const DragEndDrop = () => {
  const [dragData, setDragData] = useState({ current: "", target: "" });
  const [state, setState] = useState(initialState);
  const [Update, setUpdate] = useState([]);

  const Return = useCallback((obj, current, data) => {
    return {
      ...data,
      name: obj && obj.name,
      category: obj && obj.category,
      id: current && current,
    };
  }, []);

  const ReturnObj = useCallback((obj, data) => {
    return {
      ...data,
      alter: obj && obj.alter,
    };
  }, []);

  const OnDrop = (e, cat) => {
    const id = e.dataTransfer.getData("id");
    const tasks = UpdateArray(id, cat);

    setState({ ...state, tasks });
    Style(e);
  };

  const ModuleDragControl = useCallback(
    (e, dragData, state, setUpdate) => {
      if (e.target.classList.contains("dropzone")) {
        const current = dragData.current;
        const target = e.target.id;
        const One = state.tasks.find((el) => el.alter.toString() === current);
        const two = state.tasks.find((el) => el.alter.toString() === target);
        const OneBlocker = One && One.category;
        const TwoBlocker = two && two.category;

        if (OneBlocker && TwoBlocker) {
          const update = state.tasks.map((data) => {
            if (target === data.alter.toString()) return ReturnObj(One, data);
            if (current === data.alter.toString()) return ReturnObj(two, data);
            return data;
          });
          setUpdate(update);
        }
      }
    },
    [ReturnObj]
  );
  const UpdateArray = useCallback(
    (id, cat) => {
      return state.tasks.filter((data) => {
        if (data.name === id) {
          data.category = cat;
        }
        return data;
      });
    },
    [state.tasks]
  );

  const OnDragOver = useCallback(
    (e, cat) => {
      e.preventDefault();
      const id = dragData.current && dragData.current;
      const Find = state.tasks.find((el) => Number(el.id) === Number(id));
      const tasks = UpdateArray(Find && Find.name, cat);
      setState({ ...state, tasks });

      ModuleDragControl(e, dragData, state, setUpdate);

      e.target.classList.value === "data__context" &&
        e.target.classList.add("Click");

      setDragData({
        ...dragData,
        target: e.target.id,
      });
    },
    [ModuleDragControl, UpdateArray, dragData, state]
  );

  const onDragStart = useCallback(
    (e, id) => {
      e.dataTransfer.setData("id", id);
      setDragData({
        ...dragData,
        current: e.target.id,
      });
    },
    [dragData]
  );

  const OnDropZoneStart = useCallback(
    (e, drop) => {
      if (e.target.classList.contains("dropzone")) {
        setDragData({
          ...dragData,
          current: drop,
        });
      }
    },
    [dragData]
  );

  const DataBlock = useCallback(
    (state, e) => {
      const current = parseInt(dragData.current);
      const target = parseInt(e.target.id);
      const One = state.tasks.find((el) => el.id === current);
      const two = state.tasks.find((el) => el.id === target);
      const OneBlocker = One && One.category;
      const TwoBlocker = two && two.category;
      return [OneBlocker, TwoBlocker, One, two, target, current];
    },
    [dragData]
  );

  const UpdateDragWay = useCallback(
    (e) => {
      const [OneBlocker, TwoBlocker, One, two, target, current] = DataBlock(
        state,
        e
      );

      if (OneBlocker === TwoBlocker) {
        const update = state.tasks.map((data) => {
          if (target === data.id) return Return(One, current, data);
          if (current === data.id) return Return(two, target, data);
          return data;
        });
        setUpdate(update);
      }
    },
    [DataBlock, state, Return]
  );

  useEffect(() => {
    Update.length && setState({ tasks: Update });
  }, [setState, Update]);

  return [
    OnDrop,
    state,
    onDragStart,
    OnDragOver,
    UpdateDragWay,
    OnDropZoneStart,
  ];
};

export default DragEndDrop;
