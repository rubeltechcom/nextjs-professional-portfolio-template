import "./NumberAnimation.scss"
import React, {useEffect, useState} from 'react'
import {useScheduler} from "@/hooks/scheduler.js"

function NumberAnimation({ targetValue, id, initialValue = 0, updateDelay = 10, format = `{n}`, className = "" }) {
    const scheduler = useScheduler()

    const [currentValue, setCurrentValue] = useState(initialValue)
    const displayValue = format.replace(/{n}/g, currentValue.toString())

    useEffect(() => {
        scheduler.clearAllWithTag(id)

        let step = (targetValue - currentValue) / updateDelay
        if (step === 0 && targetValue > currentValue) step = 1
        if (step === 0 && targetValue < currentValue) step = -1

        let exactValue = currentValue
        let lastTickTime = new Date().getTime()
        let tickInterval = 1000/30

        scheduler.interval(() => {
            const now = new Date().getTime()
            const elapsed = now - lastTickTime
            lastTickTime = now

            const dt = elapsed / tickInterval
            exactValue += step * dt
            
            let displayVal = Math.round(exactValue)

            if((step >= 0 && displayVal >= targetValue) || (step < 0 && displayVal <= targetValue) || step === 0) {
                setCurrentValue(targetValue)
                scheduler.clearAllWithTag(id)
            } else {
                setCurrentValue(displayVal)
            }
        }, tickInterval, id)
        
        return () => scheduler.clearAllWithTag(id)
    }, [targetValue])

    return (
        <span className={`number-animation ${className}`}
              dangerouslySetInnerHTML={{__html: displayValue}}/>
    )
}

export default NumberAnimation