import "./Logo.scss"
import React, {useEffect, useState, useRef} from 'react'
import {useUtils} from "@/hooks/utils.js"

function Logo({ className = "", style = {}, size, setDidLoad }) {
    const utils = useUtils()
    const imgRef = useRef(null)

    className = className || ``
    size = utils.number.forceIntoBounds(size, 0, 3, 3)

    const sizeClass = `logo-wrapper-size-${size}`

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setDidLoad && setDidLoad(true)
        }
    }, [])

    return (
        <div className={`logo-wrapper ${sizeClass} ${className}`}
             style={style}>
            <img ref={imgRef}
                 src={utils.file.resolvePath(`/images/svg/logo.svg`)}
                 onLoad={() => { setDidLoad && setDidLoad(true) }}
                 onError={() => { setDidLoad && setDidLoad(true) }}
                 alt={`logo`}/>
        </div>
    )
}

export default Logo