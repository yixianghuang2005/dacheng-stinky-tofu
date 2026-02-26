"use client";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [sloganIndex, setSloganIndex] = useState(0);
  const slogans = ["外酥內嫩的極致誘惑", "鮮甜濃郁的舌尖饗宴"];

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      title: "🔥 招牌炸物 (可素食)",
      items: [
        { name: "香酥臭豆腐", price: "60", note: "招牌必點" },
        { name: "脆皮豆腸", price: "60", note: "外酥內 Q" },
        { name: "綜合 (臭豆腐+豆腸)", price: "60", note: "一次滿足" },
      ]
    },
    {
      title: "🍜 飽足飯 / 麵食",
      items: [
        { name: "羊肉羹 (飯/麵/炊粉/冬粉)", price: "小70 / 大80", note: "鮮甜濃郁" },
        { name: "肉羹 (飯/麵/炊粉/冬粉)", price: "小70 / 大80", note: "在地首選" },
        { name: "滷肉飯", price: "小40 / 大50", note: "" },
        { name: "湯麵", price: "小40 / 大50", note: "" },
      ]
    },
    {
      title: "🥗 精選小菜",
      items: [
        { name: "鹹蜆", price: "80", note: "" },
        { name: "自製泡菜", price: "50", note: "" },
        { name: "滷蛋", price: "15", note: "" },
      ]
    },
    {
      title: "🥣 暖心湯品",
      items: [
        { name: "羊肉羹湯 / 肉羹湯", price: "60", note: "" },
        { name: "小腸豬血湯", price: "60", note: "" },
        { name: "豬血湯 / 小腸湯", price: "30", note: "" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-slate-900">
      {/* 導覽列 */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-yellow-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-amber-600 tracking-tighter">大城香酥臭豆腐</h1>
          <div className="space-x-8 hidden md:flex font-bold text-slate-700">
            <a href="#hero" className="hover:text-amber-500 transition">首頁</a>
            <a href="#menu" className="hover:text-amber-500 transition">美味菜單</a>
            <a href="#info" className="hover:text-amber-500 transition">聯絡店面</a>
          </div>
        </div>
      </nav>

      {/* Hero 區塊 - 使用商業質感黃色 */}
      <section id="hero" className="h-[65vh] flex flex-col items-center justify-center bg-amber-400 text-center px-4 overflow-hidden relative shadow-inner">
        {/* 裝飾性背景圖形 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-amber-200 blur-3xl"></div>
        </div>

        <div className="relative h-24 md:h-32 w-full flex items-center justify-center z-10">
          {slogans.map((text, index) => (
            <h2
              key={index}
              className={`absolute text-4xl md:text-7xl font-black transition-all duration-1000 ease-in-out drop-shadow-md ${
                sloganIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              } text-white`}
            >
              {text}
            </h2>
          ))}
        </div>
        <div className="mt-8 z-10">
          <p className="text-xl text-amber-900 font-bold mb-6 drop-shadow-sm">彰化大城南平路 352 號 · 在地美食首選</p>
          <button 
            onClick={() => document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}
            className="bg-slate-900 text-amber-400 px-10 py-4 rounded-xl font-black hover:bg-black hover:scale-105 transition-all shadow-2xl uppercase tracking-widest"
          >
            查看美味菜單
          </button>
        </div>
      </section>

      {/* 菜單區塊 */}
      <section id="menu" className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex flex-col items-center mb-16 text-center">
            <h3 className="text-4xl font-black text-slate-900 mb-2 italic">菜單</h3>
            <div className="h-1.5 w-24 bg-amber-500 rounded-full"></div>
        </div>
        
        <div className="space-y-16">
          {categories.map((cat, idx) => (
            <div key={idx} className="animate-fade-in">
              <h4 className="text-2xl font-bold mb-8 border-l-8 border-amber-500 pl-4 text-slate-800 bg-amber-100/50 py-2 rounded-r-lg">{cat.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-amber-100 flex justify-between items-center group">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{item.name}</span>
                      {item.note && <span className="text-xs text-amber-600 font-bold mt-1 bg-amber-50 px-2 py-0.5 rounded w-fit">{item.note}</span>}
                    </div>
                    <div className="text-xl font-black text-slate-900">
                      <span className="text-sm text-amber-600 mr-1 font-bold">NT$</span>{item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 資訊與地圖區塊 - 深色背景對比黃色字體 */}
      <section id="info" className="bg-slate-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h3 className="text-4xl font-bold text-amber-400 mb-6">來店品嚐</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <span className="bg-amber-400 text-slate-900 p-2 rounded-lg font-bold shadow-lg">住址</span>
                <p className="text-xl leading-relaxed text-slate-200">
                  527 彰化縣大城鄉南平路 352 號<br/>
                  <span className="text-sm text-amber-400 font-mono font-bold">(Plus Code: V83C+F8)</span>
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-amber-400 text-slate-900 p-2 rounded-lg font-bold shadow-lg">預約</span>
                <div className="space-y-3">
                  <a href="tel:0955421750" className="block text-3xl font-black text-amber-400 hover:text-white transition decoration-amber-500/50 underline underline-offset-8">0955-421750</a>
                  <a href="tel:0981807989" className="block text-3xl font-black text-amber-400 hover:text-white transition decoration-amber-500/50 underline underline-offset-8">0981-807989</a>
                  <p className="text-sm text-slate-400 font-medium italic">※ 點擊號碼可直接聯繫店家</p>
                </div>
              </div>
            </div>
          </div>

          {/* 嵌入 Google 地圖 */}
          <div className="h-[450px] w-full rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.51656885374!2d120.3204!3d23.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUxJzIzLjgiTiAxMjDCsDE5JzEzLjQiRQ!5e0!3m2!1szh-TW!2stw!4v1700000000000!5m2!1szh-TW!2stw" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              className="grayscale-[0.2] contrast-[1.1]"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="py-12 text-center bg-white border-t border-amber-100">
        <p className="text-slate-400 text-xs tracking-[0.4em] font-black uppercase">
          DACHENG STINKY TOFU © 2026 | Developed by Yi-xiang
        </p>
      </footer>
    </div>
  );
}