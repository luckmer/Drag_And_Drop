import { useState, useEffect } from "react";

const CategoriesHook = (state) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categories = state.tasks;
    const category = categories.map((item) => item.alter);
    setCategories(category);
  }, [state.tasks]);
  const categoriesPanel = [...new Set(categories)];

  return [categoriesPanel];
};
export default CategoriesHook;
