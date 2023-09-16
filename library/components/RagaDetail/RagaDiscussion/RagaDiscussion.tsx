import { Tabs } from '@mantine/core';
import { IconBrandYoutube, IconMessageCircle, IconMusic } from '@tabler/icons-react';
import { useState } from 'react';
import useStyles from './RagaDiscussion.styles'
import { Discuss } from './Discuss/Discuss';
import { Watch } from './Watch/Watch';

export const RagaDiscussion = () => {
    const { classes } = useStyles();
    const [activeTab, setActiveTab] = useState<string | null>('discuss');
    
    return (
        <Tabs value={activeTab} onTabChange={setActiveTab} 
        classNames={{
            tabsList: classes.tabsList,
            tab: classes.tab
            }}>
            <Tabs.List>
                <Tabs.Tab icon={<IconMessageCircle size="0.8rem" />} value="discuss">
                    Discuss
                </Tabs.Tab>
                <Tabs.Tab icon={<IconBrandYoutube size="0.8rem" />} value="videos">
                    Watch
                </Tabs.Tab>
                <Tabs.Tab icon={<IconMusic size="0.8rem" />} value="music">
                    Listen
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="discuss" pt="xs">
                <Discuss/>
            </Tabs.Panel>

            <Tabs.Panel value="videos" pt="xs">
                <Watch/>
            </Tabs.Panel>

            <Tabs.Panel value="music" pt="xs">
                Music tab content
            </Tabs.Panel>
        </Tabs>
    )
}
