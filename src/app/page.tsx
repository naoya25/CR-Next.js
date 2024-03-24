"use client";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [tag, setTag] = useState<string>("");

  const submitTagName = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/getPlayerNextChests/${tag}`);
    console.log(res.json());
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>クラロワ 宝箱予測</h1>
      <form onSubmit={submitTagName}>
        <label htmlFor="user-tag">プレイヤータグを入力</label>
        <input
          type="text"
          id="user-tag"
          className="border"
          placeholder="プレイヤータグ"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit">予測する</button>
      </form>
      <p>{tag}</p>
    </main>
  );
};

export default Home;
