import { useMemo } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

export const useClassNameMerged = (...classLists: ClassNameValue[]) => {
  return useMemo(() => twMerge(classLists), [classLists]);
};
