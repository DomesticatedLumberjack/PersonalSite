import React, { useEffect, useState } from "react"
import { Fade, Jumbotron, Image } from "react-bootstrap"
import { IBlogPost } from "../../app/Domain/IBlogPost";
import { sleep } from "../../Tools/Sleep";


export const BlogPost: React.FC<{post: IBlogPost, index: number}> = ({post, index}) => {
    const [fadeIn, setFadeIn] = useState(false);
    const imagePath = 'assets/';

    useEffect(() => {
        handleFadeIn();
    })

    const handleFadeIn = async () => {
        await sleep(index * 125);
        setFadeIn(true);
    }

    const handleImage = () => {
        if(post.imagePaths.length > 0)
        {
            let returnHTML = [];
            let imagePathsArray = post.imagePaths.split(', ');
            for(let i = 0; i < imagePathsArray.length; i++)
            {
                returnHTML[i] = <Image fluid rounded key={imagePathsArray[i]} src={imagePath + post.id + '/' + imagePathsArray[i]}/>;
            }
            return returnHTML;
        }
    }

    const handleDate = () => {
        let dateInfo = post.date.toString().split('T')[0].split('-');
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[parseInt(dateInfo[1]) - 1] + " " + dateInfo[2] + ", " + dateInfo[0];
    }

    return(
        <>
            <Fade in={fadeIn}>
                <Jumbotron style={{backgroundColor: "#FFFFFF"}} className="border-bottom box-shadow mb-3">
                    <h1>{post.title}</h1>
                    <p>{handleDate()}</p>
                    <p>{post.content}</p>
                    {handleImage()}
                </Jumbotron>
            </Fade>
        </>
    );
    
}
