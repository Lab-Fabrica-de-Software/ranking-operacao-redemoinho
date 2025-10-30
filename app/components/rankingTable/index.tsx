"use client"

import { useMemo, useState } from "react";
import { Ranking } from "@/app/types/score";

interface RankingTableProps {
  title?: string;
  ranking: Ranking;
  onSearch?: () => string;
  showUpdateDate: boolean;
}

export default function RankingTable({ title = "Ranking", ranking, showUpdateDate = true }: RankingTableProps) {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  const totalItems = ranking.scores.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const effectivePage = Math.min(Math.max(1, page), totalPages);

  const visibleScores = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return ranking.scores.slice(start, start + pageSize);
  }, [ranking.scores, effectivePage, pageSize]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const startItem = totalItems === 0 ? 0 : (effectivePage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, effectivePage * pageSize);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 834;

  function formatTimeInMinutes(time: number) {
    let minutes = Math.floor(time);
    let seconds = Math.round((time - minutes) * 60);

    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} min`;
  }


  return (
    <div className="sm:rounded-xl overflow-hidden sm:border-2 border-[#FF6161]">
      <div className="flex flex-row justify-between px-4 py-2 bg-[#D71D1D]">
        <div className="flex flex-row gap-2 items-center">
          <span className="font-bold text-lg">{title}</span>
          {showUpdateDate && !isMobile &&
            <span>({ranking.lastUpdated?.toLocaleString()})</span>
          }
        </div>
        <input type="text" className="px-2 py-1 bg-white rounded-xl text-black" placeholder="Pesquisar" />
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-[#FEEED1] text-black">
            <th>Colocação</th>
            <th>Jogador</th>
            {!isMobile &&
              <>
                <th>Tempo</th>
                <th>Pontuação</th>
              </>
            }
          </tr>
        </thead>

        <tbody>
          {visibleScores.map((score, i) => {
            const index = (effectivePage - 1) * pageSize + i;
            return (
              <tr key={index} className="text-center border-t border-black bg-white text-black">
                <td>#{index + 1}</td>
                <td className="font-bold">{score.playerName}</td>
                {!isMobile &&
                  <>
                    <td>{formatTimeInMinutes(score.time)}</td>
                    <td>{score.score}</td>
                  </>
                }
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="bg-[#D71D1D] py-4 px-2 flex items-center md:justify-between justify-center">
        {!isMobile &&
          <div className="text-white text-sm">
            Mostrando {startItem}–{endItem} de {totalItems}
          </div>
        }

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={page <= 1}
            className="px-3 py-1 rounded-md text-sm font-medium bg-white text-black disabled:opacity-50 cursor-pointer"
          >
            Anterior
          </button>

          <div className="text-white text-sm">{page} / {totalPages}</div>

          <button
            onClick={handleNext}
            disabled={page >= totalPages}
            className="px-3 py-1 rounded-md text-sm font-medium bg-white text-black disabled:opacity-50 cursor-pointer"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  )
}
