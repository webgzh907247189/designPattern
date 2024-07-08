import React from "react";
import router from 'next/router'
export default function profile(App, style) {
  return <div>
    <style jsx>{`
      .jump {
        color: green;
      }
    `}</style>
    <div onClick={ () => router.back() } className="jump">jump href </div>
    profile--profile
  </div>;
}
