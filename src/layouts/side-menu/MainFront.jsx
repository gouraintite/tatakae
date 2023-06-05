import { Transition } from "react-transition-group";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { sideMenu as useSideMenuStore } from "@/stores/side-menu-frontOffice";
import { useRecoilState, useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "./index";
import classnames from "classnames";
import {
  Lucide,
  Modal,
  ModalBody
} from "@/base-components";
import TopBar from "@/components/top-bar/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import MainColorSwitcher from "@/components/main-color-switcher/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";
import { profile_service } from "../../modules/auth/services/auth.service";
import { PPUrl, Stats } from "../../stores/report";
import axiosInstance from "../../config/axios";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState([]);
  const sideMenuStore = useRecoilValue(useSideMenuStore);
  const sideMenu = () => nestedMenu($h.toRaw(sideMenuStore.menu), location);

  const [reviewVisibility, setReviewVisibility] = useState(false);
  const [ppurl, setPpurl] = useRecoilState(PPUrl)

  useEffect(() => {
    dom("body").removeClass("error-page").removeClass("login").addClass("main");
    setFormattedMenu(sideMenu());
  }, [sideMenuStore, location.pathname]);


  const handleProfile = () => {
    profile_service()
      .then(res => {
        console.log(res?.data, 'my data');
        setPpurl(res?.data)
        localStorage.setItem('isAble', res?.data?.is_able)

      }).catch(err => {
        console.log(err, 'my data error');
      })
  }
  const [stats, setStats] = useRecoilState(Stats)
  const [count, setCount] = useState(0);

  useEffect(()=>{
    handleProfile()
    !stats && getData();
  }, [count])

  const getData = () => {
    axiosInstance.get(`${import.meta.env.VITE_BASE_URL}/profile/stats/`)
      .then(response => {
        setStats(response?.data)
        localStorage.setItem('stats', JSON.stringify(response?.data))
        console.log(stats, ' stats ----------------- dashboard data');
      })
      .catch(error => {
        //console.log(error?.data, 'thios are errors');
      })
  }

  if (count < 1) {
    setTimeout(() => {
      setCount(count + 1); 
    }, 200);
  }
  console.log(stats, ' stat ++++++++++++++++++- dashboard data');

  return (
    <div className="py-5 md:py-0">
      <DarkModeSwitcher />
      {/* <MainColorSwitcher /> */}
      <MobileMenu />
      <TopBar />
      <div className="flex overflow-hidden">
        {/* BEGIN: Side Menu */}
        <nav className="side-nav">
          <ul>
            {/* BEGIN: First Child */}
            {formattedMenu.map((menu, menuKey) =>
              menu == "devider" ? (
                <li
                  className="side-nav__devider my-6"
                  key={menu + menuKey}
                ></li>
              ) : (
                <li key={menu + menuKey}>
                  <SideMenuTooltip
                    tag="a"
                    content={menu.title}
                    href={menu.subMenu ? "#" : menu.pathname}
                    className={classnames({
                      "side-menu": true,
                      "side-menu--active": menu.active,
                      "side-menu--open": menu.activeDropdown,
                    })}
                    onClick={(event) => {
                      event.preventDefault();
                      if (localStorage.getItem('isAble') === 'true') {
                        linkTo(menu, navigate);
                        setFormattedMenu($h.toRaw(formattedMenu));
                      } else {
                        setReviewVisibility(true)
                      }
                    }}
                  >
                    <div className="side-menu__icon">
                      <Lucide icon={menu.icon} />
                    </div>
                    <div className="side-menu__title">
                      {menu.title}
                      {menu.subMenu && (
                        <div
                          className={classnames({
                            "side-menu__sub-icon": true,
                            "transform rotate-180": menu.activeDropdown,
                          })}
                        >
                          <Lucide icon="ChevronDown" />
                        </div>
                      )}
                    </div>
                  </SideMenuTooltip>
                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <Transition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={classnames({
                          "side-menu__sub-open": menu.activeDropdown,
                        })}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <SideMenuTooltip
                              tag="a"
                              content={subMenu.title}
                              href={subMenu.subMenu ? "#" : subMenu.pathname}
                              className={classnames({
                                "side-menu": true,
                                "side-menu--active": subMenu.active,
                              })}
                              onClick={(event) => {
                                event.preventDefault();
                                linkTo(subMenu, navigate);
                                setFormattedMenu($h.toRaw(formattedMenu));
                              }}
                            >
                              <div className="side-menu__icon">
                                <Lucide icon={subMenu.icon} />
                              </div>
                              <div className="side-menu__title">
                                {subMenu.title}
                                {subMenu.subMenu && (
                                  <div
                                    className={classnames({
                                      "side-menu__sub-icon": true,
                                      "transform rotate-180":
                                        subMenu.activeDropdown,
                                    })}
                                  >
                                    <Lucide icon="ChevronDown" />
                                  </div>
                                )}
                              </div>
                            </SideMenuTooltip>
                            {/* BEGIN: Third Child */}
                            {subMenu.subMenu && (
                              <Transition
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  className={classnames({
                                    "side-menu__sub-open":
                                      subMenu.activeDropdown,
                                  })}
                                >
                                  {subMenu.subMenu.map(
                                    (lastSubMenu, lastSubMenuKey) => (
                                      <li key={lastSubMenuKey}>
                                        <SideMenuTooltip
                                          tag="a"
                                          content={lastSubMenu.title}
                                          href={
                                            lastSubMenu.subMenu
                                              ? "#"
                                              : lastSubMenu.pathname
                                          }
                                          className={classnames({
                                            "side-menu": true,
                                            "side-menu--active":
                                              lastSubMenu.active,
                                          })}
                                          onClick={(event) => {
                                            event.preventDefault();
                                            linkTo(lastSubMenu, navigate);
                                          }}
                                        >
                                          <div className="side-menu__icon">
                                            <Lucide icon="Zap" />
                                          </div>
                                          <div className="side-menu__title">
                                            {lastSubMenu.title}
                                          </div>
                                        </SideMenuTooltip>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Transition>
                            )}
                            {/* END: Third Child */}
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                  {/* END: Second Child */}
                </li>
              )
            )}
            {/* END: First Child */}
          </ul>
        </nav>
        {/* END: Side Menu */}

        {/* modal to add a review START*/}
        <Modal
          show={reviewVisibility}
          onHidden={() => {
            setReviewVisibility(false);
          }}
        >
          <ModalBody className="p-0">
            <div className="p-5 text-center">
              <Lucide
                icon="Lock"
                className="w-16 h-16 text-primary mx-auto mt-3"
              />
              <div className="text-2xl my-5">Fill out your profile completely before moving on to another section</div>
            </div>
            <div className="px-5 pb-8 text-center">
              <button
                type="button"
                className="btn btn-primary w-24 mx-3 px-3 py-2"
                onClick={() => {
                  setReviewVisibility(false);
                }}>
                All right
              </button>
            </div>
          </ModalBody>
        </Modal>
        {/* modal to add a review END*/}
        {/* BEGIN: Content */}
        <div className="content">
          <Outlet />
        </div>
        {/* END: Content */}
      </div>
    </div>
  );
}

export default Main;

