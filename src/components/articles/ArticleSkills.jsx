import "./ArticleSkills.scss"
import React, {useEffect, useState} from 'react'
import Article from "@/components/articles/base/Article.jsx"
import {useUtils} from "@/hooks/utils.js"
import Collapsable from "@/components/capabilities/Collapsable.jsx"
import {useViewport} from "@/providers/ViewportProvider.jsx"
import {useConstants} from "@/hooks/constants.js"
import AvatarView from "@/components/generic/AvatarView.jsx"
import {useLocation} from "@/providers/LocationProvider.jsx"
import {useNavigation} from "@/providers/NavigationProvider.jsx"
import NumberAnimation from "@/components/generic/NumberAnimation.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkills({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-skills`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleSkillsItems dataWrapper={dataWrapper}
                                selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()
    const utils = useUtils()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const customBreakpoint = viewport.getCustomBreakpoint(constants.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES)
    const customBreakpointId = customBreakpoint?.id
    const customBreakpointRowThreshold = customBreakpoint?.slidesPerView || 1

    const maxItemsPerRow = utils.number.clamp(dataWrapper.settings.maxItemsPerRow, 1, customBreakpointRowThreshold)
    const maxRowsCollapseThreshold = dataWrapper.settings.maxRowsCollapseThreshold

    const itemsPerRowClass = `article-skills-items-${Math.min(customBreakpointRowThreshold, maxItemsPerRow)}-per-row`

    const initialVisibleItemsCount = maxRowsCollapseThreshold ?
        maxItemsPerRow * maxRowsCollapseThreshold :
        filteredItems.length

    return (
        <Collapsable className={`article-skills-items ${itemsPerRowClass}`}
                     id={dataWrapper.uniqueId}
                     breakpointId={customBreakpointId}
                     initialVisibleItems={initialVisibleItemsCount}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleSkillsItem itemWrapper={itemWrapper}
                                   key={key}/>
            ))}
        </Collapsable>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItem({ itemWrapper }) {
    const avatarViewClass = itemWrapper.articleWrapper.settings.roundIcons ?
        `article-skills-item-avatar-round` :
        ``

    return (
        <div className={`article-skills-item`}>
            <div className={`article-skills-item-avatar-wrapper`}>
                <AvatarView src={itemWrapper.img}
                            faIcon={itemWrapper.faIconWithFallback}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}
                            className={`article-skills-item-avatar ${avatarViewClass}`}/>
            </div>

            <ArticleSkillsItemInfo itemWrapper={itemWrapper}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItemInfo({ itemWrapper }) {
    const utils = useUtils()
    const navigation = useNavigation()

    const percentage = itemWrapper.percentage
    const [animationPercentage, setAnimationPercentage] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = React.useRef(null)

    const level = itemWrapper.locales.level
    const description = itemWrapper.locales.text
    const experienceTime = itemWrapper.dateStartDisplayAsExperienceTime

    const displayLevel = utils.string.if(level, ` - ${level}`)
    const hasPercentage = utils.number.isValidNumber(percentage)

    const progressStyle = {
        width: `${utils.string.toDisplayPercentage(animationPercentage)}`,
        opacity: percentage ? 0.25 + percentage/75 : 0
    }

    let descriptionClass = `text-3`
    if(percentage) descriptionClass = `text-2`
    if(!experienceTime) descriptionClass += ` mt-1`

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                } else {
                    setIsVisible(false)
                }
            },
            { threshold: 0.1 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    useEffect(() => {
        const isActive = navigation.targetSection?.id === itemWrapper.articleWrapper.sectionId
        if (isActive && isVisible) {
            const timeoutId = setTimeout(() => {
                setAnimationPercentage(percentage)
            }, 50)
            return () => clearTimeout(timeoutId)
        } else {
            setAnimationPercentage(0)
        }
    }, [navigation.targetSection?.id, itemWrapper.articleWrapper.sectionId, percentage, isVisible])

    return (
        <div className={`article-skills-item-info`} ref={ref}>
            <div className={`article-skills-item-title text-5`}>
                <div className={`article-skills-item-title-left-column`}>
                    <span className={`article-skills-item-title-main`}
                          dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

                    {displayLevel && (
                        <span className={`article-skills-item-title-suffix text-5`}
                              dangerouslySetInnerHTML={{__html: displayLevel}}/>
                    )}
                </div>

                <div className={`article-skills-item-title-right-column`}>
                    {percentage && (
                        <NumberAnimation className={`article-skills-item-title-percentage text-3`}
                                         id={`article-skills-item-title-percentage-${itemWrapper.uniqueId}`}
                                         initialValue={0}
                                         updateDelay={30}
                                         targetValue={animationPercentage}
                                         format={`{n}%`}/>
                    )}
                </div>
            </div>

            {hasPercentage && (
                <div className="article-skills-item-progress progress">
                    <div className="progress-bar"
                         role="progressbar"
                         aria-valuenow={animationPercentage}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={progressStyle}/>
                </div>
            )}

            {experienceTime && (
                <div className={`article-skills-item-experience text-2`}>
                    <span dangerouslySetInnerHTML={{__html: experienceTime}}/>
                </div>
            )}

            {description && (
                <div className={`article-skills-item-description ${descriptionClass}`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            )}
        </div>
    )
}

export default ArticleSkills
