"use client";

/** 依題目 figure 代碼顯示對應圖示 */
export function QuestionFigure({ figure }: { figure: string }) {
  switch (figure) {
    case "rhythm-44-eighth":
      return <FigureRhythm44Eighth />;
    case "theory-major-scale":
      return <FigureMajorScaleHalfSteps />;
    default:
      return null;
  }
}

/** 4/4 拍：兩拍內的八分音符，標示正拍與反拍 (&) */
function FigureRhythm44Eighth() {
  return (
    <figure className="my-6 flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-dark-700/50 p-6">
      <figcaption className="text-sm text-zinc-400">4/4 拍 · 八分音符（第 1 拍）</figcaption>
      <svg
        viewBox="0 0 320 120"
        className="w-full max-w-sm"
        aria-hidden
      >
        {/* 小節線 */}
        <line x1="20" y1="60" x2="20" y2="90" stroke="#52525b" strokeWidth="2" />
        <line x1="300" y1="60" x2="300" y2="90" stroke="#52525b" strokeWidth="2" />
        {/* 拍號 4/4 */}
        <text x="10" y="45" fill="#a1a1aa" fontSize="12" fontFamily="system-ui">4</text>
        <text x="10" y="58" fill="#a1a1aa" fontSize="12" fontFamily="system-ui">4</text>
        {/* 第一拍：兩個八分音符（符桿向下） */}
        <ellipse cx="90" cy="72" rx="14" ry="10" fill="#d4af37" />
        <ellipse cx="150" cy="72" rx="14" ry="10" fill="#d4af37" />
        <line x1="104" y1="72" x2="104" y2="105" stroke="#e8c547" strokeWidth="3" />
        <line x1="164" y1="72" x2="164" y2="105" stroke="#e8c547" strokeWidth="3" />
        <line x1="104" y1="105" x2="164" y2="105" stroke="#e8c547" strokeWidth="2" />
        {/* 符尾（一橫線連兩顆八分） */}
        <line x1="90" y1="105" x2="178" y2="105" stroke="#e8c547" strokeWidth="2" />
        {/* 標籤：1（正拍）與 &（反拍） */}
        <text x="82" y="100" fill="#d4af37" fontSize="14" fontWeight="bold" textAnchor="middle">1</text>
        <text x="142" y="100" fill="#f97316" fontSize="14" fontWeight="bold" textAnchor="middle">&</text>
        <text x="85" y="118" fill="#71717a" fontSize="11" textAnchor="middle">正拍</text>
        <text x="145" y="118" fill="#71717a" fontSize="11" textAnchor="middle">反拍</text>
      </svg>
    </figure>
  );
}

/** C 大調音階：標示半音位置 3-4 與 7-1 */
function FigureMajorScaleHalfSteps() {
  const notes = ["C", "D", "E", "F", "G", "A", "B", "C"];
  const halfStepIndices = [2, 3, 6, 7]; // 3-4 (E-F) 與 7-1 (B-C) 為半音
  return (
    <figure className="my-6 flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-dark-700/50 p-6">
      <figcaption className="text-sm text-zinc-400">C 大調音階 · 半音位置</figcaption>
      <svg viewBox="0 0 360 80" className="w-full max-w-sm" aria-hidden>
        {notes.map((note, i) => {
          const x = 30 + i * 40;
          const isHalfStep = halfStepIndices.includes(i);
          return (
            <g key={`${note}-${i}`}>
              <circle
                cx={x}
                cy="42"
                r="18"
                fill={isHalfStep ? "#f97316" : "#2e2e34"}
                stroke={isHalfStep ? "#ea580c" : "#d4af37"}
                strokeWidth="2"
              />
              <text x={x} y="47" fill="#f4f4f5" fontSize="16" fontWeight="bold" textAnchor="middle">
                {note}
              </text>
              <text x={x} y="68" fill="#a1a1aa" fontSize="11" textAnchor="middle">
                {i + 1}
              </text>
            </g>
          );
        })}
        {/* 半音標示說明 */}
        <text x="180" y="76" fill="#71717a" fontSize="10" textAnchor="middle">
          橘色 = 半音 (3-4: E-F, 7-1: B-C)
        </text>
      </svg>
    </figure>
  );
}
