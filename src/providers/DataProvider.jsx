/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 * @description This provider is responsible for loading and providing the data for the application.
 */

"use client"

import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUtils} from "@/hooks/utils.js"

function DataProvider({ children, settings }) {
    const utils = useUtils()

    const DataProviderStatus = {
        STATUS_IDLE: "data_provider_status_idle",
        STATUS_PREPARING_FOR_LOADING: "data_provider_status_preparing_for_loading",
        STATUS_LOADING: "data_provider_status_loading",
        STATUS_LOADED: "data_provider_status_loaded",
        STATUS_EVALUATED: "data_provider_status_evaluated",
    }

    const [status, setStatus] = useState(DataProviderStatus.STATUS_IDLE)
    const [jsonData, setJsonData] = useState({})

    /** @constructs **/
    useEffect(() => {
        if(status !== DataProviderStatus.STATUS_IDLE)
            return

        setStatus(DataProviderStatus.STATUS_PREPARING_FOR_LOADING)
    }, [])

    /** @listens DataProviderStatus.STATUS_PREPARING_FOR_LOADING **/
    useEffect(() => {
        if(status !== DataProviderStatus.STATUS_PREPARING_FOR_LOADING)
            return

        setJsonData({})

        setStatus(DataProviderStatus.STATUS_LOADING)
    }, [status])

    /** @listens DataProviderStatus.STATUS_LOADING **/
    useEffect(() => {
        if(status !== DataProviderStatus.STATUS_LOADING)
            return

        _loadData().then(response => {
            setJsonData(response)
            setStatus(DataProviderStatus.STATUS_LOADED)
        }).catch(error => {
            console.error("Failed to load data:", error)
            utils.log.throwError("DataProvider", "Failed to load application data. Please check the console for more details.")
        })
    }, [status])

    /** @listens DataProviderStatus.STATUS_LOADED **/
    useEffect(() => {
        if(status !== DataProviderStatus.STATUS_LOADED)
            return

        const validation = _validateData()
        if(!validation.success) {
            utils.log.throwError("DataProvider", validation.message)
            return
        }

        setStatus(DataProviderStatus.STATUS_EVALUATED)
    }, [status])

    const _loadData = async () => {
        const [jStrings, jProfile, jCategories, jSections] = await Promise.all([
            utils.file.loadJSON("/data/strings.json"),
            utils.file.loadJSON("/data/profile.json"),
            utils.file.loadJSON("/data/categories.json"),
            utils.file.loadJSON("/data/sections.json")
        ])

        if(!jStrings || !jProfile || !jCategories || !jSections) {
            utils.log.throwError("DataProvider", "One or more data files failed to load. Please check if the files exist in the public/data directory.")
            return null
        }

        const categories = jCategories.categories || []
        const sections = jSections.sections || []
        _bindCategoriesAndSections(categories, sections)
        await _loadSectionsData(sections)

        return {
            strings: jStrings,
            profile: jProfile,
            settings: settings,
            sections: sections,
            categories: categories
        }
    }

    const _bindCategoriesAndSections = (categories, sections) => {
        for(const category of categories) {
            category.sections = []
        }

        for(const section of sections) {
            const sectionCategoryId = section["categoryId"]
            const sectionCategory = categories.find(category => category.id === sectionCategoryId)
            if(!sectionCategory) {
                utils.log.throwError("DataProvider", `Section with id "${section.id}" has invalid category id "${sectionCategoryId}". Make sure the category exists within categories.json`)
                return
            }

            sectionCategory.sections.push(section)
            section.category = sectionCategory
        }
    }

    const _loadSectionsData = async (sections) => {
        const promises = sections.map(async (section) => {
            const sectionJsonPath = section.jsonPath
            if(sectionJsonPath) {
                try {
                    section.data = await utils.file.loadJSON(sectionJsonPath) || {}
                } catch (e) {
                    section.data = {}
                }
            }
        })
        await Promise.all(promises)
    }

    const _validateData = () => {
        if(!jsonData || !jsonData.categories) {
            return {success: true}
        }

        const emptyCategories = jsonData.categories.filter(category => !category.sections || category.sections.length === 0)
        const emptyCategoriesIds = emptyCategories.map(category => category.id)
        if(emptyCategories.length > 0) {
            return {
                success: false,
                message: `The following ${emptyCategories.length} categories are empty: "${emptyCategoriesIds}". Make sure all categories have at least one section.`
            }
        }

        return {success: true}
    }

    const getProfile = () => {
        return jsonData?.profile || {}
    }

    const getSettings = () => {
        return jsonData?.settings || {}
    }

    const getStrings = () => {
        return jsonData?.strings || {}
    }

    const getSections = () => {
        return jsonData?.sections || []
    }

    const getCategories = () => {
        return jsonData?.categories || []
    }

    return (
        <DataContext.Provider value={{
            getProfile,
            getSettings,
            getStrings,
            getSections,
            getCategories
        }}>
            {status === DataProviderStatus.STATUS_EVALUATED && (
                <>{children}</>
            )}
        </DataContext.Provider>
    )
}

const DataContext = createContext(null)
/**
 * @return {{
 *    getProfile: Function,
 *    getSettings: Function,
 *    getStrings: Function,
 *    getSections: Function,
 *    getCategories: Function
 * }}
 */
export const useData = () => useContext(DataContext)

export default DataProvider