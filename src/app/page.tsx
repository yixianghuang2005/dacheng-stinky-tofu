"use client";
import React, { useState, useEffect, useRef } from 'react';

const slogans = ["外酥內嫩的極致誘惑", "鮮甜濃郁的舌尖饗宴"];

export default function Home() {
  const [sloganIndex, setSloganIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  
  // 明確型別定義，解決 Vercel Build Failed 問題
  const scrollRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // 當 activeTab 改變時，自動將上方選單的標籤置中
  useEffect(() => {
    const activeBtn = navRef.current?.children[activeTab] as HTMLElement;
    if (activeBtn && navRef.current) {
      const container = navRef.current;
      const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeTab]);

  const categories = [
    {
      title: "🔥 招牌炸物 (可素食)",
      items: [
        { name: "香酥臭豆腐", price: "60", note: "招牌必點", desc: "外皮極致酥脆，搭配手工台式泡菜與獨門醬汁。", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800" },
        { name: "脆皮豆腸", price: "60", note: "外酥內 Q", desc: "特製豆捲炸至金黃，層次分明，老饕最愛。", img: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=800" },
        { name: "綜合 (臭豆腐+豆腸)", price: "60", note: "一次滿足", desc: "店內人氣王！一半臭豆腐一半豆腸，雙重享受。", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800" },
      ]
    },
    {
      title: "🍜 飽足飯 / 麵食",
      items: [
        { name: "羊肉羹系列", price: "70 / 80", note: "飯/麵/炊粉/冬粉", desc: "新鮮羊肉搭配特製羹湯，湯頭濃郁而不膩，飽足感十足。", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800" },
        { name: "肉羹系列", price: "70 / 80", note: "飯/麵/炊粉/冬粉", desc: "傳統古早味肉羹，手工肉漿口感紮實有彈性。", img: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?q=80&w=800" },
        { name: "滷肉飯", price: "40 / 50", note: "經典美味", desc: "手切豬肉慢火燉煮，油脂豐富入口即化。", img: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=800" },
        { name: "湯麵", price: "40 / 50", note: "清爽首選", desc: "古早味湯頭搭配Q彈麵條。", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800" },
      ]
    },
    {
      title: "🥗 精選小菜",
      items: [
        { name: "鹹蜆", price: "80", note: "古早味", desc: "特製醬油與蒜頭醃漬，開胃經典小菜。", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800" },
        { name: "自製泡菜", price: "50", note: "爽口解膩", desc: "酸甜適中的台式泡菜，脆口多汁。", img: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?q=80&w=800" },
        { name: "滷蛋", price: "15", note: "入味十足", desc: "慢火滷製，香Q彈牙。", img: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?q=80&w=800" },
      ]
    },
    {
      title: "🥣 暖心湯品",
      items: [
        { name: "羊肉/肉羹湯", price: "60", note: "真材實料", desc: "純羹湯享受，鮮美濃郁。", img: "https://images.unsplash.com/photo-1594759077573-057404e38930?q=80&w=800" },
        { name: "小腸豬血湯", price: "60", note: "老饕必點", desc: "新鮮豬血與洗淨小腸，經典口味。", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800" },
        { name: "豬血湯 / 小腸湯", price: "30", note: "銅板美食", desc: "簡單溫暖的在地湯品。", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800" },
      ]
    }
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    // 隱藏向右滑動箭頭
    if (container.scrollLeft > 20) setShowArrow(false);

    // 檢測目前畫面上最靠近中心的卡片是哪一個類群
    let currentIdx = 0;
    let minDistance = Infinity;
    const centerX = container.scrollLeft + container.offsetWidth / 2;

    itemRefs.current.forEach((el, idx) => {
      if (el) {
        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(centerX - elCenter);
        if (distance < minDistance) {
          minDistance = distance;
          currentIdx = idx;
        }
      }
    });

    // 取得該卡片所屬的分類索引 (這裡簡化處理，根據卡片總數分配)
    // 炸物(0-2), 飯麵(3-6), 小菜(7-9), 湯品(10-12)
    let tabIdx = 0;
    if (currentIdx <= 2) tabIdx = 0;
    else if (currentIdx <= 6) tabIdx = 1;
    else if (currentIdx <= 9) tabIdx = 2;
    else tabIdx = 3;

    if (tabIdx !== activeTab) setActiveTab(tabIdx);
  };

  const scrollToCategory = (idx: number) => {
    setActiveTab(idx);
    let targetItemIdx = 0;
    if (idx === 1) targetItemIdx = 3;
    if (idx === 2) targetItemIdx = 7;
    if (idx === 3) targetItemIdx = 10;

    const targetEl = itemRefs.current[targetItemIdx];
    if (targetEl && scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = targetEl.offsetLeft - container.offsetWidth / 2 + targetEl.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  // 攤平所有品項以便於 Refs 追蹤
  const allItems = categories.flatMap(cat => cat.items);

  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-slate-900 scroll-smooth">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-yellow-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">大城香酥臭豆腐、羊肉羹</h1>
          <div className="space-x-8 hidden md:flex font-bold text-slate-700">
            <a href="#hero" className="hover:text-amber-500 transition">首頁</a>
            <a href="#menu" className="hover:text-amber-500 transition">美味菜單</a>
            <a href="#info" className="hover:text-amber-500 transition">聯絡店面</a>
          </div>
        </div>
      </nav>

      <section id="hero" className="h-[65vh] flex flex-col items-center justify-center bg-amber-400 text-center px-4 relative overflow-hidden shadow-inner">
        <div className="relative h-24 md:h-32 w-full flex items-center justify-center z-10">
          {slogans.map((text, index) => (
            <h2 key={index} className={`absolute text-4xl md:text-7xl font-black transition-all duration-1000 ${sloganIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} text-white drop-shadow-lg`}>
              {text}
            </h2>
          ))}
        </div>
        <div className="mt-8 z-10">
          <p className="text-xl text-amber-900 font-bold mb-6">彰化大城南平路 352 號 · 在地美食首選</p>
          <button onClick={() => document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-black hover:bg-black hover:scale-105 transition-all shadow-2xl">
            查看美味菜單
          </button>
        </div>
      </section>

      <section id="menu" className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <h3 className="text-4xl font-black text-slate-900 mb-2 italic tracking-widest">MENU</h3>
          <div className="h-1.5 w-24 bg-amber-500 rounded-full"></div>
        </div>

        {/* 分類 Tabs - 加入置中鎖定功能 */}
        <div ref={navRef} className="flex overflow-x-auto pb-4 mb-10 gap-3 no-scrollbar justify-start md:justify-center relative">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCategory(idx)}
              className={`whitespace-nowrap px-8 py-3 rounded-full font-black transition-all duration-300 ${activeTab === idx ? "bg-amber-500 text-white shadow-xl scale-105" : "bg-white text-slate-500 border border-amber-100 hover:bg-amber-50"}`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="relative group">
          {showArrow && <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 animate-bounce-horizontal pointer-events-none"><div className="bg-amber-600/80 p-3 rounded-full text-white shadow-2xl backdrop-blur-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></div></div>}

          {/* 橫向滾動容器 */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory no-scrollbar px-[10vw]"
          >
            {allItems.map((item, i) => (
              <div 
                key={i} 
                ref={el => itemRefs.current[i] = el}
                className="min-w-[75vw] md:min-w-[380px] snap-center bg-white rounded-[2.5rem] overflow-hidden shadow-md border border-amber-100 flex flex-col group/card"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                  <div className="absolute top-5 left-5">{item.note && <span className="bg-white/90 backdrop-blur-md text-amber-600 text-xs font-black px-4 py-1.5 rounded-full shadow-sm">{item.note}</span>}</div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-2xl font-black text-slate-800 tracking-tight">{item.name}</h4>
                    <div className="text-2xl font-black text-amber-600"><span className="text-sm mr-1 font-bold">NT$</span>{item.price}</div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{item.desc}</p>
                  <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-amber-500 transition-all shadow-lg">加入清單</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 聯絡與資訊區塊 */}
      <section id="info" className="bg-slate-900 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h3 className="text-4xl font-bold text-amber-400 mb-6 underline decoration-amber-500 underline-offset-8">來店品嚐</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4"><span className="bg-amber-400 text-slate-900 px-3 py-1 rounded font-black shadow-lg shrink-0">住址</span><p className="text-xl leading-relaxed text-slate-200">527 彰化縣大城鄉南平路 352 號<br/><span className="text-sm text-amber-400 font-mono font-bold">(Plus Code: V83C+F8)</span></p></div>
              <div className="flex items-start gap-4"><span className="bg-amber-400 text-slate-900 px-3 py-1 rounded font-black shadow-lg shrink-0">預約</span><div className="space-y-6"><p className="text-slate-400 text-sm font-bold flex items-center gap-2">點擊號碼直接撥打</p><div className="flex flex-col gap-4">
                <a href="tel:0955421750" className="text-3xl font-black text-amber-400 hover:text-white transition-colors tracking-tight">0955-421750</a>
                <a href="tel:0981807989" className="text-3xl font-black text-amber-400 hover:text-white transition-colors tracking-tight">0981-807989</a>
              </div></div></div>
            </div>
          </div>
          <div className="h-[450px] w-full rounded-[3rem] overflow-hidden border-8 border-slate-800 shadow-2xl relative group">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1825.1328400000002!2d120.2731!3d23.8554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e999999999999%3A0x9999999999999999!2z576p5Z-O6aaZ6酥6Iit6LGG6IWQ!5e0!3m2!1szh-TW!2stw!4v1700000000000!5m2!1szh-TW!2stw" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center bg-white border-t border-amber-100">
        <p className="text-slate-400 text-xs tracking-[0.4em] font-black uppercase">DACHENG STINKY TOFU © 2026 | Developed by Yi-xiang</p>
      </footer>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-horizontal { 0%, 100% { transform: translateY(-50%) translateX(0); } 50% { transform: translateY(-50%) translateX(10px); } }
        .animate-bounce-horizontal { animation: bounce-horizontal 1.5s infinite ease-in-out; }
      `}</style>
    </div>
  );
}