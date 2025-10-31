import type { Meta, StoryObj } from '@storybook/nextjs';
import RankingTable from '.';

const meta: Meta<typeof RankingTable> = {
    title: 'COMPONENTS/RankingTable',
    component: RankingTable,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof RankingTable>;


export const Default: Story = {
    args: {
        ranking: {
            scores: [
                { playerName: 'Alice', time: 2, score: 150, position: 1 },
                { playerName: 'Bob', time: 2, score: 120, position: 2 },
                { playerName: 'Charlie', time: 2, score: 200, position: 3 },
                { playerName: 'Diana', time: 2, score: 130, position: 4 },
                { playerName: 'Roberto', time: 2, score: 200, position: 5 },
                { playerName: 'Alice', time: 2, score: 150, position: 6 },
                { playerName: 'Bob', time: 2, score: 120, position: 7 },
                { playerName: 'Charlie', time: 2, score: 200, position: 8 },
                { playerName: 'Diana', time: 2, score: 130, position: 9 },
                { playerName: 'Roberto', time: 2, score: 200, position: 10 },
                { playerName: 'Alice', time: 2, score: 150, position: 11 },
                { playerName: 'Bob', time: 2, score: 120, position: 12 },
                { playerName: 'Charlie', time: 2, score: 200, position: 13 },
                { playerName: 'Diana', time: 2, score: 130, position: 14 },
            ],
            lastUpdated: new Date()
        }
    },
};