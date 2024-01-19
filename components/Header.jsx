import Link from "next/link";
import styles from '@/styles/Header.module.css'
import { useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { BagContext } from "./BagContext";
import { NavDataContext } from "./NavDataContext";

export default function Header(){

    const [mobileNavToggle, setMobileNavToggle] = useState(false)
    const [userDropDown, setUserDropDown] = useState(false)
    const [searchbar, setSearchbar] = useState(false)

    const {bagProducts} = useContext(BagContext)
    const {navPanelData, setNavPanelData} = useContext(NavDataContext)

    const {data: session} = useSession()
    let user;
    if (session){
        user = session.user
    }
    useEffect(()=>{
        setNavPanelData([])
    },[])

    return(
        <>
                <header className={styles.header}>
                    <div className={styles.logo_container}>
                        <button
                        onClick={()=>setMobileNavToggle(!mobileNavToggle)}
                        className={styles.nav_toggle_button}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </button>
                        <Link className={styles.logo} href={'/'}>BELLA VEU</Link>
                    </div>
                    
                    <nav className={styles.nav}>
                        <Link href={'/'}>HOME</Link>
                        <Link href={'/collection'}>ALL COLLECTION</Link>
                        <div className={styles.categories}>
                            <Link href={'/categories'}>CATEGORIES</Link>
                            <div className={styles.nav_menu}>
                                <Link href={'/category/top'}>TOP</Link>
                                <Link href={'/category/bottom'}>BOTTOM</Link>
                                <Link href={'/category/dresses'}>DRESS</Link>
                                <Link href={'/category/accessories'}>ACCESSORIES</Link>

                            </div>
                        </div>
                    </nav>
                    <div className={styles.user_section}>
                        <button
                        onClick={()=>setSearchbar(!searchbar)}
                        href={'/products'}>
                            
                            <svg id={styles.usersection_svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </button>
                        <Link href={'/bag'}>
                            <div className={styles.bag_container}>
                                <svg  id={styles.usersection_svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                </svg>
                                <p className={styles.bag_count}>{bagProducts.length}</p>
                            </div>
                            
                            
                        </Link>
                        <button
                        onClick={()=>setUserDropDown(!userDropDown)}
                        href={'/products'}>
                            <svg id={styles.usersection_svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        </button>
                    </div>

                    <div 
                    className={searchbar?styles.searchbar+' '+styles.toggle_searchbar:styles.searchbar}>
                    <input type="text" placeholder="Search" />
                    </div>

                    <div className={userDropDown?styles.usersection_dropdown+' '+styles.toggle_user_dropdown:styles.usersection_dropdown}>
                        {session? <p>Hi, {user.name.split(' ')[0]}</p>: ''}
                        <Link href={'/wishlist'}>WISHLIST</Link>
                        <Link href={'/orders'}>ORDERS</Link>
                        {session?
                        <button id={styles.signout_button} onClick={()=>signOut()}>Sign Out</button>
                        :
                        <Link id={styles.signin_button}href={'/login'}>Sign In</Link>
                        }
                        
                    </div>
                </header>
            
            <div className={mobileNavToggle? styles.mobile_nav+' '+styles.mobile_nav_toggle:styles.mobile_nav}>
            {navPanelData.length>0?<>
                            <p className={styles.category_title}>CATEGORIES</p>
                            <div className={styles.category_content}>
                                <ul className={styles.nav_list_parent}>
                                    {navPanelData.map((parentElement) => (
                                        <li id={styles.nav_item_parent} key={parentElement._id} onClick={()=>setMobileNavToggle(!mobileNavToggle)}>
                                            <Link href={'/category'+parentElement.url||''}><p>{parentElement.name}</p></Link>
                                            {parentElement.children && (
                                                <ul className={styles.nav_list_child}>
                                                    {parentElement.children.map((childElement,index) => (
                                                        <Link key={index} href={'/category'+childElement.url||''}><li id={styles.nav_item_child}key={childElement._id} onClick={()=>setMobileNavToggle(!mobileNavToggle)}>{childElement.name}</li></Link>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            </>
                            
                            :

                            <>
                            <Link href={'/categories'}><p className={styles.category_title}>CATEGORIES</p></Link>
                            <div className={styles.category_content}>
                                <ul className={styles.nav_list_parent}>
                                        <li id={styles.nav_item_parent}  onClick={()=>setMobileNavToggle(!mobileNavToggle)}>
                                            <Link href={'/category/top'}><p>Top</p></Link>   
                                        </li>

                                        <li id={styles.nav_item_parent}  onClick={()=>setMobileNavToggle(!mobileNavToggle)}>
                                            <Link href={'/category/bottom'}><p>Bottom</p></Link>   
                                        </li>

                                        <li id={styles.nav_item_parent}  onClick={()=>setMobileNavToggle(!mobileNavToggle)}>
                                            <Link href={'/category/accessories'}><p>Accessories</p></Link>   
                                        </li>

                                        <li id={styles.nav_item_parent}  onClick={()=>setMobileNavToggle(!mobileNavToggle)}>
                                            <Link href={'/category/dresses'}><p>Dresses</p></Link>   
                                        </li>
                                        
                                        <li id={styles.nav_item_parent}  onClick={()=>setMobileNavToggle(!mobileNavToggle)}>
                                            <Link href={'/category/dresses'}><p>All Collection</p></Link>   
                                        </li>
                    
                                </ul>
                            </div>
                            </>
                            }
                    </div>
        </>
    )
}