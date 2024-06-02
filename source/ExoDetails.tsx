import React from 'react';
import {Box, Text} from 'ink';

export function ExoDetails({exo}) {
    return (
        <Box flexDirection="column" padding={1}>
            <Text color="blue" bold>{exo.title}</Text>
            {exo.errors.map((error, index) => (
                <Box key={index} flexDirection="column" marginBottom={1}>
                    <Text color="red">Erreur: {error.message}</Text>
                    <Text>Résultat obtenu: <Text color="red">{error.actual}</Text></Text>
                    <Text>Résultat attendu: <Text color="green">{error.expected}</Text></Text>
                </Box>
            ))}
        </Box>
    );
}