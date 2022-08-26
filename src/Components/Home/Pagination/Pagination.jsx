import React from "react";
import "./Pagination.css"


const Pagination = ({page,gamesPerPage,totalGames}) => {
    const numPage = [];
    if(totalGames <= gamesPerPage){
        return (<div></div>)
    }else {
        for(let i=0; i<= Math.ceil(totalGames/gamesPerPage); i++ ){
            numPage.push(i)
        }
        return  <nav>
            <ul>
                {numPage.map((arg) => {
                    if(arg !== 0){
                        return <button className="btn" key={arg} onClick={() => page(arg)}>{arg}</button>
                    }
                })}
            </ul>
        </nav>
    }
}

export default Pagination;