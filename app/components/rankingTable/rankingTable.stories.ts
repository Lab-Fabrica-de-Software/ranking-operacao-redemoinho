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
                { playerName: 'Alice', time: 2, score: 150 },
                { playerName: 'Bob', time: 2, score: 120 },
                { playerName: 'Charlie', time: 2, score: 200 },
                { playerName: 'Diana', time: 2, score: 130 },
                { playerName: 'Roberto', time: 2, score: 200 },
                { playerName: 'Alice', time: 2, score: 150 },
                { playerName: 'Bob', time: 2, score: 120 },
                { playerName: 'Charlie', time: 2, score: 200 },
                { playerName: 'Diana', time: 2, score: 130 },
                { playerName: 'Roberto', time: 2, score: 200 },
                { playerName: 'Alice', time: 2, score: 150 },
                { playerName: 'Bob', time: 2, score: 120 },
                { playerName: 'Charlie', time: 2, score: 200 },
                { playerName: 'Diana', time: 2, score: 130 },
            ],
            lastUpdated: new Date()
        }
    },
};