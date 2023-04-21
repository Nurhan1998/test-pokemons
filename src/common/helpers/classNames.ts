type ClassName = string | { [key: string]: boolean } | undefined;

export default function cn(...classNames: ClassName[]) {
  return classNames
    .reduce((classes: string[], className: ClassName) => {
      if (!className) return classes;

      if (typeof className === "string") {
        return className === "" ? [...classes] : [...classes, className];
      }

      const classNameItems = Object.entries(className).reduce(
        (objectClasses: string[], [objectClassname, isUsed]) => {
          return !isUsed
            ? [...objectClasses]
            : [...objectClasses, objectClassname];
        },
        []
      );

      return [...classes, ...classNameItems];
    }, [])
    .join(" ")
    .trim();
}
