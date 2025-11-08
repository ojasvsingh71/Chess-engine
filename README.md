# ♟️ Chess Engine

A web-based chess game built with **React** and **JavaScript**, where the **user plays as White** and a **fully observable AI agent** plays as Black.  
The AI makes decisions based on material value and board safety, demonstrating a simple reactive agent design.

---

Play the game here: [Live Site](https://chess-engine-chi.vercel.app/) 

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/6e7e1492-2d49-4a25-b9b4-c4e510469912)

---

## ⚙️ Features

- ✅ Full chessboard UI built with **React**
- ♟️ Legal move generation for all pieces
- 🧩 AI opponent (Black) using a **Fully Observable Agent** model
- 💥 Captures prioritized by **material value** (`P=1, N/B=3, R=5, Q=9`)
- 🛡️ Move safety checks via `isSafeAfterMove()`
- 🔄 Turn-based game flow with automatic agent responses
- ⚡ Smooth gameplay with short AI delay for realism

---

## 🧠 Technologies Used

- ⚛️ React.js (with Vite)
- 🎨 Tailwind CSS
- 📁 PNG/SVG image assets for pieces (manually imported)
- 🧠 Custom move validation (starting with pawns)

---

## 🧩 Agent Logic

The agent operates as a **reactive, fully observable decision system**:

1. Enumerates all **legal moves** for the black pieces.
2. Evaluates each move using:
   - **Capture value** (based on material)
   - **Safety** (avoiding squares attacked by white)
3. Selects a move in this priority order:
   1. Highest-value **capture**
   2. **Safe** move (not attacked)
   3. Random legal move (fallback)

---


