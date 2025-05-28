import { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleFormat = () => {
    if (!inputText.trim()) {
      showToast("값을 입력해주세요.");
      return;
    }

    const lines = inputText.split("\n");
    const formatted = lines
      .map((line) => {
        const trimmed = line.trim();
        return trimmed ? `'${trimmed}'` : "";
      })
      .join("\n");

    setOutputText(formatted);
    showToast("변환 완료!");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      showToast("복사 완료!");
    } catch {
      showToast("복사 실패!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E0FFFF",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* 입력창 */}
        <textarea
          style={{
            flex: "1 1 300px",
            minWidth: "300px",
            height: "400px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
          placeholder="여기에 텍스트를 입력하세요"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* 버튼들 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <button
            onClick={handleFormat}
            style={{
              padding: "12px 24px",
              fontSize: "14px",
              borderRadius: "6px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            변환하기
          </button>
          <button
            onClick={handleCopy}
            style={{
              padding: "12px 24px",
              fontSize: "14px",
              borderRadius: "6px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            결과 복사
          </button>
        </div>

        {/* 출력창 */}
        <textarea
          style={{
            flex: "1 1 300px",
            minWidth: "300px",
            height: "400px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
          placeholder="결과가 여기에 표시됩니다"
          value={outputText}
          readOnly
        />
      </div>

      {/* 토스트 메시지 */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#333",
            color: "white",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "14px",
            opacity: 0.9,
            zIndex: 1000,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
