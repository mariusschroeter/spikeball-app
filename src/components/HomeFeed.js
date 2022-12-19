import React from 'react'
import FeedItem from "./FeedItem";

export const HomeFeed = ({ games }) => {
  return (
    <div>
      {games.map((game, idx) => {
        return (
          <FeedItem key={idx} game={game} />
        );
      })}
    </div>
  )
}

export default HomeFeed;
