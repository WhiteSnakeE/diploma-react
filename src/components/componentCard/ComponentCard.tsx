import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../componentCard/ComponentCard.css'



interface ComponentCardProps {
    image: string,
    name: string,
    price: number,
}

export const ComponentCard: React.FC<ComponentCardProps> = ({image ,name, price}) => {

    console.log(image)
    console.log(name)
    console.log(price)

    const myImage = require(`../../images/processors/${image}.webp`) as string;

    const theme = useTheme();

    return (
        <Card className="card">
            <CardMedia
                component="img"
                sx={{ width: 100, marginRight: 'auto'}}
                image={myImage}
                alt="Live from space album cover"
            />
            <Box className="content">
                <CardContent className="content-text">
                    <Typography variant="h6">
                       Процессор {name}
                    </Typography>
                    {/*<Typography variant="subtitle1" color="text.secondary">*/}
                    {/*    Вот он справа ай 9 кор анлокед ваще супмер*/}
                    {/*</Typography>*/}
                </CardContent>
                <Box className="footer">
                    Цена вопроса: {price}
                </Box>
            </Box>
        </Card>
    );
}