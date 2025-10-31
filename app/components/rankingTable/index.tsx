"use client";

import { useMemo, useState, useEffect } from "react";
import { Ranking } from "@/app/types/score";

interface RankingTableProps {
  title?: string;
  ranking: Ranking;
  showUpdateDate?: boolean;
}

export default function RankingTable({
  title = "Ranking",
  ranking,
  showUpdateDate = true,
}: RankingTableProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 834);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredScores = useMemo(() => {
    if (!searchTerm) return ranking.scores;
    const term = searchTerm.toLowerCase();
    return ranking.scores.filter((score) =>
      score.playerName.toLowerCase().includes(term)
    );
  }, [ranking.scores, searchTerm]);

  const totalItems = filteredScores.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const effectivePage = Math.min(Math.max(1, page), totalPages);

  const visibleScores = useMemo(() => {
    if (isMobile) return filteredScores;
    const start = (effectivePage - 1) * pageSize;
    return filteredScores.slice(start, start + pageSize);
  }, [filteredScores, effectivePage, isMobile]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const startItem = totalItems === 0 ? 0 : (effectivePage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, effectivePage * pageSize);

  const formatTimeInMinutes = (time: number) => {
    const minutes = Math.floor(time);
    const seconds = Math.round((time - minutes) * 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )} min`;
  };

  const getPlacementEmoji = (position: number) => {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return position <= 10 ? "🌪️" : "";
    }
  };

  return (
    <div className="md:w-[80%] mx-auto">
      <div className="sm:rounded-xl overflow-hidden sm:border-2 border-[#664138]">
        <div className="flex flex-col md:flex-row md:justify-between items-center px-4 py-2 bg-[#9D6D47] gap-2">
          <div className="flex flex-row gap-2 items-center text-white">
            <span className="font-bold text-lg">{title}</span>
            {showUpdateDate && !isMobile && ranking.lastUpdated && (
              <span className="text-sm opacity-90">
                ({new Date(ranking.lastUpdated).toLocaleString("pt-BR")})
              </span>
            )}
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setPage(1);
              setSearchTerm(e.target.value);
            }}
            placeholder="Pesquisar"
            className="px-2 py-1 bg-white rounded-xl text-black text-sm outline-none w-full md:w-auto"
          />
        </div>

        <table className="w-full mb-15 md:m-0">
          {!isMobile && (
            <thead>
              <tr className="bg-[#FEEED1] text-black">
                <th>Colocação</th>
                <th>Jogador</th>
                <th>Tempo</th>
                <th>Pontuação</th>
              </tr>
            </thead>
          )}

          <tbody>
            {visibleScores.length > 0 ? (
              visibleScores.map((score, i) => {
                const position = score.position ?? i + 1;
                const emoji = getPlacementEmoji(position);

                return (
                  <tr
                    key={`${score.playerName}-${position}`}
                    className="text-center border-t border-black/50 bg-white text-black"
                  >
                    {isMobile ? (
                      <td colSpan={2} className="py-2">
                        <div className="flex flex-col items-center">
                          <span className="font-bold">
                            {emoji} #{position} {score.playerName}
                          </span>
                          <span className="text-sm text-gray-700">
                            {formatTimeInMinutes(score.time)} — {score.score} pts
                          </span>
                        </div>
                      </td>
                    ) : (
                      <>
                        <td>
                          {emoji} #{position}
                        </td>
                        <td className="font-bold">{score.playerName}</td>
                        <td>{formatTimeInMinutes(score.time)}</td>
                        <td>{score.score}</td>
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr className="text-center border-t border-black/50 bg-white text-black">
                <td colSpan={isMobile ? 2 : 4}>Nenhum resultado encontrado</td>
              </tr>
            )}
          </tbody>
        </table>

        {!isMobile && (
          <div className="bg-[#9D6D47] py-4 px-2 flex items-center md:justify-between justify-center">
            <div className="text-white text-sm">
              Mostrando {startItem}–{endItem} de {totalItems}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={page <= 1}
                className="px-3 py-1 rounded-md text-sm font-medium bg-white text-black disabled:opacity-50 cursor-pointer"
              >
                Anterior
              </button>

              <div className="text-white text-sm">
                {page} / {totalPages}
              </div>

              <button
                onClick={handleNext}
                disabled={page >= totalPages}
                className="px-3 py-1 rounded-md text-sm font-medium bg-white text-black disabled:opacity-50 cursor-pointer"
              >
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
