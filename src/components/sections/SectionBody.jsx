import "./SectionBody.scss"
import React, {useEffect, useState} from 'react'
import {useParser} from "@/hooks/parser.js"
import ArticleCards from "@/components/articles/ArticleCards.jsx"
import ArticleContactForm from "@/components/articles/ArticleContactForm.jsx"
import ArticleFacts from "@/components/articles/ArticleFacts.jsx"
import ArticleInfoList from "@/components/articles/ArticleInfoList.jsx"
import ArticleInlineList from "@/components/articles/ArticleInlineList.jsx"
import ArticleNotFound from "@/components/articles/ArticleNotFound.jsx"
import ArticlePortfolio from "@/components/articles/ArticlePortfolio.jsx"
import ArticleStack from "@/components/articles/ArticleStack.jsx"
import ArticleSkills from "@/components/articles/ArticleSkills.jsx"
import ArticleTestimonials from "@/components/articles/ArticleTestimonials.jsx"
import ArticleText from "@/components/articles/ArticleText.jsx"
import ArticleThread from "@/components/articles/ArticleThread.jsx"
import ArticleTimeline from "@/components/articles/ArticleTimeline.jsx"

function SectionBody({ section }) {
    const parser = useParser()
    const articleDataWrappers = parser.parseSectionArticles(section)

    return (
        <div className={`section-body`}>
            {articleDataWrappers && articleDataWrappers.map((dataWrapper, key) => {
                const Component = SectionBody.ARTICLES[dataWrapper.component] || ArticleNotFound
                return <Component dataWrapper={dataWrapper}
                                  id={key}
                                  key={key}/>
            })}
        </div>
    )
}

SectionBody.ARTICLES = {
    ArticleCards,
    ArticleContactForm,
    ArticleFacts,
    ArticleInfoList,
    ArticleInlineList,
    ArticleNotFound,
    ArticlePortfolio,
    ArticleSkills,
    ArticleStack,
    ArticleTestimonials,
    ArticleText,
    ArticleThread,
    ArticleTimeline
}

export default SectionBody