"use client";

import { useMemo, useState } from "react";
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
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 834;

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
    const start = (effectivePage - 1) * pageSize;
    return filteredScores.slice(start, start + pageSize);
  }, [filteredScores, effectivePage]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const startItem =
    totalItems === 0 ? 0 : (effectivePage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, effectivePage * pageSize);

  const formatTimeInMinutes = (time: number) => {
    const minutes = Math.floor(time);
    const seconds = Math.round((time - minutes) * 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )} min`;
  };

  return (

    <div className="sm:rounded-xl overflow-hidden sm:border-2 border-[#FF6161]" >
      <div className="flex flex-row justify-between px-4 py-2 bg-[#D71D1D]">
        <div className="flex flex-row gap-2 items-center text-white">
          <span className="font-bold text-lg">{title}</span>
          {showUpdateDate && !isMobile && ranking.lastUpdated && (
            <span className="text-sm opacity-90">
              ({ranking.lastUpdated.toLocaleString('pt-BR')})
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
          className="px-2 py-1 bg-white rounded-xl text-black text-sm outline-none"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-[#FEEED1] text-black">
            <th>Colocação</th>
            <th>Jogador</th>
            {!isMobile && (
              <>
                <th>Tempo</th>
                <th>Pontuação</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {visibleScores.length > 0 ? (
            visibleScores.map((score, i) => {
              const index = (effectivePage - 1) * pageSize + i + 1;
              return (
                <tr
                  key={`${score.playerName}-${index}`}
                  className="text-center border-t border-black bg-white text-black"
                >
                  <td>#{index}</td>
                  <td className="font-bold">{score.playerName}</td>
                  {!isMobile && (
                    <>
                      <td>{formatTimeInMinutes(score.time)}</td>
                      <td>{score.score}</td>
                    </>
                  )}
                </tr>
              );
            })
          ) : (
            <tr className="text-center border-t border-black bg-white text-black">
              <td colSpan={isMobile ? 2 : 4}>Nenhum resultado encontrado</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="bg-[#D71D1D] py-4 px-2 flex items-center md:justify-between justify-center">
        {!isMobile && (
          <div className="text-white text-sm">
            Mostrando {startItem}–{endItem} de {totalItems}
          </div>
        )}

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
    </div >
  );
}
