import "./NavHeaderMobile.scss"
import React, {useEffect, useState} from 'react'
import {Card} from "react-bootstrap"
import NavProfileCard from "@/components/nav/partials/NavProfileCard.jsx"
import NavToolLanguagePicker from "@/components/nav/tools/NavToolLanguagePicker.jsx"
import NavToolThemePicker from "@/components/nav/tools/NavToolThemePicker.jsx"
import NavLinkPills from "@/components/nav/partials/NavLinkPills.jsx"

function NavHeaderMobile({ profile, links }) {
    return (
        <nav className={`nav-header-mobile`}>
            <Card className={`nav-header-mobile-card-wrapper`}>
                <NavProfileCard profile={profile}
                                expanded={true}/>

                <div className={`left-tool-container`}>
                    <NavToolLanguagePicker/>
                </div>

                <div className={`right-tool-container`}>
                    <NavToolThemePicker/>
                </div>

                <NavLinkPills id={`nav-link-pills-menu`}
                              links={links}/>
            </Card>
        </nav>
    )
}

export default NavHeaderMobile