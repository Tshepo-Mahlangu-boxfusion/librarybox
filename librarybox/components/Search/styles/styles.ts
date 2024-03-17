import { createStyles,css } from "antd-style";

export const useStyles=createStyles({
    container:css` 
    position: relative; /* Change to relative position */
    bottom: 0;
   `,  
    searchContainer:css`
    margin:50px;
    padding:50px;
    `,
    searchBox:css`
    width:50%;
    `,
    searchCard:css`
    background: #fff;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 5px 15px 5px 2px rgba(0, 0, 0, 0.09);
    transition: background 0.3s ease-in-out;
    overflow: hidden;
    height:250px;
    width:300px

    `,
    data:css`
    grid-gap: 30px;
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top:10px;
    width:1000px;
    align-items:center;
    margin-left:330px;
    `
})