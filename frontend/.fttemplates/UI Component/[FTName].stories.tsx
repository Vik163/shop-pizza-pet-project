import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { <FTName | capitalize> } from './[FTName]';

export default {
    title: 'widgets/[FTName]',
    component: <FTName | capitalize>,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof <FTName | capitalize>>;

const Template: ComponentStory<typeof <FTName | capitalize>> = (args) => <<FTName | capitalize> {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
