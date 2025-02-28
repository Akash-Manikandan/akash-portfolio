"use client"

function TextEllipsis({ text, maxLine }: { text: string; maxLine: string }) {
  const numLines = Number.parseInt(maxLine, 10) ?? null

  return (
    <div
      className="text-left overflow-hidden"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: numLines,
        WebkitBoxOrient: "vertical",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </div>
  )
}

export default TextEllipsis