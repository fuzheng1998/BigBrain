import * as React from 'react';
import {useContext, useEffect} from 'react';
import {Box, Grid} from "@mui/material";
import GameCard from "./GameCard";
import {QUIZ} from "../config";
import {userContext} from "../App";
import {useNavigate} from "react-router-dom";

export default function GameCardLayout() {
    let navigate = useNavigate();
    const [user,] = useContext(userContext);
    const [quizCollection, setQuizCollection] = React.useState([]);

    // const slicedQuizCollection = (quizCollection)=>{
    //     let result = [];
    //     for(let i=0,len=quizCollection.length;i<len;i+=2){
    //         result.push(quizCollection.slice(i,i+2));
    //     }
    //     console.log(result);
    //     return result
    // }

    useEffect( () => {
        fetch(QUIZ.GET_LIST_URL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else if (res.status === 403) {
                navigate('../login');
            }
            else {
                return res.json().then(err => {
                    throw new Error(`${res.status} ${res.statusText} [${err["error"]}]`);
                });
            }
        }).then(qzs => {
            // let result = [];
            // let quizArray = qzs['quizzes']
            // for(let i=0,len=quizArray.length;i<len;i+=3){
            //     result.push(quizArray.slice(i,i+3));
            // }
            // setQuizCollection(result);
            setQuizCollection(qzs['quizzes']);
            console.log(qzs['quizzes'])
            console.log(result)
        }).catch(err => console.log(err));

    }, []);
    console.log(quizCollection);


    // console.log(result);
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1}>
                {/* <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <GameCard />
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                    <Grid item xs={4}>
                        <GameCard/>
                    </Grid>
                </Grid> 
                <Grid container item spacing={3}>
                   <Grid item xs={4}>
                       <GameCard/>
                   </Grid>
                   <Grid item xs={4}>
                       <GameCard/>
                   </Grid>
                   <Grid item xs={4}>
                       <GameCard/>
                   </Grid>
                </Grid>*/}

                {quizCollection.map((quizItem,i) => {
                    return (
                        <Grid item xs={4} key={i}>
                            <GameCard gameData ={quizItem}/>
                        </Grid>
                    );
                })}

                {/* {quizCollection.map((rowData, row_idx) => {
                    return <GameCardRow rowData={rowData} key={row_idx}/>
                })} */}

            </Grid>
        </Box>
    );
};

// function GameCardRow(props) {
//     const rowData = props.rowData
//     return (
//         <Grid container item spacing={3}>
//             {rowData.map(
//                 (itemData, col_idx)=>{
//                     // console.log(itemData);
//                     return (
//                         <Grid item xs={4} key={col_idx}>
//                             <GameCard gameData ={itemData} />
//                         </Grid>
//                     )
//                 }
//             )}

//         </Grid>
//     );
// }
