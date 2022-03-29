import React from "react";

type MarkProps = {
  name: string;
  keyword: string;
};

/**
 * 高亮关键词
 * @param 字符串和关键词
 * @returns 高亮关键词后的字符串
 */
export const Mark = ({ name, keyword }: MarkProps) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "skyblue" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
