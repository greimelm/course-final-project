import { useState, useEffect } from 'react';

import {
    Button,
    Box
  } from "@mui/material";

import useStore from "../../stores/useStore";

// functional component to insert when tour generation is needed
const SelectionGrid = () => {
    const { categoryArr, setcategories } = useStore((state) => state);

    useEffect(() => {
        setcategories(categoryArr);
    }, [categoryArr]);

    // state for every button to change variant on click
    const [isRooftop, setIsRooftop] = useState(false);
    const [isSpeakeasy, setIsSpeakeasy] = useState(false);
    const [isHotspot, setIsHotspot] = useState(false);
    const [isAwardwinning, setIsAwardwinning] = useState(false);
    const [hasBarfood, setHasBarfood] = useState(false);
    const [isCigarLounge, setIsCigarLounge] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isFemaleowned, setIsFemaleowned] = useState(false);
    const [isClassic, setIsClassic] = useState(false);
    const [isMixology, setIsMixology] = useState(false);
    const [isQueer, setIsQueer] = useState(false);
    const [hasMusic, setHasMusic] = useState(false);

    const handleClick = (event) => {
        // saving all selected categories in a store array
        // button values equal all app-wide categories to choose from when generating a tour
        const buttonValue = event.target.value;
        
        if (!categoryArr.includes(buttonValue)) {
            categoryArr.push(buttonValue);
        } else {
            categoryArr.splice(categoryArr.indexOf(buttonValue), 1);
        }
        console.log(categoryArr);

        switch (buttonValue) {
            case 'rooftop':
                setIsRooftop(!isRooftop);
                break;
            case 'speakeasy':
                setIsSpeakeasy(!isSpeakeasy);
                break;
            case 'hot spot':
                setIsHotspot(!isHotspot);
                break;
            case 'award winning':
                setIsAwardwinning(!isAwardwinning);
                break;
            case 'bar food':
                setHasBarfood(!hasBarfood);
                break;
            case 'cigars':
                setIsCigarLounge(!isCigarLounge);
                break;
            case 'vegan':
                setIsVegan(!isVegan);
                break;
            case 'female-owned':
                setIsFemaleowned(!isFemaleowned);
                break;
            case 'classic':
                setIsClassic(!isClassic);
                break;
            case 'mixology':
                setIsMixology(!isMixology);
                break;
            case 'queer':
                setIsQueer(!isQueer);
                break;
            case 'music':
                setHasMusic(!hasMusic);
                break;

        }
    }
    

    return (
        <Box sx={{m:'3rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', maxWidth: '80vw'}}>
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isRooftop ? 'contained' : 'outlined'}
                    value='rooftop'
                    onClick={handleClick}
                    >
                        Rooftop
                    </Button>
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isSpeakeasy ? 'contained' : 'outlined'}
                    value='speakeasy'
                    onClick={handleClick}
                    >
                        Speakeasy
                    </Button>
                
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isHotspot ? 'contained' : 'outlined'}
                    value='hot spot'
                    onClick={handleClick}
                    >
                        Hot Spot
                    </Button>
                
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isAwardwinning ? 'contained' : 'outlined'}
                    value='award winning'
                    onClick={handleClick}
                    >
                        Award winning
                    </Button>
           
       
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={hasBarfood ? 'contained' : 'outlined'}
                    value='bar food'
                    onClick={handleClick}
                    >
                        Nice Bar Food
                    </Button>
                
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isCigarLounge ? 'contained' : 'outlined'}
                    value='cigars'
                    onClick={handleClick}
                    >
                        Cigar lounge
                    </Button>
               
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isVegan ? 'contained' : 'outlined'}
                    value='vegan'
                    onClick={handleClick}
                    >
                        Vegan options
                    </Button>
               
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isFemaleowned ? 'contained' : 'outlined'}
                    value='female-owned'
                    onClick={handleClick}
                    >
                        Female-owned bars
                    </Button>
               
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isClassic ? 'contained' : 'outlined'}
                    value='classic'
                    onClick={handleClick}
                    >
                        Classic
                    </Button>
               
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isMixology ? 'contained' : 'outlined'}
                    value='mixology'
                    onClick={handleClick}
                    >
                        Mixology mention
                    </Button>
             
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={isQueer ? 'contained' : 'outlined'}
                    value='queer'
                    onClick={handleClick}
                    >
                        LGBTQ+ safe space
                    </Button>
               
                    <Button
                    sx={{ mb: '2rem', mr: '1vw' }}
                    variant={hasMusic ? 'contained' : 'outlined'}
                    value='music'
                    onClick={handleClick}
                    >
                        Live Music/DJ
                    </Button>
               
        </Box>
    );
};

export default SelectionGrid;