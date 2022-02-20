import { useArray, useMount } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jeff", age: 18 },
    { name: "daiwang", age: 17 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);

  return (
    <div>
      <button onClick={() => add({ name: "robu", age: 22 })}>add robu</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear both</button>
      {value.map((person, index) => (
        <div>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
