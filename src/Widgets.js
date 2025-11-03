import React from 'react';
import './Widgets.css';
import { FiberManualRecord, Info } from '@mui/icons-material';
function Widgets() {

    const newsArticle = (heading,subtitle) => {
        return (<div className='WidgetsArticle'>
            <div className='WidgetsArticleLeft'>
                <FiberManualRecord/>
            </div>
            <div className='WidgetsArticleRight'>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        
        </div>)
    }
  return (
    <div className='Widgets'>
        <div className='WidgetsHeader'>
            <h2>LinkedIn News</h2>
            <Info/>
        </div>
        {newsArticle("News 1","Huge Readers, great work")}
        {newsArticle("News 2","Huge Readers, great work")}
        {newsArticle("News 3","Huge Readers, great work")}
        {newsArticle("News 4","Huge Readers, great work")}
        {newsArticle("News 5","Huge Readers, great work")}
    </div>
  )
}

export default Widgets;