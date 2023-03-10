import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{
  const [articles, setArticles]= useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
 

   const capitalizeFirstLetter = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    
 
  
const updateNews = async ()=> {
  
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9fae1a78011b487f94dcfb866ea1dacc&page=${page}&pageSize=${props.pageSize}`;
  

  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData );
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
 }
useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsToday`;
  updateNews();
},[]);



  const fetchMoreData =async() => {
  
   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9fae1a78011b487f94dcfb866ea1dacc&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page+1)
   let data = await fetch(url);
   let parsedData = await data.json();
   
   setArticles(articles.concat(parsedData.articles))
   setTotalResults(parsedData.totalResults)
  };

  
   return (
    <>
      
        <h1 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>NewsToday - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {props.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">

         
            <div className="row">
            {articles.map((element)=>{
               return <div className="col-md-4" key={element.url}>
                 <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
               </div>
            })}    
        
         </div>
        </div>
        </InfiniteScroll>
     </>
    )
  }

// News.defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general'
// }

// News.propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
// }

export default News