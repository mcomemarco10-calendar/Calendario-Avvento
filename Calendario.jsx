import React, { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  { q: "Qual è la capitale d’Italia?", a: "Roma" },
  { q: "Quanto fa 7×8?", a: "56" },
  { q: "Chi ha scritto la Divina Commedia?", a: "Dante" },
  { q: "Anno di nascita di Leonardo da Vinci?", a: "1452" },
  // puoi aggiungerne fino a 16
];

export default function PuzzleGame() {
  const [image, setImage] = useState(null);
  const [revealed, setRevealed] = useState(Array(16).fill(false));
  const [failed, setFailed] = useState(Array(16).fill(false));
  const [currentIndex, setCurrentIndex] = useState(null);
  const [answer, setAnswer] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const checkAnswer = () => {
    if (!questions[currentIndex]) return;
    const correct = answer.trim().toLowerCase() === questions[currentIndex].a.toLowerCase();
    if (correct) {
      const newRev = [...revealed];
      newRev[currentIndex] = true;
      setRevealed(newRev);
    } else {
      const newFail = [...failed];
      newFail[currentIndex] = true;
      setFailed(newFail);
    }
    setAnswer("");
    setCurrentIndex(null);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {!image && (
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      )}

      {image && (
        <div className="relative w-[400px] h-[400px] border-2 border-gray-300">
          <img
            src={image}
            alt="Puzzle"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* Overlay dei pezzi */}
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className={`border border-white cursor-pointer ${
                  revealed[i]
                    ? "opacity-0 pointer-events-none"
                    : failed[i]
                    ? "bg-gray-500 opacity-80"
                    : "bg-blue-600 opacity-80"
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popup domanda */}
      {currentIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <p className="text-lg font-semibold">{questions[currentIndex]?.q || "Domanda"}</p>
            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Risposta..."
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setCurrentIndex(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Annulla
              </button>
              <button
                onClick={checkAnswer}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
