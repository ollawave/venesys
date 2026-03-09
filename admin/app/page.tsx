"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  country: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const markAsRead = async (id: number) => {
    await supabase.from("inquiries").update({ is_read: true }).eq("id", id);
    fetchInquiries();
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await supabase.from("inquiries").delete().eq("id", id);
    setSelected(null);
    fetchInquiries();
  };

  const handleSelect = (inquiry: Inquiry) => {
    setSelected(inquiry);
    if (!inquiry.is_read) markAsRead(inquiry.id);
  };

  return (
    <div className="min-h-screen flex">
      {/* 사이드바 - 문의 목록 */}
      <div className="w-96 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg font-bold">VENESYS Admin</h1>
          <button onClick={fetchInquiries} className="text-sm text-blue-600 hover:underline">새로고침</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="p-4 text-gray-400">로딩 중...</p>
          ) : inquiries.length === 0 ? (
            <p className="p-4 text-gray-400">문의가 없습니다.</p>
          ) : (
            inquiries.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                  selected?.id === item.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!item.is_read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                  <p className={`text-sm truncate ${!item.is_read ? "font-semibold" : ""}`}>{item.subject}</p>
                </div>
                <p className="text-xs text-gray-500">{item.name} · {new Date(item.created_at).toLocaleDateString("ko")}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 상세 보기 */}
      <div className="flex-1 bg-white">
        {selected ? (
          <div className="p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{selected.subject}</h2>
              <button onClick={() => deleteInquiry(selected.id)} className="text-sm text-red-500 hover:underline">삭제</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div><span className="text-gray-400">이름</span><p>{selected.name}</p></div>
              <div><span className="text-gray-400">이메일</span><p>{selected.email}</p></div>
              <div><span className="text-gray-400">국가</span><p>{selected.country}</p></div>
              <div><span className="text-gray-400">연락처</span><p>{selected.phone}</p></div>
              <div><span className="text-gray-400">접수일</span><p>{new Date(selected.created_at).toLocaleString("ko")}</p></div>
            </div>
            <div className="border-t pt-4">
              <p className="text-gray-400 text-sm mb-2">메시지</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-300">
            문의를 선택하세요
          </div>
        )}
      </div>
    </div>
  );
}
