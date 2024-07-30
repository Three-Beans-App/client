import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useState } from 'react';



export default function Star(){

    const [ isClick, setIsClick ] = useState(false)

    const handleStarOnClick = () => {
        setIsClick(!isClick);
    }

    return(
        <div className="star" onClick={handleStarOnClick}>
            {isClick ? <StarOutlinedIcon /> :  <StarBorderIcon/>}
        </div>
    )
}