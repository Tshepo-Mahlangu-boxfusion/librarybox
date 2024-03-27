import { createStyles,css } from "antd-style";

export const useStyles=createStyles({
  main:css`
  background-color:#eab676;
  
  `,
   scroll:css`
   overflow-y:auto;
   height:72vh;
   &::-webkit-scrollbar {
       width: 5px;
     }
   
     &::-webkit-scrollbar-thumb {
     
       border-radius: 5px;
     }
   `
   
})