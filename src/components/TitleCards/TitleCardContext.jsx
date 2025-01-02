import { createContext, useContext } from "react";


const TitleCardsContext=createContext()

export const TitleCardsProvider=({children})=>{
    const cardsData = [
        { title: "Blockbuster Movies", category: "top_rated" },
        { title: "Only on Netflix", category: "popular" },
        { title: "Upcoming", category: "upcoming" },
        { title: "Top Picks for You", category: "now_playing" },
      ];

      return(
        <TitleCardsContext.Provider value={cardsData}>
            {children}
        </TitleCardsContext.Provider>
      )
}

export const useTitleCardsContext=()=>useContext(TitleCardsContext)