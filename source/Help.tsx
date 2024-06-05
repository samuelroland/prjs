import React from 'react';
import { Text, Box } from 'ink';

type Shortcut = {
    key: string;
    description: string;
};

export default function Help({shortcuts}:{shortcuts: Shortcut[]}){
    // return (
    //     <Box flexDirection="column" padding={1}>
    //         <Text color="green" bold>Help Page</Text>
    //         <Text>Press 'escape' to go back.</Text>
    //         <Text>Press '?' to view this help page.</Text>
    //         <Text>j - Next item</Text>
    //         <Text>k - Previous item</Text>
    //         <Text>h - Switch to files list</Text>
    //         <Text>l - Switch to exos list</Text>
    //     </Box>
    // );
    return (
        <Box flexDirection="column" padding={1}>
            <Text color="green" bold>Help Page</Text>
            {shortcuts.map((shortcut, index) => (
                <Text key={index}>Press '{shortcut.key}' to {shortcut.description}.</Text>
            ))}
        </Box>
    );
};


