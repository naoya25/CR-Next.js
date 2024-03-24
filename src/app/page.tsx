"use client";
import React, { useState } from "react";
import { ChestType } from "./types/chest";

const Home: React.FC = () => {
  const [tag, setTag] = useState<string>("");
  const [chests, setChests] = useState<ChestType[]>([]);

  const submitTagName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/getPlayerNextChests/${tag}`);
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }
      const {
        chests: { items },
      } = await res.json();
      setChests(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">クラロワ 宝箱予測</h1>
      <form onSubmit={submitTagName} className="mb-4">
        <label htmlFor="user-tag" className="block mb-1">プレイヤータグを入力</label>
        <input
          type="text"
          id="user-tag"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="9PRG8QGR8"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1"># は外してね！</p>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 transition duration-300">予測する</button>
      </form>
      {chests.length !== 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">宝箱</h2>
          {chests.map((chest: ChestType) => (
            <div key={chest.index} className="mb-2">
              <p className="text-lg">{chest.index + 1}番目</p>
              <p>{chest.name}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
