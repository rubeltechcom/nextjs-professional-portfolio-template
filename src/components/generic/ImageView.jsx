import "./ImageView.scss"
import React, {useEffect, useState, useRef} from 'react'
import {useConstants} from "@/hooks/constants.js"
import {Spinner} from "react-bootstrap"
import {useUtils} from "@/hooks/utils.js"

function ImageView({ src, alt = "", className = "", id = null, hideSpinner = false, style = null, onStatus = null }) {
    const [loadStatus, setLoadStatus] = useState(ImageView.LoadStatus.LOADING)
    const utils = useUtils()
    const resolvedSrc = utils.file.resolvePath(src)

    /** Reset status when src changes **/
    useEffect(() => {
        if (!src) {
            setLoadStatus(ImageView.LoadStatus.ERROR)
        } else {
            setLoadStatus(ImageView.LoadStatus.LOADING)
        }
    }, [src])

    /** Notify parent of status changes **/
    useEffect(() => {
        if (onStatus) {
            onStatus(loadStatus)
        }
    }, [loadStatus, onStatus])

    const _onLoad = () => {
        setLoadStatus(ImageView.LoadStatus.LOADED)
    }

    const _onError = () => {
        setLoadStatus(ImageView.LoadStatus.ERROR)
    }

    const spinnerVisible = loadStatus === ImageView.LoadStatus.LOADING && !hideSpinner
    const containerVisible = loadStatus === ImageView.LoadStatus.LOADED
    const errorVisible = loadStatus === ImageView.LoadStatus.ERROR

    return (
        <div className={`image-view ${className}`} id={id} style={style}>
            {src && (
                <ImageViewContainer 
                    src={resolvedSrc}
                    alt={alt}
                    visible={containerVisible}
                    loadStatus={loadStatus}
                    onLoad={_onLoad}
                    onError={_onError}
                />
            )}

            <ImageViewSpinner visible={spinnerVisible} />
            <ImageViewError visible={errorVisible} hideIcon={hideSpinner} />
        </div>
    )
}

ImageView.LoadStatus = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
}

function ImageViewContainer({ src, alt, visible, loadStatus, onLoad, onError }) {
    const constants = useConstants()
    const visibleClass = visible ? `visible` : `invisible`

    return (
        <img 
            key={src}
            className={`image-view-img ${visibleClass} ${constants.HTML_CLASSES.imageView} ${constants.HTML_CLASSES.imageView}-${loadStatus}`}
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onLoad={onLoad}
            onError={onError}
        />
    )
}

function ImageViewSpinner({ visible }) {
    if (!visible) return null

    return (
        <div className="image-view-spinner-wrapper">
            <Spinner animation="border" />
        </div>
    )
}

function ImageViewError({ visible, hideIcon }) {
    if (!visible) return null

    return (
        <div className="image-view-error-wrapper">
            {!hideIcon && <i className="fa-solid fa-eye-slash" />}
        </div>
    )
}

export default ImageView