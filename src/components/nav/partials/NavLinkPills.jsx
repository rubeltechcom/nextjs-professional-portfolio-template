import "./NavLinkPills.scss"
import React, {useEffect, useState} from 'react'
import Nav from "@/components/nav/base/Nav.jsx"
import GestureAwareButton from "@/components/buttons/GestureAwareButton.jsx"

function NavLinkPills({ links, id, className = "" }) {
    const visible = links && links.length >= 2
    const visibleClass = visible ? `` : `d-none`

    return (
        <Nav id={id}
             links={links}
             data={null}
             tag={id}
             className={`nav-link-pills ${className} ${visibleClass}`}
             itemComponent={NavLinkPillsLink}/>
    )
}

function NavLinkPillsLink({ link, active, data, onClick, onClickTimeout }) {
    const activeClass = active ?
        `nav-link-pills-link-active` :
        ``

    return (
        <GestureAwareButton className={`nav-link-pills-link ${activeClass}`}
                            onClick={onClick}>
            <i className={`${link.faIcon}`}/>
            <span dangerouslySetInnerHTML={{__html: link.label}}/>
        </GestureAwareButton>
    )
}

export default NavLinkPills