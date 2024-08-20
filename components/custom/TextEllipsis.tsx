"use client"
import LinesEllipsis from "react-lines-ellipsis";

function TextEllipsis({ text, maxLine }: { text: string; maxLine: string }) {
  return (
    <div className="text-left">
      {" "}
      <LinesEllipsis
        text={text}
        maxLine={maxLine}
        ellipsis="..."
        trimRight
        basedOn="letters"
      />
    </div>
  );
}

export default TextEllipsis;
