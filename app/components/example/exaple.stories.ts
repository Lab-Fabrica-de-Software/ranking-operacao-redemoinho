import type { Meta, StoryObj } from '@storybook/nextjs';
import Example from '.';

const meta: Meta<typeof Example> = {
    title: 'COMPONENTS/Example',
    component: Example,
    parameters: {
        layout: 'centered',
    },
    args: {
        text: 'Example Component',
        variant: 'primary',
    }
};

export default meta;
type Story = StoryObj<typeof Example>;


export const Primary: Story = {
    args: {
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
};

export const Custom: Story = {
    args: {
        text: 'Custom Example',
        className: 'text-2xl font-bold',
    },
};